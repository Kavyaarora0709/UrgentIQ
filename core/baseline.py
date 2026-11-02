"""
Statistical baseline and deviation analysis module for UrgentIQ Watch Vitals.
Calculates non-parametric preliminary baselines (Median, MAD) and computes
robust Z-scores without assuming medical normality or inferring resting heart rate.
"""

from typing import Any, Dict, List
import numpy as np

# Multiplier for median absolute deviation consistency to normal distribution:
# 1 / 1.482602218505602 ≈ 0.6744907594765952
MAD_SCALE_FACTOR = 0.6744907594765952
Z_SCORE_THRESHOLD = 3.5

STATUS_WITHIN_PATTERN = "within_personal_statistical_pattern"
STATUS_UNUSUAL_DEVIATION = "unusual_deviation_review"
BASELINE_STATUS = "preliminary; limited data"


def compute_baseline(readings: List[Dict[str, Any]], source_file: str = "dafit_vitals_yesterday_today.csv") -> Dict[str, Any]:
    """
    Compute non-parametric preliminary personal baseline statistics from recorded readings.
    Matches exact reference specification in personal_baseline.json.
    """
    if not readings:
        raise ValueError("Cannot calculate baseline on empty readings series.")

    bpms = np.array([float(r["bpm"]) for r in readings])
    n = len(bpms)

    median_val = float(np.median(bpms))
    mean_val = round(float(np.mean(bpms)), 2)
    min_val = float(np.min(bpms))
    max_val = float(np.max(bpms))
    q1_val = float(np.percentile(bpms, 25))
    q3_val = float(np.percentile(bpms, 75))

    abs_deviations = np.abs(bpms - median_val)
    mad_val = float(np.median(abs_deviations))

    start_ts = readings[0]["timestamp"]
    end_ts = readings[-1]["timestamp"]

    return {
        "source_file": source_file,
        "individual_readings": n,
        "mean_bpm": mean_val,
        "median_bpm": median_val,
        "min_observed_bpm": min_val,
        "max_observed_bpm": max_val,
        "q1_bpm": q1_val,
        "q3_bpm": q3_val,
        "mad_bpm": mad_val,
        "data_start_ist": start_ts,
        "data_end_ist": end_ts,
        "status": BASELINE_STATUS,
        "disclaimer": "Preliminary personal statistical baseline. Not a clinically validated resting heart rate or medical reference range."
    }


def analyze_bpm(bpm: float, baseline: Dict[str, Any], source_label: str = "recorded") -> Dict[str, Any]:
    """
    Evaluate a heart rate reading against the personal baseline using robust Z-score.
    
    Formula:
      robust_z = 0.6744907594765952 * (bpm - median_bpm) / mad_bpm
      
    Status:
      |robust_z| <= 3.5 -> 'within_personal_statistical_pattern'
      |robust_z| > 3.5  -> 'unusual_deviation_review'
    """
    median_val = float(baseline["median_bpm"])
    mad_val = float(baseline["mad_bpm"])
    
    deviation = round(bpm - median_val, 2)

    if mad_val > 0:
        robust_z = (MAD_SCALE_FACTOR * (bpm - median_val)) / mad_val
    else:
        robust_z = 0.0

    if abs(robust_z) <= Z_SCORE_THRESHOLD:
        status = STATUS_WITHIN_PATTERN
    else:
        status = STATUS_UNUSUAL_DEVIATION

    return {
        "bpm": float(bpm),
        "baseline_bpm": median_val,
        "deviation_bpm": deviation,
        "robust_z": robust_z,
        "status": status,
        "source": source_label,
        "disclaimer": "Statistical deviation is not a diagnosis. Values indicate difference from your preliminary personal pattern."
    }


def enrich_readings_with_analysis(readings: List[Dict[str, Any]], baseline: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Enrich a list of readings with deviation, robust_z, and status attributes.
    """
    enriched = []
    for r in readings:
        analysis = analyze_bpm(r["bpm"], baseline, source_label="recorded")
        enriched.append({
            "id": r["id"],
            "timestamp": r["timestamp"],
            "bpm": r["bpm"],
            "deviation_bpm": analysis["deviation_bpm"],
            "robust_z": analysis["robust_z"],
            "status": analysis["status"],
            "source": "recorded"
        })
    return enriched
