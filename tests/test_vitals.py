"""
Comprehensive Pytest Test Suite for UrgentIQ Smartwatch Vitals Prototype.
Verifies loader filtering, baseline calculations, robust Z-scores against reference files,
and Flask API endpoint contracts and input validation.
"""

from pathlib import Path
import json
import pytest
import pandas as pd

from core.loader import load_dafit_data
from core.baseline import compute_baseline, analyze_bpm, enrich_readings_with_analysis
from app import app, data_source

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
CSV_PATH = DATA_DIR / "dafit_vitals_yesterday_today.csv"
BASELINE_JSON_PATH = DATA_DIR / "personal_baseline.json"
ANALYZED_CSV_PATH = DATA_DIR / "analyzed_heart_rate.csv"


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


class TestDataLoader:
    """Verifies that the CSV loader properly isolates genuine readings from summaries and untimed samples."""

    def test_file_exists(self):
        assert CSV_PATH.exists(), f"Missing test dataset at {CSV_PATH}"

    def test_loader_counts_and_filtering(self):
        result = load_dafit_data(CSV_PATH)
        
        # 1. Genuine timestamped heart rate readings must be exactly 19
        readings = result["readings"]
        assert len(readings) == 19, f"Expected exactly 19 individual readings, found {len(readings)}"

        # 2. Untimed array samples excluded must be exactly 288
        assert result["untimed_samples_count"] == 288, (
            f"Expected exactly 288 untimed samples, got {result['untimed_samples_count']}"
        )

        # 3. All individual readings have valid timestamps with +05:30 offset
        for r in readings:
            assert "+05:30" in r["timestamp"]
            assert r["unit"] == "bpm"
            assert r["record_type"] == "individual_measurement"
            assert 20 <= r["bpm"] <= 250

        # 4. Chronological order
        timestamps = [r["timestamp"] for r in readings]
        assert timestamps == sorted(timestamps), "Readings must be sorted chronologically"

    def test_daily_summary_and_mismatch(self):
        result = load_dafit_data(CSV_PATH)
        summary = result["daily_summary"]
        
        assert summary["average"] == 81.0
        assert summary["max"] == 104.0
        assert summary["min"] == 52.0
        assert "from device summary" in summary["note"]

        # Surfacing the discrepancy between daily max (104) and peak measurement (124)
        discrepancy = result["discrepancy"]
        assert discrepancy["summary_vs_readings_max_mismatch"] is True
        assert discrepancy["daily_summary_max"] == 104.0
        assert discrepancy["individual_readings_max"] == 124.0

    def test_other_metrics_isolated(self):
        result = load_dafit_data(CSV_PATH)
        other = result["other_individual_vitals"]
        # One blood oxygen reading is in the file
        assert len(other) == 1
        assert other[0]["metric"] == "blood_oxygen"
        assert other[0]["value"] == 98.0


class TestBaselineComputation:
    """Verifies baseline calculations strictly match personal_baseline.json."""

    def test_baseline_matches_reference_json(self):
        with open(BASELINE_JSON_PATH, "r", encoding="utf-8") as f:
            expected = json.load(f)

        data = load_dafit_data(CSV_PATH)
        computed = compute_baseline(data["readings"], source_file=CSV_PATH.name)

        assert computed["individual_readings"] == expected["individual_readings"] == 19
        assert computed["mean_bpm"] == expected["mean_bpm"] == 84.53
        assert computed["median_bpm"] == expected["median_bpm"] == 84.0
        assert computed["min_observed_bpm"] == expected["min_observed_bpm"] == 52.0
        assert computed["max_observed_bpm"] == expected["max_observed_bpm"] == 124.0
        assert computed["q1_bpm"] == expected["q1_bpm"] == 81.0
        assert computed["q3_bpm"] == expected["q3_bpm"] == 88.5
        assert computed["mad_bpm"] == expected["mad_bpm"] == 4.0
        assert computed["status"] == expected["status"] == "preliminary; limited data"


