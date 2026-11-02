"""
DataSource abstraction layer for UrgentIQ Vitals.
Provides an abstract base DataSource and RecordedCSVSource implementation.
This architecture allows swapping in a live Bluetooth Low Energy (BLE) or MQTT source
in the future without changing Flask routes or frontend contracts.
"""

from abc import ABC, abstractmethod
from pathlib import Path
from typing import Any, Dict, List, Optional

from core.loader import load_dafit_data
from core.baseline import compute_baseline, enrich_readings_with_analysis


class DataSource(ABC):
    """
    Abstract Base Class for vitals data sources.
    
    Subclasses implement get_data() to supply readings, baselines, and summaries.
    Reserved fields for live/BLE data sources (freshness, connection_status, signal_quality)
    are defined here so the API contract remains uniform.
    """

    @abstractmethod
    def get_data(self) -> Dict[str, Any]:
        """
        Fetch full data payload including mode, readings, baseline, daily summary, and notes.
        """
        pass

    @abstractmethod
    def get_readings(self) -> List[Dict[str, Any]]:
        """
        Return the list of processed, timestamped heart rate readings.
        """
        pass

    @abstractmethod
    def get_baseline(self) -> Dict[str, Any]:
        """
        Return the computed or active personal baseline.
        """
        pass

    @property
    @abstractmethod
    def mode(self) -> str:
        """Mode identifier: e.g. 'recorded', 'ble_live', 'simulator'."""
        pass

    # Reserved fields for future live BLE integration
    @property
    def freshness_seconds(self) -> Optional[float]:
        """Seconds since newest reading (null for recorded playback)."""
        return None

    @property
    def connection_status(self) -> Optional[str]:
        """Live connection state e.g. 'connected', 'scanning', 'disconnected' (null for recorded)."""
        return None

    @property
    def signal_quality(self) -> Optional[str]:
        """Wearable sensor contact / PPG signal quality index (null for recorded)."""
        return None


class RecordedCSVSource(DataSource):
    """
    Data source implementation that reads recorded DaFit export CSV files.
    """

    def __init__(self, csv_path: Path):
        self.csv_path = Path(csv_path)
        self._raw_data: Optional[Dict[str, Any]] = None
        self._baseline: Optional[Dict[str, Any]] = None
        self._enriched_readings: Optional[List[Dict[str, Any]]] = None

    @property
    def mode(self) -> str:
        return "recorded"

    def _load(self) -> None:
        if self._raw_data is None:
            self._raw_data = load_dafit_data(self.csv_path)
            raw_readings = self._raw_data["readings"]
            self._baseline = compute_baseline(raw_readings, source_file=self.csv_path.name)
            self._enriched_readings = enrich_readings_with_analysis(raw_readings, self._baseline)

    def get_readings(self) -> List[Dict[str, Any]]:
        self._load()
        assert self._enriched_readings is not None
        return self._enriched_readings

    def get_baseline(self) -> Dict[str, Any]:
        self._load()
        assert self._baseline is not None
        return self._baseline

    def get_daily_summary(self) -> Dict[str, Any]:
        self._load()
        assert self._raw_data is not None
        return self._raw_data["daily_summary"]

    def get_data(self) -> Dict[str, Any]:
        """
        Builds the unified API payload matching the exact API specification.
        Includes live BLE reservation fields (freshness, connection_status, signal_quality)
        which are null for recorded playback.
        """
        self._load()
        assert self._raw_data is not None
        assert self._baseline is not None
        assert self._enriched_readings is not None

        return {
            "mode": self.mode,
            "source_file": self.csv_path.name,
            "readings": self._enriched_readings,
            "baseline": self._baseline,
            "daily_summary": self._raw_data["daily_summary"],
            "notes": {
                "untimed_samples_excluded": self._raw_data["untimed_samples_count"],
                "summary_vs_readings_max_mismatch": self._raw_data["discrepancy"]["summary_vs_readings_max_mismatch"],
                "mismatch_detail": self._raw_data["discrepancy"]["note"]
            },
            # Reserved fields for future live BLE / hardware feed plug-in:
            # When BLEDataSource is introduced, these will return live values (e.g., 2.4s freshness, "connected", "good")
            "live_feed": {
                "freshness_seconds": self.freshness_seconds,
                "connection_status": self.connection_status,
                "signal_quality": self.signal_quality,
                "note": "BLE/Live streaming interface reserved; currently running in recorded file replay mode."
            }
        }


# ==============================================================================
# HOW TO PLUG IN A LIVE BLE SOURCE:
# ==============================================================================
# 1. Subclass DataSource:
#
#    class BLEDataSource(DataSource):
#        def __init__(self, ble_device_mac_or_uuid: str):
#            self.device_id = ble_device_mac_or_uuid
#            self._ble_client = HeartRateBLEClient(...)
#
#        @property
#        def mode(self) -> str:
#            return "ble_live"
#
#        @property
#        def freshness_seconds(self) -> Optional[float]:
#            return self._ble_client.get_seconds_since_last_packet()
#
#        @property
#        def connection_status(self) -> Optional[str]:
#            return "connected" if self._ble_client.is_connected else "disconnected"
#
#        @property
#        def signal_quality(self) -> Optional[str]:
#            return self._ble_client.get_ppg_quality_indicator() # e.g. "optimal", "noisy"
#
#        def get_readings(self) -> List[Dict[str, Any]]:
#            # Return live rolling ring buffer of timestamped readings
#            ...
#
# 2. In app.py, instantiate BLEDataSource instead of RecordedCSVSource:
#    data_source = BLEDataSource("DA:FIT:WATCH:MAC")
#    Routes remain completely untouched!
# ==============================================================================
