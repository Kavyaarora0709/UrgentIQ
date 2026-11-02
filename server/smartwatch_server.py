import asyncio
import json
import logging
import sqlite3
import time
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Set

from bleak import BleakClient, BleakScanner
from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("SmartwatchServer")

# Database setup
DB_PATH = Path(__file__).parent / "vitals_lab.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("""
    CREATE TABLE IF NOT EXISTS reference_profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        created_at TEXT NOT NULL,
        sample_count INTEGER NOT NULL,
        avg_bpm REAL NOT NULL,
        min_bpm INTEGER NOT NULL,
        max_bpm INTEGER NOT NULL,
        median_bpm REAL NOT NULL,
        variability REAL NOT NULL,
        source TEXT NOT NULL,
        raw_samples_json TEXT
    );
    """)
    cur.execute("""
    CREATE TABLE IF NOT EXISTS recording_sessions (
        id TEXT PRIMARY KEY,
        session_type TEXT NOT NULL,
        start_time TEXT NOT NULL,
        end_time TEXT NOT NULL,
        duration_seconds INTEGER NOT NULL,
        sample_count INTEGER NOT NULL,
        avg_bpm REAL NOT NULL,
        min_bpm INTEGER NOT NULL,
        max_bpm INTEGER NOT NULL,
        median_bpm REAL NOT NULL,
        variability REAL NOT NULL,
        status TEXT NOT NULL
    );
    """)
    cur.execute("""
    CREATE TABLE IF NOT EXISTS validity_tests (
        id TEXT PRIMARY KEY,
        reference_id INTEGER,
        start_time TEXT NOT NULL,
        end_time TEXT NOT NULL,
        samples_evaluated INTEGER NOT NULL,
        deviations_detected INTEGER NOT NULL,
        max_deviation_bpm REAL NOT NULL,
        summary TEXT
    );
    """)
    conn.commit()
    conn.close()
    logger.info(f"Database initialized at {DB_PATH}")

init_db()

# Models
class ReferenceProfile(BaseModel):
    name: str = "Normal — Kavya"
    created_at: str
    sample_count: int
    avg_bpm: float
    min_bpm: int
    max_bpm: int
    median_bpm: float
    variability: float
    source: str
    raw_samples: Optional[List[int]] = None

class SessionData(BaseModel):
    id: str
    session_type: str
    start_time: str
    end_time: str
    duration_seconds: int
    sample_count: int
    avg_bpm: float
    min_bpm: int
    max_bpm: int
    median_bpm: float
    variability: float
    status: str

# Standard Bluetooth GATT Heart Rate UUIDs
HR_MEASUREMENT_UUID = "00002a37-0000-1000-8000-00805f9b34fb"
HR_SERVICE_UUID = "0000180d-0000-1000-8000-00805f9b34fb"

class BleSmartwatchManager:
    def __init__(self):
        self.client: Optional[BleakClient] = None
        self.device_name: Optional[str] = None
        self.device_address: Optional[str] = None
        self.is_connected: bool = False
        self.is_scanning: bool = False
        self.last_bpm: Optional[int] = None
        self.last_timestamp: Optional[str] = None
        self.sample_count: int = 0
        self.last_error: Optional[str] = None
        self.listeners: Set[WebSocket] = set()

    async def broadcast(self, message: dict):
        text = json.dumps(message)
        dead = set()
        for ws in self.listeners:
            try:
                await ws.send_text(text)
            except Exception:
                dead.add(ws)
        self.listeners.difference_update(dead)

    def on_heart_rate(self, sender, data: bytearray):
        try:
            flags = data[0]
            # Bit 0: 0 = UINT8 BPM, 1 = UINT16 BPM
            bpm = int.from_bytes(data[1:3], "little") if (flags & 1) else data[1]
            contact_detected = bool(flags & 6) if (flags & 4) else True
            now_iso = datetime.now().isoformat()
            self.last_bpm = bpm
            self.last_timestamp = now_iso
            self.sample_count += 1
            logger.info(f"Received HR from {self.device_name}: {bpm} BPM")

            payload = {
                "type": "heart_rate",
                "bpm": bpm,
                "timestamp": now_iso,
                "device_name": self.device_name or "Smartwatch",
                "sample_index": self.sample_count,
                "contact_detected": contact_detected,
                "source": "ble_hardware"
            }
            asyncio.create_task(self.broadcast(payload))
        except Exception as e:
            logger.error(f"Error parsing HR packet: {e}")

    TARGET_MAC = "23:BF:22:31:67:C1"
    TARGET_NAME = "FB BGR001"

    async def connect(self, target_name: Optional[str] = None, target_mac: Optional[str] = None, timeout: float = 12.0):
        if self.is_connected:
            return {"status": "already_connected", "device": self.device_name}

        self.is_scanning = True
        self.last_error = None
        target_mac_addr = (target_mac or self.TARGET_MAC).upper()
        preferred_name = target_name or self.TARGET_NAME

        await self.broadcast({
            "type": "status",
            "status": "scanning",
            "message": f"Scanning for {preferred_name} ({target_mac_addr})..."
        })

        try:
            logger.info(f"Scanning for BLE device target {preferred_name} / {target_mac_addr} (timeout={timeout}s)...")
            devices = await BleakScanner.discover(timeout=timeout)
            logger.info(f"Found {len(devices)} Bluetooth devices in scan")

            target = None

            # Priority 1: Match by exact MAC address
            for d in devices:
                if d.address.upper() == target_mac_addr:
                    target = d
                    logger.info(f"Found target watch by MAC: {d.address} ({d.name})")
                    break

            # Priority 2: Match by target name (e.g. FB BGR001, BGR001, BGR)
            if not target:
                for d in devices:
                    name = (d.name or "").upper()
                    if "BGR" in name or "FB" in name or preferred_name.upper() in name:
                        target = d
                        logger.info(f"Found target watch by Name: {d.name} ({d.address})")
                        break

            # Priority 3: If not found in scan, try direct connection to target MAC address
            if not target:
                logger.info(f"Target not seen in passive scan. Attempting direct connection to {target_mac_addr}...")
                await self.broadcast({
                    "type": "status",
                    "status": "connecting",
                    "device": preferred_name,
                    "message": f"Attempting direct connection to {preferred_name} ({target_mac_addr})..."
                })
                try:
                    self.client = BleakClient(target_mac_addr, timeout=12.0)
                    await self.client.connect()
                    if self.client.is_connected:
                        self.is_connected = True
                        self.device_name = preferred_name
                        self.device_address = target_mac_addr
                except Exception as direct_err:
                    logger.warning(f"Direct connection to {target_mac_addr} failed: {direct_err}")
                    target = None

            if not self.is_connected:
                if not target:
                    self.is_scanning = False
                    err_msg = (
                        f"Watch {preferred_name} ({target_mac_addr}) not found. "
                        "Ensure: 1) Watch is not connected to your phone app (turn phone Bluetooth OFF temporarily). "
                        "2) Wake up the watch screen and open Heart Rate measuring screen."
                    )
                    self.last_error = err_msg
                    await self.broadcast({"type": "status", "status": "error", "error": err_msg})
                    return {"status": "error", "message": err_msg}

                self.device_name = target.name or preferred_name
                self.device_address = target.address
                logger.info(f"Attempting connection to {self.device_name} ({self.device_address})...")
                await self.broadcast({"type": "status", "status": "connecting", "device": self.device_name})

                self.client = BleakClient(target, timeout=20.0)
                await self.client.connect()
                self.is_connected = self.client.is_connected

            self.is_scanning = False

            if not self.is_connected:
                raise Exception("BLE connection attempt returned disconnected state")

            # Discover services
            hr_char_found = False
            for service in self.client.services:
                for char in service.characteristics:
                    if char.uuid.lower() == HR_MEASUREMENT_UUID.lower():
                        hr_char_found = True
                        break

            if not hr_char_found:
                logger.warning("Standard Heart Rate Measurement characteristic (0x2A37) not found in advertised services")

            # Subscribe to notifications
            await self.client.start_notify(HR_MEASUREMENT_UUID, self.on_heart_rate)
            logger.info(f"Subscribed to Heart Rate notifications on {self.device_name} ({self.device_address})")
            await self.broadcast({
                "type": "status",
                "status": "connected",
                "device": self.device_name,
                "address": self.device_address,
                "message": f"Connected to {self.device_name}. Streaming live heart rate."
            })
            return {"status": "connected", "device": self.device_name, "address": self.device_address}

        except Exception as e:
            self.is_scanning = False
            self.is_connected = False
            err_msg = str(e)
            logger.error(f"Connection failed: {err_msg}")
            self.last_error = err_msg
            await self.broadcast({"type": "status", "status": "error", "error": err_msg})
            return {"status": "error", "message": err_msg}

    async def disconnect(self):
        if self.client and self.is_connected:
            try:
                await self.client.stop_notify(HR_MEASUREMENT_UUID)
            except Exception:
                pass
            try:
                await self.client.disconnect()
            except Exception:
                pass
        self.is_connected = False
        self.is_scanning = False
        await self.broadcast({"type": "status", "status": "disconnected", "message": "Smartwatch disconnected."})
        return {"status": "disconnected"}

manager = BleSmartwatchManager()

# FastAPI application
app = FastAPI(title="UrgentIQ Smartwatch Vitals Bridge", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/smartwatch/status")
async def get_status():
    return {
        "connected": manager.is_connected,
        "scanning": manager.is_scanning,
        "device_name": manager.device_name,
        "last_bpm": manager.last_bpm,
        "last_timestamp": manager.last_timestamp,
        "sample_count": manager.sample_count,
        "last_error": manager.last_error,
    }

@app.post("/api/smartwatch/connect")
async def trigger_connect(target: Optional[str] = None, mac: Optional[str] = None):
    res = await manager.connect(target_name=target, target_mac=mac)
    if res.get("status") == "error":
        raise HTTPException(status_code=400, detail=res.get("message"))
    return res

@app.post("/api/smartwatch/disconnect")
async def trigger_disconnect():
    return await manager.disconnect()

@app.get("/api/smartwatch/reference")
async def get_reference():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("SELECT id, name, created_at, sample_count, avg_bpm, min_bpm, max_bpm, median_bpm, variability, source, raw_samples_json FROM reference_profiles ORDER BY id DESC LIMIT 1")
    row = cur.fetchone()
    conn.close()
    if not row:
        return {"found": False, "reference": None}
    raw = json.loads(row[10]) if row[10] else []
    return {
        "found": True,
        "reference": {
            "id": row[0],
            "name": row[1],
            "created_at": row[2],
            "sample_count": row[3],
            "avg_bpm": row[4],
            "min_bpm": row[5],
            "max_bpm": row[6],
            "median_bpm": row[7],
            "variability": row[8],
            "source": row[9],
            "raw_samples": raw
        }
    }

@app.post("/api/smartwatch/reference")
async def save_reference(ref: ReferenceProfile):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("""
    INSERT INTO reference_profiles (name, created_at, sample_count, avg_bpm, min_bpm, max_bpm, median_bpm, variability, source, raw_samples_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        ref.name,
        ref.created_at,
        ref.sample_count,
        ref.avg_bpm,
        ref.min_bpm,
        ref.max_bpm,
        ref.median_bpm,
        ref.variability,
        ref.source,
        json.dumps(ref.raw_samples or [])
    ))
    new_id = cur.lastrowid
    conn.commit()
    conn.close()
    logger.info(f"Saved personal reference profile '{ref.name}' (ID={new_id}) with {ref.sample_count} samples")
    return {"status": "saved", "id": new_id, "name": ref.name}

