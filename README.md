# UrgentIQ — Emergency Care & Smartwatch Vitals

UrgentIQ is an academic emergency department clinical dashboard and smartwatch vitals prototype. It integrates real-time ER patient prioritization with **recorded DaFit smartwatch heart-rate replay**, non-parametric personal baseline analysis (Median, MAD), and statistical deviation review.

> **IMPORTANT CLINICAL & REGULATORY NOTICE**  
> UrgentIQ is an academic research and engineering prototype. It is **NOT** a certified medical device and **NEVER** claims clinical diagnosis, risk prediction, or a validated machine learning model. Statistical deviations reflect differences from preliminary recorded personal patterns only.

---

## 1. Quick Start

### Running the Python/Flask Smartwatch Vitals Prototype
```bash
# Navigate to the UrgentIQ directory
cd "c:/Study/3rd Sem/HSM/Prototype/UrgentIQ"

# 1. Install Python dependencies
pip install -r requirements.txt

# 2. Run the Flask backend (serves API & static frontend at http://127.0.0.1:5000/)
python app.py
```
- Open `http://127.0.0.1:5000/` in your browser.
- Sign in with the demo credentials:
  - **Hospital:** `City General Hospital`
  - **Username:** `doctor`
  - **Password:** `Demo@123`
- Click the **Watch Vitals** tab in the sidebar (`⌚ Watch Vitals`).

### Running the Test Suite
```bash
python -m pytest tests/test_vitals.py -v
```
All 18 automated tests verify data loading, metric isolation, baseline accuracy, robust Z-score calculations, and API input validation.

### (Optional) Running the React/Vite Dashboard
```bash
npm install
npm run dev
```

---

## 2. Organized Project Structure

```text
UrgentIQ/
├── app.py                      # Flask backend: serves static frontend, API routes, error handling
├── requirements.txt            # Python dependencies: flask, pandas, pytest, numpy
├── README.md                   # Complete documentation and verification guide
│
├── core/                       # Core smartwatch vitals processing engine
│   ├── __init__.py
│   ├── loader.py               # Metric-driven CSV loader, timezone preservation, discrepancy detection
│   ├── baseline.py             # Non-parametric baseline (median, MAD) and robust Z-score analyzer
│   └── source.py               # DataSource ABC & RecordedCSVSource (ready for live BLE plug-in)
│
├── data/                       # Ground-truth input and reference datasets
│   ├── dafit_vitals_yesterday_today.csv  # 531-row raw DaFit export
│   ├── personal_baseline.json            # Reference baseline metrics
│   └── analyzed_heart_rate.csv           # Reference analyzed reading series (19 rows)
│
├── static/                     # Frontend web application
│   └── index.html              # Single-page UrgentIQ app (vanilla JS, light theme, Watch Vitals tab)
│
├── tests/                      # Pytest test suite
│   └── test_vitals.py          # 18 automated unit and API integration tests
│
├── server/                     # FastAPI & BLE hardware integration server
│   ├── smartwatch_server.py    # Bleak BLE scanner, WebSocket streaming, and SQLite storage
│   └── vitals_lab.db           # SQLite database for hardware sessions and validity tests
│
└── src/                        # React / TanStack Start emergency department dashboard
    ├── components/             # Reusable UI components
    ├── routes/                 # File-based application routes
    └── styles.css              # Global styles
```

---

## 3. Data Architecture & Known Facts

The prototype processes `data/dafit_vitals_yesterday_today.csv` strictly according to verified data boundaries:

1. **Genuine Individual Heart Rate Readings (19 Rows):**
   - Filtered by `metric == "heart_rate"` AND `record_type == "individual_measurement"` AND `unit == "bpm"`.
   - Sorted chronologically from `2026-10-28 01:55:03+05:30` to `2026-10-28 10:27:53.138000+05:30`.
   - Timezone offset `+05:30` is strictly preserved.
2. **Untimed Array Samples Excluded (288 Rows):**
   - Rows where `metric == "heart_rate_sample"` and `record_type == "array_sample_no_exact_time"`.
   - Lacks per-sample timestamps in the hardware export.
   - **Never fabricated, interpolated, or smoothed.** Excluded from baseline and time-series replay, and reported as an audit count note (`untimed_samples_excluded: 288`).
3. **Device Daily Summaries Kept Separate:**
   - Rows where `record_type == "daily_summary"` and `source_section == "heart_rate"`.
   - Reports: Average = 81 bpm, Min = 52 bpm, Max = 104 bpm.
