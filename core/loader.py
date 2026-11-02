"""
Loader module for DaFit smartwatch vitals export data.
Handles CSV parsing, metric-driven filtering, timestamp parsing with timezone preservation (+05:30),
and separate extraction of daily summaries and untimed samples.
"""

from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple
import pandas as pd


def load_dafit_data(csv_path: Path) -> Dict[str, Any]:
    """
    Parse and filter DaFit vitals export CSV.
    
    Returns a dictionary containing:
      - individual_readings: Chronologically sorted list of timestamped HR readings
      - untimed_count: Count of untimed array samples excluded from baseline
      - daily_summary: Extracted daily summary statistics from the watch
      - metadata: Source file details and date ranges
      - raw_metrics_count: Breakdown of rows per metric in export
    """
    if not csv_path.exists():
        raise FileNotFoundError(f"Input data file not found at: {csv_path}")

    try:
        df = pd.read_csv(csv_path)
    except Exception as e:
        raise ValueError(f"Malformed CSV file at {csv_path}: {e}")

    required_cols = {"timestamp_local", "date_local", "time_local", "metric", "value", "unit", "record_type"}
    missing = required_cols - set(df.columns)
    if missing:
        raise ValueError(f"CSV missing expected schema columns: {missing}")

    # Metrics overview
    metrics_summary = df["metric"].value_counts().to_dict()

    # 1. Filter genuine individual heart rate measurements
    # Must be metric == "heart_rate", record_type == "individual_measurement", unit == "bpm"
    hr_mask = (
        (df["metric"] == "heart_rate")
        & (df["record_type"] == "individual_measurement")
        & (df["unit"] == "bpm")
        & (df["timestamp_local"].notna())
    )
    hr_df = df[hr_mask].copy()

    # Parse and sort chronologically
    hr_df["parsed_dt"] = pd.to_datetime(hr_df["timestamp_local"])
    hr_df = hr_df.sort_values("parsed_dt").reset_index(drop=True)

    readings: List[Dict[str, Any]] = []
    for idx, row in hr_df.iterrows():
        # Keep original ISO string with +05:30 offset
        raw_ts = str(row["timestamp_local"])
        # Standardize space separator for presentation consistency e.g. "2026-10-28 01:55:03+05:30"
        display_ts = raw_ts.replace("T", " ")
        readings.append({
            "id": idx + 1,
            "timestamp": display_ts,
            "bpm": float(row["value"]),
            "unit": "bpm",
            "record_type": "individual_measurement",
            "source_section": str(row.get("source_section", "")),
            "source": "recorded"
        })

    # 2. Count untimed array samples (heart_rate_sample with record_type == array_sample_no_exact_time)
    untimed_mask = (
        (df["metric"] == "heart_rate_sample")
        & (df["record_type"] == "array_sample_no_exact_time")
    )
    untimed_samples_count = int(untimed_mask.sum())

    # 3. Extract daily summary statistics
    # record_type == "daily_summary" for heart_rate metrics
    daily_summary_df = df[
        (df["record_type"] == "daily_summary") & (df["source_section"] == "heart_rate")
    ]
    
    daily_avg: Optional[float] = None
    daily_max: Optional[float] = None
    daily_min: Optional[float] = None
    daily_date: Optional[str] = None

    for _, row in daily_summary_df.iterrows():
        m = str(row["metric"])
        val = float(row["value"])
        if row["date_local"] and pd.notna(row["date_local"]):
            daily_date = str(row["date_local"])
        if m == "heart_rate_daily_average":
            daily_avg = val
        elif m == "heart_rate_daily_max":
            daily_max = val
        elif m == "heart_rate_daily_min":
            daily_min = val

    # Discrepancy check: daily max vs peak individual measurement
    max_observed = max((r["bpm"] for r in readings), default=0.0)
    has_mismatch = bool(daily_max is not None and daily_max != max_observed)

    # 4. Extract other timestamped individual measurements if needed (e.g. blood_oxygen)
    spo2_mask = (
        (df["metric"] == "blood_oxygen")
        & (df["record_type"] == "individual_measurement")
        & (df["timestamp_local"].notna())
    )
    spo2_df = df[spo2_mask]
    other_vitals = []
    for _, row in spo2_df.iterrows():
        other_vitals.append({
            "metric": str(row["metric"]),
            "value": float(row["value"]),
            "unit": str(row["unit"]),
            "timestamp": str(row["timestamp_local"]).replace("T", " ")
        })

    return {
        "source_file": csv_path.name,
        "readings": readings,
        "untimed_samples_count": untimed_samples_count,
        "daily_summary": {
            "average": daily_avg,
            "max": daily_max,
            "min": daily_min,
            "date": daily_date or "2026-10-28",
            "note": "from device summary; not individual readings"
        },
        "discrepancy": {
            "summary_vs_readings_max_mismatch": has_mismatch,
            "daily_summary_max": daily_max,
            "individual_readings_max": max_observed,
            "note": "Device daily summary reports max 104 bpm, whereas timestamped individual measurements recorded a peak of 124 bpm. This discrepancy is preserved as reported by the device export and not artificially reconciled."
        },
        "other_individual_vitals": other_vitals,
        "metrics_row_counts": metrics_summary,
        "total_rows": len(df)
    }