@app.post("/api/smartwatch/sessions")
async def save_session(session: SessionData):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("""
    INSERT OR REPLACE INTO recording_sessions (id, session_type, start_time, end_time, duration_seconds, sample_count, avg_bpm, min_bpm, max_bpm, median_bpm, variability, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        session.id,
        session.session_type,
        session.start_time,
        session.end_time,
        session.duration_seconds,
        session.sample_count,
        session.avg_bpm,
        session.min_bpm,
        session.max_bpm,
        session.median_bpm,
        session.variability,
        session.status
    ))
    conn.commit()
    conn.close()
    return {"status": "saved", "id": session.id}

@app.get("/api/smartwatch/sessions")
async def list_sessions():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("SELECT id, session_type, start_time, end_time, duration_seconds, sample_count, avg_bpm, min_bpm, max_bpm, median_bpm, variability, status FROM recording_sessions ORDER BY start_time DESC LIMIT 20")
    rows = cur.fetchall()
    conn.close()
    return [
        {
            "id": r[0], "session_type": r[1], "start_time": r[2], "end_time": r[3],
            "duration_seconds": r[4], "sample_count": r[5], "avg_bpm": r[6],
            "min_bpm": r[7], "max_bpm": r[8], "median_bpm": r[9], "variability": r[10],
            "status": r[11]
        }
        for r in rows
    ]

@app.websocket("/api/smartwatch/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    manager.listeners.add(websocket)
    logger.info(f"WebSocket client connected. Total listeners: {len(manager.listeners)}")

    # Send initial state immediately
    await websocket.send_text(json.dumps({
        "type": "init",
        "connected": manager.is_connected,
        "device_name": manager.device_name,
        "last_bpm": manager.last_bpm,
        "last_timestamp": manager.last_timestamp,
        "sample_count": manager.sample_count
    }))

    try:
        while True:
            data = await websocket.receive_text()
            msg = json.loads(data)
            if msg.get("command") == "connect":
                asyncio.create_task(manager.connect(target_name=msg.get("target"), target_mac=msg.get("mac")))
            elif msg.get("command") == "disconnect":
                asyncio.create_task(manager.disconnect())
    except WebSocketDisconnect:
        manager.listeners.discard(websocket)
        logger.info(f"WebSocket client disconnected. Remaining: {len(manager.listeners)}")

if __name__ == "__main__":
    uvicorn.run("smartwatch_server:app", host="127.0.0.1", port=8000, reload=False)