4. **Device Summary vs. Measurement Discrepancy Surfaced:**
   - The device summary claims daily max = **104 bpm**.
   - Timestamped individual measurements show an actual peak of **124 bpm** (Reading #5 at `02:07:10`).
   - UrgentIQ surfaces this discrepancy in the API and UI; it does **not** artificially reconcile or alter hardware readings.
5. **Other Metrics Isolated:**
   - Isolated `blood_oxygen` individual measurement (98% SpO₂) is kept out of the heart-rate baseline.

---

## 4. Statistical Baseline & Deviation Formula

Baseline calculations use robust, non-parametric statistics derived strictly from the 19 recorded readings:

- **Median:** $84.0\text{ BPM}$
- **Mean:** $84.53\text{ BPM}$
- **Min / Max Observed:** $52.0\text{ BPM} / 124.0\text{ BPM}$
- **Q1 / Q3:** $81.0\text{ BPM} / 88.5\text{ BPM}$
- **Median Absolute Deviation (MAD):**
  $$\text{MAD} = \text{median}(|x_i - \text{median}|) = 4.0\text{ BPM}$$
- **Robust Z-Score Formula:**
  $$\text{Robust } Z = \frac{1}{1.4826} \times \frac{\text{BPM} - \text{median}}{\text{MAD}} = 0.6744907594765952 \times \frac{\text{BPM} - 84.0}{4.0}$$
- **Classification Rules:**
  - $|\text{Robust } Z| \le 3.5 \implies \text{"within_personal_statistical_pattern"}$
  - $|\text{Robust } Z| > 3.5 \implies \text{"unusual_deviation_review"}$
  - **No clinical terminology** (e.g. "abnormal", "dangerous", or "emergency") is used.

---

## 5. Backend API Endpoints

### `GET /api/data`
Returns the full replay dataset and personal baseline.
```json
{
  "mode": "recorded",
  "source_file": "dafit_vitals_yesterday_today.csv",
  "readings": [
    {
      "id": 1,
      "timestamp": "2026-10-28 01:55:03+05:30",
      "bpm": 86.0,
      "deviation_bpm": 2.0,
      "robust_z": 0.3372453797382976,
      "status": "within_personal_statistical_pattern",
      "source": "recorded"
    }
  ],
  "baseline": {
    "individual_readings": 19,
    "median_bpm": 84.0,
    "mean_bpm": 84.53,
    "mad_bpm": 4.0,
    "min_observed_bpm": 52.0,
    "max_observed_bpm": 124.0,
    "q1_bpm": 81.0,
    "q3_bpm": 88.5,
    "status": "preliminary; limited data"
  },
  "daily_summary": {
    "average": 81.0,
    "max": 104.0,
    "min": 52.0,
    "date": "2026-10-28",
    "note": "from device summary; not individual readings"
  },
  "notes": {
    "untimed_samples_excluded": 288,
    "summary_vs_readings_max_mismatch": true
  },
  "live_feed": {
    "freshness_seconds": null,
    "connection_status": null,
    "signal_quality": null,
    "note": "BLE/Live streaming interface reserved; currently running in recorded file replay mode."
  }
}
```

### `POST /api/analyze`
Evaluates a candidate heart rate reading against the preliminary baseline.
- **Request Body:** `{"bpm": 124}`
- **Validation:** Must be numeric between 20 and 250 bpm; returns HTTP 400 on invalid input.
- **Response:**
  ```json
  {
    "bpm": 124.0,
    "baseline_bpm": 84.0,
    "deviation_bpm": 40.0,
    "robust_z": 6.7449075947659525,
    "status": "unusual_deviation_review",
    "source": "test_input",
    "disclaimer": "Statistical deviation is not a diagnosis. Values indicate difference from your preliminary personal pattern."
  }
  ```

### `GET /api/health`
Returns system status and reading count.
```json
{
  "ok": true,
  "mode": "recorded",
  "n_readings": 19
}
```

---

## 6. Number Verification Against the CSV

You can manually verify every number directly in Python:

1. **Verify 19 timestamped individual readings:**
   ```bash
   python -c "import pandas as pd; df = pd.read_csv('data/dafit_vitals_yesterday_today.csv'); hr = df[(df['metric']=='heart_rate') & (df['record_type']=='individual_measurement') & (df['unit']=='bpm')]; print('Count:', len(hr)); print('Values:', list(hr['value']))"
   ```
2. **Verify 288 excluded untimed samples:**
   ```bash
   python -c "import pandas as pd; df = pd.read_csv('data/dafit_vitals_yesterday_today.csv'); print('Untimed:', len(df[(df['metric']=='heart_rate_sample') & (df['record_type']=='array_sample_no_exact_time')]))"
   ```
3. **Verify Median, Mean, and MAD:**
   ```bash
   python -c "import numpy as np; v = np.array([86, 88, 89, 85, 124, 75, 88, 90, 83, 81, 52, 83, 78, 77, 83, 84, 90, 81, 89]); m = np.median(v); mad = np.median(np.abs(v - m)); print(f'Mean: {np.mean(v):.2f}, Median: {m:.1f}, MAD: {mad:.1f}')"
   ```
4. **Verify Robust Z-Scores for Outliers (124 bpm & 52 bpm):**
   ```bash
   python -c "scale = 0.6744907594765952; print('124 BPM Z:', scale * (124 - 84) / 4); print('52 BPM Z:', scale * (52 - 84) / 4)"
   ```
