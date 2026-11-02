"""
UrgentIQ Smartwatch Vitals Prototype Backend
Flask application serving recorded DaFit vitals analysis, personal baseline metrics,
and test BPM evaluation.
"""

from pathlib import Path
from typing import Any, Dict
from flask import Flask, jsonify, request, send_from_directory

from core.source import RecordedCSVSource, DataSource
from core.baseline import analyze_bpm

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
STATIC_DIR = BASE_DIR / "static"
CSV_PATH = DATA_DIR / "dafit_vitals_yesterday_today.csv"

app = Flask(__name__, static_folder=str(STATIC_DIR), static_url_path="")

# Initialize DataSource (Swappable for live BLE later)
data_source: DataSource = RecordedCSVSource(CSV_PATH)


def startup_self_check() -> None:
    """
    Self-check on application startup.
    Asserts computed baseline and robust Z-score calculation against expected reference values:
      - individual readings count = 19
      - mean_bpm = 84.53
      - median_bpm = 84.0
      - mad_bpm = 4.0
      - robust_z for 124 bpm ≈ 6.7449
    """
    try:
        data = data_source.get_data()
        baseline = data["baseline"]
        assert baseline["individual_readings"] == 19, f"Expected 19 readings, got {baseline['individual_readings']}"
        assert baseline["mean_bpm"] == 84.53, f"Expected mean 84.53, got {baseline['mean_bpm']}"
        assert baseline["median_bpm"] == 84.0, f"Expected median 84.0, got {baseline['median_bpm']}"
        assert baseline["mad_bpm"] == 4.0, f"Expected MAD 4.0, got {baseline['mad_bpm']}"
        
        # Test Z-score for peak reading 124 bpm
        test_analysis = analyze_bpm(124.0, baseline, source_label="test_check")
        assert round(test_analysis["robust_z"], 2) == 6.74, (
            f"Expected z ~ 6.74 for 124 bpm, got {test_analysis['robust_z']}"
        )
        assert test_analysis["status"] == "unusual_deviation_review"
    except Exception as e:
        print(f"[STARTUP WARNING/ERROR] Baseline self-check encountered issue: {e}")


# Run verification on load
startup_self_check()


@app.after_request
def add_cors_headers(response):
    """Allow frontend to query API from local dev servers if needed."""
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    return response


@app.route("/")
@app.route("/patients")
@app.route("/patient")
@app.route("/queue")
@app.route("/watch")
@app.route("/alerts")
@app.route("/analytics")
@app.route("/stats")
@app.route("/settings")
@app.route("/prefs")
@app.route("/<path:path>")
def serve_index(path=None):
    """Serve the single-page UrgentIQ dashboard with SPA client-side routing."""
    if path and (STATIC_DIR / path).is_file():
        return send_from_directory(str(STATIC_DIR), path)
    return send_from_directory(str(STATIC_DIR), "index.html")


@app.route("/api/health", methods=["GET"])
def health():
    """Health check endpoint indicating mode and sample availability."""
    try:
        readings = data_source.get_readings()
        return jsonify({
            "ok": True,
            "mode": data_source.mode,
            "n_readings": len(readings)
        }), 200
    except Exception as e:
        return jsonify({
            "ok": False,
            "mode": getattr(data_source, "mode", "unknown"),
            "error": f"Failed to retrieve data source: {str(e)}"
        }), 500


@app.route("/api/data", methods=["GET"])
def get_vitals_data():
    """
    Main endpoint returning recorded readings, personal baseline, daily summary, and notes.
    Handles missing or corrupted CSV gracefully without unhandled tracebacks.
    """
    try:
        payload = data_source.get_data()
        return jsonify(payload), 200
    except FileNotFoundError as fnf:
        return jsonify({
            "error": "Data file not found",
            "message": str(fnf)
        }), 404
    except ValueError as ve:
        return jsonify({
            "error": "Malformed CSV file or schema mismatch",
            "message": str(ve)
        }), 422
    except Exception as e:
        return jsonify({
            "error": "Internal processing error",
            "message": str(e)
        }), 500


@app.route("/api/analyze", methods=["POST"])
def analyze_input():
    """
    Analyze a candidate heart rate reading against the preliminary baseline.
    Validates numeric input between 20 and 250 bpm.
    """
    if not request.is_json:
        return jsonify({
            "error": "Invalid request body",
            "message": "Content-Type must be application/json"
        }), 400

    body = request.get_json(silent=True)
    if not body or "bpm" not in body:
        return jsonify({
            "error": "Missing parameter",
            "message": "Field 'bpm' is required in request body"
        }), 400

    raw_bpm = body.get("bpm")

    # Validate numeric type
    try:
        bpm = float(raw_bpm)
    except (ValueError, TypeError):
        return jsonify({
            "error": "Invalid value",
            "message": "Heart rate 'bpm' must be a numeric value."
        }), 400

    # Physiological range validation (20 - 250 bpm)
    if bpm < 20 or bpm > 250:
        return jsonify({
            "error": "Out of physiological range",
            "message": f"Heart rate 'bpm' must be between 20 and 250 bpm. Received: {bpm}"
        }), 400

    try:
        baseline = data_source.get_baseline()
        result = analyze_bpm(bpm, baseline, source_label="test_input")
        return jsonify(result), 200
    except Exception as e:
        return jsonify({
            "error": "Failed to analyze BPM",
            "message": str(e)
        }), 500


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