class TestRobustZScores:
    """Verifies robust Z-score formula against reference analyzed_heart_rate.csv."""

    def test_z_score_peak_reading_124(self):
        baseline = {
            "median_bpm": 84.0,
            "mad_bpm": 4.0
        }
        res = analyze_bpm(124.0, baseline)
        assert round(res["robust_z"], 2) == 6.74
        assert res["deviation_bpm"] == 40.0
        assert res["status"] == "unusual_deviation_review"

    def test_z_score_trough_reading_52(self):
        baseline = {
            "median_bpm": 84.0,
            "mad_bpm": 4.0
        }
        res = analyze_bpm(52.0, baseline)
        assert round(res["robust_z"], 2) == -5.40
        assert res["deviation_bpm"] == -32.0
        assert res["status"] == "unusual_deviation_review"

    def test_matches_all_analyzed_csv_rows(self):
        ref_df = pd.read_csv(ANALYZED_CSV_PATH)
        data = load_dafit_data(CSV_PATH)
        baseline = compute_baseline(data["readings"])
        enriched = enrich_readings_with_analysis(data["readings"], baseline)

        assert len(enriched) == len(ref_df) == 19

        for i, row in ref_df.iterrows():
            item = enriched[i]
            assert item["bpm"] == float(row["heart_rate_bpm"])
            assert item["deviation_bpm"] == float(row["deviation_bpm"])
            # Robust Z-score matches within 0.0001
            assert abs(item["robust_z"] - float(row["robust_z_score"])) < 1e-4
            assert item["status"] == str(row["status"])


class TestApiEndpoints:
    """Verifies Flask API routes, response payloads, error conditions, and validation."""

    def test_serve_index(self, client):
        res = client.get("/")
        assert res.status_code == 200
        assert b"UrgentIQ" in res.data
        assert b"Smartwatch Vitals" in res.data

    def test_api_health(self, client):
        res = client.get("/api/health")
        assert res.status_code == 200
        payload = res.get_json()
        assert payload["ok"] is True
        assert payload["mode"] == "recorded"
        assert payload["n_readings"] == 19

    def test_api_data_payload(self, client):
        res = client.get("/api/data")
        assert res.status_code == 200
        payload = res.get_json()
        
        assert payload["mode"] == "recorded"
        assert payload["source_file"] == "dafit_vitals_yesterday_today.csv"
        assert len(payload["readings"]) == 19
        assert payload["baseline"]["median_bpm"] == 84.0
        assert payload["daily_summary"]["average"] == 81.0
        assert payload["notes"]["untimed_samples_excluded"] == 288
        assert payload["notes"]["summary_vs_readings_max_mismatch"] is True
        
        # Verify first reading structure
        first_r = payload["readings"][0]
        assert "id" in first_r
        assert "timestamp" in first_r
        assert "bpm" in first_r
        assert "deviation_bpm" in first_r
        assert "robust_z" in first_r
        assert "status" in first_r
        assert first_r["source"] == "recorded"

    def test_api_analyze_valid_input(self, client):
        res = client.post("/api/analyze", json={"bpm": 124})
        assert res.status_code == 200
        payload = res.get_json()
        assert payload["bpm"] == 124.0
        assert payload["baseline_bpm"] == 84.0
        assert payload["deviation_bpm"] == 40.0
        assert round(payload["robust_z"], 2) == 6.74
        assert payload["status"] == "unusual_deviation_review"
        assert payload["source"] == "test_input"
        assert "disclaimer" in payload

    def test_api_analyze_normal_input(self, client):
        res = client.post("/api/analyze", json={"bpm": 86})
        assert res.status_code == 200
        payload = res.get_json()
        assert payload["status"] == "within_personal_statistical_pattern"

    def test_api_analyze_validation_missing_body(self, client):
        res = client.post("/api/analyze", data="not json", content_type="text/plain")
        assert res.status_code == 400

    def test_api_analyze_validation_missing_bpm(self, client):
        res = client.post("/api/analyze", json={})
        assert res.status_code == 400
        assert "required" in res.get_json()["message"]

    def test_api_analyze_validation_non_numeric(self, client):
        res = client.post("/api/analyze", json={"bpm": "one-twenty"})
        assert res.status_code == 400
        assert "numeric" in res.get_json()["message"].lower()

    def test_api_analyze_validation_out_of_range_low(self, client):
        res = client.post("/api/analyze", json={"bpm": 15})
        assert res.status_code == 400
        assert "between 20 and 250" in res.get_json()["message"]

    def test_api_analyze_validation_out_of_range_high(self, client):
        res = client.post("/api/analyze", json={"bpm": 260})
        assert res.status_code == 400
        assert "between 20 and 250" in res.get_json()["message"]
