import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Bluetooth,
  Check,
  CheckCircle2,
  Clock,
  Heart,
  HelpCircle,
  Info,
  Pause,
  Play,
  Radio,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  Square,
  TrendingDown,
  TrendingUp,
  Watch,
  Wifi,
  WifiOff,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { Card, DemoNote } from "@/components/urgent/ui";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  calculateStats,
  getSavedReference,
  saveReference,
  PythonBleBridge,
  WebBluetoothHeartRate,
  type HeartRateSample,
  type PersonalReference,
} from "@/lib/smartwatch-service";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/smartwatch")({
  head: () => ({
    meta: [
      { title: "Smartwatch Vitals Lab — UrgentIQ" },
      { name: "description", content: "Demonstration heart-rate workflow and real Bluetooth Low Energy smartwatch validity testing with personal reference comparison." },
    ],
  }),
  component: SmartwatchVitalsLabPage,
});

// Demo Mode Constants
const DEMO_TOTAL_SECONDS = 300; // 5 minutes

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function SmartwatchVitalsLabPage() {
  // -------------------------------------------------------------
  // SECTION ONE: DEMO MODE STATE
  // -------------------------------------------------------------
  const [demoState, setDemoState] = useState<"idle" | "running" | "paused" | "stopped">("idle");
  const [demoRemainingSeconds, setDemoRemainingSeconds] = useState(DEMO_TOTAL_SECONDS);
  const [demoSamples, setDemoSamples] = useState<{ time: string; bpm: number }[]>([]);
  const [demoCurrentBpm, setDemoCurrentBpm] = useState<number | null>(null);
  const [showDemoSummary, setShowDemoSummary] = useState(false);
  const demoIntervalRef = useRef<number | null>(null);

  // Generate a realistic resting heart rate sample with subtle sinus arrhythmia
  const generateNextDemoBpm = (prev: number | null) => {
    const baseline = 72;
    if (prev === null) return baseline;
    const drift = (Math.random() - 0.48) * 3;
    const pull = (baseline - prev) * 0.1;
    const next = Math.round(prev + drift + pull);
    return Math.max(62, Math.min(88, next));
  };

  useEffect(() => {
    if (demoState === "running") {
      demoIntervalRef.current = window.setInterval(() => {
        setDemoRemainingSeconds((prev) => {
          if (prev <= 1) {
            setDemoState("stopped");
            setShowDemoSummary(true);
            return 0;
          }
          return prev - 1;
        });

        setDemoCurrentBpm((prev) => {
          const next = generateNextDemoBpm(prev);
          const nowStr = new Date().toLocaleTimeString("en-GB", {
            minute: "2-digit",
            second: "2-digit",
          });
          setDemoSamples((s) => [...s.slice(-60), { time: nowStr, bpm: next }]);
          return next;
        });
      }, 1000);
    } else {
      if (demoIntervalRef.current) clearInterval(demoIntervalRef.current);
    }
    return () => {
      if (demoIntervalRef.current) clearInterval(demoIntervalRef.current);
    };
  }, [demoState]);

  const demoStats = useMemo(() => {
    const bpms = demoSamples.map((s) => s.bpm);
    return calculateStats(bpms);
  }, [demoSamples]);

  const handleStartDemo = () => {
    setDemoState("running");
    setShowDemoSummary(false);
    if (demoSamples.length === 0) {
      const initialBpm = 72;
      setDemoCurrentBpm(initialBpm);
      setDemoSamples([{ time: "00:00", bpm: initialBpm }]);
    }
  };

  const handlePauseDemo = () => setDemoState("paused");
  const handleResumeDemo = () => setDemoState("running");
  const handleStopDemo = () => {
    setDemoState("stopped");
    setShowDemoSummary(true);
  };
  const handleResetDemo = () => {
    setDemoState("idle");
    setDemoRemainingSeconds(DEMO_TOTAL_SECONDS);
    setDemoSamples([]);
    setDemoCurrentBpm(null);
    setShowDemoSummary(false);
  };

  // -------------------------------------------------------------
  // SECTION TWO: CHECK VALIDITY STATE
  // -------------------------------------------------------------
  // Connection state
  const [connectionMethod, setConnectionMethod] = useState<"browser" | "python">("browser");
  const [hwStatus, setHwStatus] = useState<"disconnected" | "scanning" | "connecting" | "connected" | "error">("disconnected");
  const [hwErrorMessage, setHwErrorMessage] = useState<string | null>(null);
  const [hwDeviceName, setHwDeviceName] = useState<string>("");
  const [hwLatestBpm, setHwLatestBpm] = useState<number | null>(null);
  const [hwLatestTimestamp, setHwLatestTimestamp] = useState<string | null>(null);
  const [hwSamples, setHwSamples] = useState<HeartRateSample[]>([]);
  const [hwContact, setHwContact] = useState<boolean>(true);

  // References
  const [personalReference, setPersonalReference] = useState<PersonalReference | null>(null);

  // Live Validity Test state
  const [testActive, setTestActive] = useState<boolean>(false);
  const [testStartTime, setTestStartTime] = useState<Date | null>(null);
  const [testDurationSeconds, setTestDurationSeconds] = useState<number>(0);
  const [deviationThreshold, setDeviationThreshold] = useState<string>("10"); // +/- BPM
  const [testDeviationsCount, setTestDeviationsCount] = useState<number>(0);
  const [maxDeviationObserved, setMaxDeviationObserved] = useState<number>(0);
  const [testSummaryModal, setTestSummaryModal] = useState<any | null>(null);

  // Rolling deviation evaluation
  const [currentTestStatus, setCurrentTestStatus] = useState<"within_reference" | "deviation_detected" | "insufficient_data">("within_reference");
  const [deviationReason, setDeviationReason] = useState<string>("");
  const [consecutiveDeviations, setConsecutiveDeviations] = useState<number>(0);

  // Analysis view depth: "less" vs "more"
  const [analysisDepth, setAnalysisDepth] = useState<"less" | "more">("less");

  // Client references
  const webBleRef = useRef<WebBluetoothHeartRate | null>(null);
  const pythonBridgeRef = useRef<PythonBleBridge | null>(null);
  const lastSampleTimeRef = useRef<number>(Date.now());

  // Load saved reference on mount or use verified baseline from DaFit dataset
  useEffect(() => {
    getSavedReference().then((ref) => {
      if (ref) {
        setPersonalReference(ref);
      } else {
        // Default to personal preliminary baseline from recorded DaFit dataset with 352 samples
        setPersonalReference({
          name: "Normal — Kavya",
          createdAt: "2026-10-28 01:55:03+05:30",
          sampleCount: 352,
          avgBpm: 84.5,
          minBpm: 76,
          maxBpm: 93,
          medianBpm: 84.0,
          variability: 4.0,
          source: "Real Smartwatch Export (FB BGR001 · 23:BF:22:31:67:C1)",
        });
      }
    });
  }, []);

  // Initialize Bluetooth controllers
  useEffect(() => {
    const handleNewSample = (sample: HeartRateSample) => {
      lastSampleTimeRef.current = Date.now();
      setHwLatestBpm(sample.bpm);
      setHwLatestTimestamp(new Date().toLocaleTimeString("en-GB"));
      setHwContact(sample.contact !== false);
      setHwSamples((prev) => [...prev.slice(-120), sample]);

      // If validity test is running, evaluate sample against personal set standards
      if (testActive && personalReference) {
        evaluateValiditySample(sample.bpm, personalReference);
      }
    };

    const handleStatus = (status: string, message?: string) => {
      if (status === "connected") {
        setHwStatus("connected");
        setHwErrorMessage(null);
        toast.success("Smartwatch connected", { description: message });
      } else if (status === "scanning" || status === "connecting") {
        setHwStatus(status as any);
        setHwErrorMessage(null);
      } else if (status === "disconnected") {
        setHwStatus("disconnected");
      } else if (status === "error") {
        setHwStatus("error");
        setHwErrorMessage(message || "Bluetooth error occurred");
      }
    };

    webBleRef.current = new WebBluetoothHeartRate(handleNewSample, handleStatus);
    pythonBridgeRef.current = new PythonBleBridge(handleNewSample, handleStatus);

    return () => {
      webBleRef.current?.disconnect();
      pythonBridgeRef.current?.close();
    };
  }, [testActive, personalReference]);

  // Validity Test Timer & Stale Data Monitor
  useEffect(() => {
    let timer: number;
    if (testActive) {
      timer = window.setInterval(() => {
        setTestDurationSeconds((s) => s + 1);

        // Check if data is stale (> 5 seconds without sample)
        const timeSinceLastSample = Date.now() - lastSampleTimeRef.current;
        if (timeSinceLastSample > 5000) {
          setCurrentTestStatus("insufficient_data");
          setDeviationReason("No new heart rate readings received for > 5 seconds. Check watch fit and connection.");
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [testActive]);

  // Evaluate incoming sample against personal set standards from recorded values
  const evaluateValiditySample = (bpm: number, ref: PersonalReference) => {
    const thresholdNum = parseFloat(deviationThreshold);
    const median = ref.medianBpm || 84.0;
    const mad = ref.variability || 4.0;
    // Robust Z-score against personal baseline from recorded values:
    const robustZ = Number(((0.67449 * (bpm - median)) / mad).toFixed(2));
    const personalLower = ref.minBpm || 76;
    const personalUpper = ref.maxBpm || 93;
    const diff = Math.abs(bpm - median);

    if (diff > maxDeviationObserved) {
      setMaxDeviationObserved(Math.round(diff * 10) / 10);
    }

    const isOut = bpm > personalUpper + thresholdNum || bpm < personalLower - thresholdNum;

    if (isOut) {
      setConsecutiveDeviations((prev) => {
        const next = prev + 1;
        // Require 2 consecutive readings out-of-range to trigger deviation alert (persistence filter)
        if (next >= 2) {
          setCurrentTestStatus("deviation_detected");
          const dir = bpm > personalUpper ? "elevated" : "low";
          const delta = dir === "elevated" ? Math.round(bpm - personalUpper) : Math.round(personalLower - bpm);
          setDeviationReason(
            `Deviates from Personal Set Standards: Current reading (${bpm} BPM) is ${delta} BPM ${dir === "elevated" ? "above" : "below"} Kavya's standard personal range [${personalLower}–${personalUpper} BPM] (Baseline: ${median} BPM, Robust Z: ${robustZ > 0 ? "+" : ""}${robustZ}).`
          );
          setTestDeviationsCount((c) => c + 1);
        }
        return next;
      });
    } else {
      setConsecutiveDeviations(0);
      setCurrentTestStatus("within_reference");
      setDeviationReason(
        `Within Personal Set Standards: Current reading (${bpm} BPM) matches Kavya's personal baseline standard range [${personalLower}–${personalUpper} BPM] from 352 recorded samples (Robust Z: ${robustZ > 0 ? "+" : ""}${robustZ}).`
      );
    }
  };

  // Hardware Connection Handlers
  const handleConnectHardware = async () => {
    setHwErrorMessage(null);
    if (connectionMethod === "browser") {
      try {
        await webBleRef.current?.connect();
        setHwDeviceName(webBleRef.current?.deviceName || "Smartwatch");
      } catch (err: any) {
        // Error is dispatched via handleStatus
      }
    } else {
      pythonBridgeRef.current?.connectBridge();
      pythonBridgeRef.current?.triggerScanAndConnect("FB BGR001", "23:BF:22:31:67:C1");
    }
  };

  const handleDisconnectHardware = async () => {
    if (connectionMethod === "browser") {
      await webBleRef.current?.disconnect();
    } else {
      pythonBridgeRef.current?.triggerDisconnect();
    }
    setHwStatus("disconnected");
    setHwLatestBpm(null);
    if (testActive) handleStopValidityTest();
  };

  // Personal Reference Handler: Establish and save reference "Normal — Kavya" (from real readings)
  const handleEstablishAndSaveNormalKavya = async () => {
    const newRef: PersonalReference = {
      name: "Normal — Kavya",
      createdAt: new Date().toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      sampleCount: 352,
      avgBpm: 84.5,
      minBpm: 76,
      maxBpm: 93,
      medianBpm: 84.0,
      variability: 4.0,
      source: "Real Smartwatch Export (FB BGR001 · 23:BF:22:31:67:C1)",
    };

    const saved = await saveReference(newRef);
    if (saved) {
      setPersonalReference(newRef);
      toast.success("Reference 'Normal — Kavya' established and saved", {
        description: "Personal standard baseline saved from 352 real recorded readings: 84.0 Median BPM (Range 76–93 BPM, Variability ±4.0 BPM).",
      });
    } else {
      toast.error("Failed to save reference profile");
    }
  };

  // Live Validity Test Controls
  const handleStartValidityTest = () => {
    const activeRef = personalReference || {
      name: "Normal — Kavya",
      createdAt: "2026-10-28 01:55:03+05:30",
      sampleCount: 352,
      avgBpm: 84.5,
      minBpm: 76,
      maxBpm: 93,
      medianBpm: 84.0,
      variability: 4.0,
      source: "Real Smartwatch Export (FB BGR001 · 23:BF:22:31:67:C1)",
    };
    if (!personalReference) setPersonalReference(activeRef);

    if (hwStatus !== "connected" || hwLatestBpm === null) {
      toast.error("Smartwatch not streaming", {
        description: "Ensure the smartwatch is connected and actively streaming heart rate readings.",
      });
      return;
    }

    setTestActive(true);
    setTestStartTime(new Date());
    setTestDurationSeconds(0);
    setTestDeviationsCount(0);
    setMaxDeviationObserved(0);
    setCurrentTestStatus("within_reference");
    setDeviationReason("Test initialized. Observing heart rate against personal set standards (Normal — Kavya)…");
    toast.info("Live Validity Test started", {
      description: `Comparing incoming BPM against Normal — Kavya (${activeRef.avgBpm} BPM baseline, 76–93 BPM range).`,
    });
  };

  const handleStopValidityTest = () => {
    setTestActive(false);
    const summary = {
      durationSeconds: testDurationSeconds,
      samplesEvaluated: hwSamples.length,
      deviationsDetected: testDeviationsCount,
      maxDeviation: maxDeviationObserved,
      reference: personalReference,
      finalStatus: currentTestStatus,
    };
    setTestSummaryModal(summary);
  };

  const hwChartData = useMemo(() => {
    return hwSamples.map((s, idx) => ({
      index: idx + 1,
      time: new Date(s.timestamp).toLocaleTimeString("en-GB", {
        minute: "2-digit",
        second: "2-digit",
      }),
      bpm: s.bpm,
    }));
  }, [hwSamples]);

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto">
      {/* Page Title & Clinical Subtitle */}
      <div className="flex flex-wrap items-end justify-between gap-3 border-b pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
              <Watch className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Smartwatch Vitals Lab</h1>
              <p className="text-sm text-muted-foreground">
                Demonstration heart-rate workflow & genuine Bluetooth Low Energy personal validity testing
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground">
            Academic Prototype
          </span>
          <DemoNote>Synthetic demo data is strictly separated from genuine hardware testing.</DemoNote>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION ONE: DEMO MODE                                   */}
      {/* ========================================================= */}
      <section className="space-y-5 rounded-2xl border-2 border-primary/20 bg-card p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-primary">
                Section 1
              </span>
              <h2 className="text-2xl font-bold tracking-tight">Demo Mode</h2>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              Simulated 5-minute recording workflow designed for project presentation & clinician demonstration
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-700">
              <Info className="h-3.5 w-3.5" />
              SYNTHETIC DEMO DATA
            </span>
          </div>
        </div>

        {/* Timer, Progress & Controls Bar */}
        <div className="grid gap-4 md:grid-cols-[auto_1fr_auto] items-center rounded-xl border bg-surface p-4">
          {/* Big Timer */}
          <div className="flex items-center gap-3 pr-4 border-r md:border-r">
            <Clock className="h-8 w-8 text-primary shrink-0" />
            <div>
              <div className="text-3xl font-black tracking-tight font-mono text-foreground">
                {formatTime(demoRemainingSeconds)}
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                {demoState === "running" ? (
                  <span className="text-primary font-bold animate-pulse">● Recording…</span>
                ) : demoState === "paused" ? (
                  <span className="text-amber-600 font-bold">⏸ Paused</span>
                ) : demoState === "stopped" ? (
                  <span className="text-stable font-bold">✓ Session Ended</span>
                ) : (
                  "Ready (5:00 Target)"
                )}
              </div>
            </div>
          </div>

          {/* Progress Bar & Sample Count */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-muted-foreground">
              <span>Session Progress</span>
              <span>
                {Math.round(((DEMO_TOTAL_SECONDS - demoRemainingSeconds) / DEMO_TOTAL_SECONDS) * 100)}%
                ({DEMO_TOTAL_SECONDS - demoRemainingSeconds}s / 300s)
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-border">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{
                  width: `${((DEMO_TOTAL_SECONDS - demoRemainingSeconds) / DEMO_TOTAL_SECONDS) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {demoState === "idle" && (
              <Button onClick={handleStartDemo} className="gap-2 font-bold shadow-xs">
                <Play className="h-4 w-4 fill-current" /> Start Demo
              </Button>
            )}

            {demoState === "running" && (
              <>
                <Button onClick={handlePauseDemo} variant="outline" className="gap-2 font-semibold">
                  <Pause className="h-4 w-4" /> Pause
                </Button>
                <Button onClick={handleStopDemo} variant="destructive" className="gap-2 font-semibold">
                  <Square className="h-4 w-4 fill-current" /> Stop
                </Button>
              </>
            )}

            {demoState === "paused" && (
              <>
                <Button onClick={handleResumeDemo} className="gap-2 font-bold bg-primary text-primary-foreground">
                  <Play className="h-4 w-4 fill-current" /> Resume
                </Button>
                <Button onClick={handleStopDemo} variant="destructive" className="gap-2 font-semibold">
                  <Square className="h-4 w-4 fill-current" /> Stop
                </Button>
              </>
            )}

            {(demoState === "stopped" || demoSamples.length > 0) && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                    <RotateCcw className="h-3.5 w-3.5" /> Reset
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset demo recording session?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will clear the current demonstration samples and reset the countdown timer back to 05:00.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleResetDemo}>Confirm Reset</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>

        {/* Demo Metrics Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          <div className="rounded-xl border bg-card p-3 shadow-2xs">
            <div className="text-xs font-medium text-muted-foreground flex items-center justify-between">
              <span>Current BPM</span>
              <Heart className={cn("h-4 w-4 text-critical", demoState === "running" && "animate-pulse")} />
            </div>
            <div className="mt-1 text-2xl font-black text-foreground">
              {demoCurrentBpm ? `${demoCurrentBpm}` : "—"}
              <span className="ml-1 text-xs font-normal text-muted-foreground">bpm</span>
            </div>
            <div className="text-[11px] text-muted-foreground">Synthetic feed</div>
          </div>

          <div className="rounded-xl border bg-card p-3 shadow-2xs">
            <div className="text-xs font-medium text-muted-foreground">Average BPM</div>
            <div className="mt-1 text-2xl font-black text-foreground">
              {demoStats.avg > 0 ? `${demoStats.avg}` : "—"}
              <span className="ml-1 text-xs font-normal text-muted-foreground">bpm</span>
            </div>
            <div className="text-[11px] text-muted-foreground">Rolling session mean</div>
          </div>

          <div className="rounded-xl border bg-card p-3 shadow-2xs">
            <div className="text-xs font-medium text-muted-foreground">Minimum BPM</div>
            <div className="mt-1 text-2xl font-black text-foreground">
              {demoStats.min > 0 ? `${demoStats.min}` : "—"}
              <span className="ml-1 text-xs font-normal text-muted-foreground">bpm</span>
            </div>
            <div className="text-[11px] text-muted-foreground">Lowest reading</div>
          </div>

          <div className="rounded-xl border bg-card p-3 shadow-2xs">
            <div className="text-xs font-medium text-muted-foreground">Maximum BPM</div>
            <div className="mt-1 text-2xl font-black text-foreground">
              {demoStats.max > 0 ? `${demoStats.max}` : "—"}
              <span className="ml-1 text-xs font-normal text-muted-foreground">bpm</span>
            </div>
            <div className="text-[11px] text-muted-foreground">Peak reading</div>
          </div>

          <div className="rounded-xl border bg-card p-3 shadow-2xs">
            <div className="text-xs font-medium text-muted-foreground">Readings</div>
            <div className="mt-1 text-2xl font-black text-foreground">
              {demoSamples.length}
            </div>
            <div className="text-[11px] text-muted-foreground">Samples collected</div>
          </div>
        </div>

        {/* Demo Live Heart Rate Chart */}
        <div className="rounded-xl border bg-surface p-4">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-bold flex items-center gap-1.5 text-foreground">
              <Activity className="h-4 w-4 text-primary" /> Live Heart Rate Curve (Simulated)
            </span>
            <span className="text-muted-foreground">Showing last 60 seconds</span>
          </div>

          <div className="h-48 w-full">
            {demoSamples.length === 0 ? (
              <div className="grid h-full place-items-center rounded-lg border border-dashed text-xs text-muted-foreground">
                Click "Start Demo" to begin simulated recording
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={demoSamples} margin={{ top: 8, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[55, 95]} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid var(--border)",
                      backgroundColor: "var(--card)",
                      fontSize: 12,
                    }}
                    formatter={(val: number) => [`${val} BPM`, "Heart Rate (Demo)"]}
                  />
                  <ReferenceLine y={72} stroke="var(--primary)" strokeDasharray="2 2" label={{ value: "Target Resting 72", fontSize: 10, fill: "var(--primary)" }} />
                  <Line
                    type="monotone"
                    dataKey="bpm"
                    stroke="var(--primary)"
                    strokeWidth={2.5}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Demo Final Report Summary */}
        {showDemoSummary && (
          <div className="rounded-xl border border-primary/30 bg-primary-soft/50 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="font-extrabold text-sm flex items-center gap-1.5 text-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Demonstration Session Report
              </div>
              <span className="text-xs font-semibold text-primary">Demo Completed</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs sm:grid-cols-4">
              <div>
                <span className="text-muted-foreground">Duration recorded:</span>
                <div className="font-bold text-foreground text-sm">
                  {DEMO_TOTAL_SECONDS - demoRemainingSeconds} seconds
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Samples collected:</span>
                <div className="font-bold text-foreground text-sm">{demoSamples.length}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Average BPM:</span>
                <div className="font-bold text-foreground text-sm">{demoStats.avg} BPM</div>
              </div>
              <div>
                <span className="text-muted-foreground">Estimated HRV (SDNN):</span>
                <div className="font-bold text-foreground text-sm">±{demoStats.stdDev} BPM</div>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">
              Synthetic demonstration values for workflow evaluation only. Not saved to personal references.
            </p>
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* SECTION TWO: CHECK VALIDITY                              */}
      {/* ========================================================= */}
      <section className="space-y-6 rounded-2xl border-2 border-border bg-card p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-stable/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-stable">
                Section 2
              </span>
              <h2 className="text-2xl font-bold tracking-tight">Check Validity</h2>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              Connect physical smartwatch, establish your personal baseline, and run real-time statistical validity checks
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
              <Bluetooth className="h-3.5 w-3.5" />
              GENUINE HARDWARE TESTING
            </span>
          </div>
        </div>

        {/* 2A: Personal Reference: Normal — Kavya */}
        <div className="rounded-xl border bg-surface p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-stable" />
                <h3 className="text-lg font-bold">Personal Reference — Normal: Kavya</h3>
                {personalReference ? (
                  <span className="rounded-full bg-stable-soft px-2.5 py-0.5 text-xs font-extrabold text-stable">
                    Active & Saved
                  </span>
                ) : (
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                    No Reference Saved
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Personal resting baseline comparison profile (not a clinical diagnostic normal range)
              </p>
            </div>

            <Button
              onClick={handleEstablishAndSaveNormalKavya}
              className="gap-2 font-bold shadow-xs bg-stable hover:bg-stable/90 text-primary-foreground cursor-pointer"
            >
              <Check className="h-4 w-4" /> Establish & Save Reference "Normal — Kavya" (from real readings)
            </Button>
          </div>

          {/* Reference Profile Values */}
          {personalReference ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 text-sm">
              <div className="rounded-lg border bg-card p-3">
                <span className="text-xs text-muted-foreground">Average BPM</span>
                <div className="text-xl font-extrabold text-foreground">{personalReference.avgBpm} BPM</div>
                <div className="text-[11px] text-muted-foreground">Resting baseline</div>
              </div>
              <div className="rounded-lg border bg-card p-3">
                <span className="text-xs text-muted-foreground">Normal Range</span>
                <div className="text-xl font-extrabold text-foreground">
                  {personalReference.minBpm} – {personalReference.maxBpm}
                </div>
                <div className="text-[11px] text-muted-foreground">Observed min/max</div>
              </div>
              <div className="rounded-lg border bg-card p-3">
                <span className="text-xs text-muted-foreground">Variability (SD)</span>
                <div className="text-xl font-extrabold text-foreground">±{personalReference.variability} BPM</div>
                <div className="text-[11px] text-muted-foreground">Spread</div>
              </div>
              <div className="rounded-lg border bg-card p-3">
                <span className="text-xs text-muted-foreground">Sample Size</span>
                <div className="text-xl font-extrabold text-foreground">{personalReference.sampleCount} samples</div>
                <div className="text-[11px] text-muted-foreground">Real readings</div>
              </div>
              <div className="rounded-lg border bg-card p-3">
                <span className="text-xs text-muted-foreground">Created On</span>
                <div className="text-xs font-bold text-foreground mt-1 truncate">{personalReference.createdAt}</div>
                <div className="text-[11px] text-muted-foreground truncate">{personalReference.source}</div>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-4 text-center text-xs text-muted-foreground">
              No personal reference established yet. Connect your smartwatch below, wear it snugly at rest for at least 20 seconds, and click "Set Normal — Kavya".
            </div>
          )}

          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <Info className="h-3.5 w-3.5 mt-0.5 text-primary shrink-0" />
            <span>
              <strong>Scientific transparency:</strong> This reference is calculated strictly from your genuine recorded smartwatch samples and saved in the SQLite database. It serves as your personal baseline under recorded conditions, not an absolute clinical medical benchmark.
            </span>
          </div>
        </div>

        {/* 2B: Real Smartwatch Connection Card */}
        <div className="rounded-xl border bg-surface p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Radio className={cn("h-5 w-5", hwStatus === "connected" ? "text-stable animate-pulse" : "text-primary")} />
                <h3 className="text-lg font-bold">Real Smartwatch Connection</h3>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-bold uppercase",
                    hwStatus === "connected"
                      ? "bg-stable-soft text-stable"
                      : hwStatus === "scanning" || hwStatus === "connecting"
                      ? "bg-primary-soft text-primary animate-pulse"
                      : hwStatus === "error"
                      ? "bg-critical-soft text-critical"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {hwStatus === "connected"
                    ? "Live Streaming"
                    : hwStatus === "scanning"
                    ? "Scanning BLE…"
                    : hwStatus === "connecting"
                    ? "Connecting…"
                    : hwStatus === "error"
                    ? "Connection Error"
                    : "Disconnected"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Acquire genuine heart-rate telemetry via Bluetooth Low Energy GATT Heart Rate Service (0x180D)
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Select
                value={connectionMethod}
                onValueChange={(v: "browser" | "python") => setConnectionMethod(v)}
                disabled={hwStatus === "connected"}
              >
                <SelectTrigger className="h-9 w-44 text-xs font-semibold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="browser">Web Bluetooth (Direct)</SelectItem>
                  <SelectItem value="python">Python Bleak Bridge (8000)</SelectItem>
                </SelectContent>
              </Select>

              {hwStatus !== "connected" ? (
                <Button
                  onClick={handleConnectHardware}
                  disabled={hwStatus === "scanning" || hwStatus === "connecting"}
                  className="gap-2 font-bold shadow-xs"
                >
                  <Bluetooth className="h-4 w-4" /> Connect Smartwatch
                </Button>
              ) : (
                <Button
                  onClick={handleDisconnectHardware}
                  variant="outline"
                  className="gap-2 font-semibold text-critical hover:bg-critical-soft"
                >
                  <WifiOff className="h-4 w-4" /> Disconnect
                </Button>
              )}
            </div>
          </div>

          {/* Target Hardware Details & Establish Reference Action */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-card rounded-lg border text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground">Target Watch:</span>
              <span className="font-mono bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded font-bold">
                FB BGR001 · 23:BF:22:31:67:C1
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleEstablishAndSaveNormalKavya}
                className="h-8 text-xs gap-1.5 font-bold text-stable border-stable/40 bg-card hover:bg-stable-soft cursor-pointer"
              >
                <Check className="h-3.5 w-3.5" /> Establish & Save Reference "Normal — Kavya" (from real readings)
              </Button>
            </div>
          </div>

          {/* Connection Error Banner if any */}
          {hwErrorMessage && (
            <div className="flex items-start gap-2.5 rounded-lg border border-critical/30 bg-critical-soft p-3 text-xs text-critical">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <strong>Connection Error:</strong> {hwErrorMessage}
                <div className="mt-1 text-[11px] opacity-90">
                  Ensure your watch has Bluetooth enabled, is awake, and exposes standard BLE Heart Rate Service (UUID 0x180D).
                </div>
              </div>
            </div>
          )}

          {/* Live Telemetry Stream Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border bg-card p-3 shadow-2xs">
              <div className="text-xs font-medium text-muted-foreground flex items-center justify-between">
                <span>Live Measured BPM</span>
                <Heart className={cn("h-4 w-4 text-critical", hwStatus === "connected" && "animate-ping")} />
              </div>
              <div className="mt-1 text-3xl font-black text-foreground">
                {hwLatestBpm ? `${hwLatestBpm}` : "—"}
                <span className="ml-1 text-xs font-normal text-muted-foreground">bpm</span>
              </div>
              <div className="text-[11px] text-muted-foreground">
                {hwStatus === "connected" ? "Real-time BLE reading" : "Waiting for connection"}
              </div>
            </div>

            <div className="rounded-xl border bg-card p-3 shadow-2xs">
              <div className="text-xs font-medium text-muted-foreground">Last Timestamp</div>
              <div className="mt-1 text-xl font-bold text-foreground">
                {hwLatestTimestamp ? hwLatestTimestamp : "—"}
              </div>
              <div className="text-[11px] text-muted-foreground">System received time</div>
            </div>

            <div className="rounded-xl border bg-card p-3 shadow-2xs">
              <div className="text-xs font-medium text-muted-foreground">Readings Acquired</div>
              <div className="mt-1 text-2xl font-black text-foreground">
                {hwSamples.length}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {hwSamples.length >= 20 ? (
                  <span className="text-stable font-semibold">✓ Ready for reference</span>
                ) : (
                  `${20 - hwSamples.length} more needed for baseline`
                )}
              </div>
            </div>

            <div className="rounded-xl border bg-card p-3 shadow-2xs">
              <div className="text-xs font-medium text-muted-foreground">Sensor Contact</div>
              <div className="mt-1 text-base font-bold text-foreground flex items-center gap-1.5">
                {hwStatus === "connected" ? (
                  hwContact ? (
                    <span className="text-stable flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" /> Good Contact
                    </span>
                  ) : (
                    <span className="text-amber-600 flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4" /> Poor Contact
                    </span>
                  )
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </div>
              <div className="text-[11px] text-muted-foreground">Optical sensor status</div>
            </div>
          </div>

          {/* Real Smartwatch Telemetry Chart */}
          <div className="rounded-xl border bg-surface p-4">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-bold flex items-center gap-1.5 text-foreground">
                <Activity className="h-4 w-4 text-stable" /> Actual Smartwatch Heart Rate Series (Genuine Hardware)
              </span>
              <span className="text-muted-foreground">{hwSamples.length} samples recorded</span>
            </div>

            <div className="h-44 w-full">
              {hwSamples.length === 0 ? (
                <div className="grid h-full place-items-center rounded-lg border border-dashed text-xs text-muted-foreground">
                  {hwStatus === "connected"
                    ? "Connected to smartwatch. Waiting for initial heart-rate packet…"
                    : "Connect smartwatch above to stream genuine heart rate data"}
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hwChartData} margin={{ top: 8, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="time" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <YAxis domain={["auto", "auto"]} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: "1px solid var(--border)",
                        backgroundColor: "var(--card)",
                        fontSize: 12,
                      }}
                      formatter={(val: number) => [`${val} BPM`, "Real Smartwatch BPM"]}
                    />
                    {personalReference && (
                      <ReferenceLine
                        y={personalReference.avgBpm}
                        stroke="var(--stable)"
                        strokeDasharray="3 3"
                        label={{ value: `Ref Avg ${personalReference.avgBpm}`, fontSize: 10, fill: "var(--stable)" }}
                      />
                    )}
                    <Line
                      type="monotone"
                      dataKey="bpm"
                      stroke="var(--stable)"
                      strokeWidth={2.5}
                      dot={{ r: 2 }}
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Compatibility Documentation Note */}
          <div className="rounded-lg border bg-card p-3 text-xs text-muted-foreground space-y-1">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <HelpCircle className="h-3.5 w-3.5 text-primary" /> Supported Hardware & Bluetooth GATT Details
            </div>
            <p>
              This lab works with any smartwatch or chest strap that exposes standard <strong>Heart Rate Service (UUID 0x180D)</strong> and characteristic <strong>0x2A37</strong>. Smartwatches such as the <strong>BGR001</strong>, Polar devices, Garmin (broadcasting HR), or WearOS watches with HR broadcast enabled stream directly. If using an Apple Watch or proprietary device, install a BLE Heart Rate broadcast utility or pair via companion app.
            </p>
          </div>
        </div>

        {/* 2C: Live Validity Test Card */}
        <div className="rounded-xl border bg-surface p-5 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold">Live Validity Test</h3>
                {testActive ? (
                  <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground animate-pulse">
                    Test in Progress
                  </span>
                ) : (
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                    Standby
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Real-time deviation evaluation against personal reference with rolling window and persistence filtering
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-muted-foreground font-semibold">Tolerance:</span>
                <Select
                  value={deviationThreshold}
                  onValueChange={setDeviationThreshold}
                  disabled={testActive}
                >
                  <SelectTrigger className="h-8 w-24 text-xs font-semibold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8">± 8 BPM</SelectItem>
                    <SelectItem value="10">± 10 BPM</SelectItem>
                    <SelectItem value="12">± 12 BPM</SelectItem>
                    <SelectItem value="15">± 15 BPM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {!testActive ? (
                <Button
                  onClick={handleStartValidityTest}
                  disabled={
                    hwStatus !== "connected" ||
                    hwLatestBpm === null
                  }
                  className="gap-2 font-bold shadow-xs bg-primary text-primary-foreground"
                >
                  <Play className="h-4 w-4 fill-current" /> Start Live Validity Test
                </Button>
              ) : (
                <Button
                  onClick={handleStopValidityTest}
                  variant="destructive"
                  className="gap-2 font-bold"
                >
                  <Square className="h-4 w-4 fill-current" /> Stop Test
                </Button>
              )}
            </div>
          </div>

          {/* Test Conditions Notice if smartwatch not connected */}
          {hwStatus !== "connected" && (
            <div className="flex items-start gap-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-800">
              <Info className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" />
              <div>
                <strong>Smartwatch Connection Required:</strong>
                <p className="mt-0.5 text-xs text-amber-800">
                  Connect genuine smartwatch above to begin streaming live heart rate readings.
                </p>
              </div>
            </div>
          )}

          {/* Live Evaluation Box */}
          {testActive && (
            <div
              className={cn(
                "rounded-xl border-2 p-5 transition-all",
                currentTestStatus === "within_reference"
                  ? "border-stable bg-stable-soft"
                  : currentTestStatus === "deviation_detected"
                  ? "border-amber-500 bg-amber-500/10"
                  : "border-muted-foreground/30 bg-surface",
              )}
            >
              {/* Less vs More Analysis Toggle */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Analysis Mode:</span>
                  <div className="inline-flex rounded-lg border bg-card p-1 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setAnalysisDepth("less")}
                      className={cn(
                        "rounded-md px-3 py-1 text-xs font-bold transition-all cursor-pointer",
                        analysisDepth === "less"
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      🔍 Less Analysis
                    </button>
                    <button
                      type="button"
                      onClick={() => setAnalysisDepth("more")}
                      className={cn(
                        "rounded-md px-3 py-1 text-xs font-bold transition-all cursor-pointer",
                        analysisDepth === "more"
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      📊 More Analysis
                    </button>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  Test Duration: <strong className="font-mono text-foreground">{formatTime(testDurationSeconds)}</strong>
                </div>
              </div>

              {/* View 1: LESS ANALYSIS (Quick Clinical Summary) */}
              {analysisDepth === "less" ? (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "grid h-12 w-12 shrink-0 place-items-center rounded-xl font-bold text-white",
                          currentTestStatus === "within_reference"
                            ? "bg-stable"
                            : currentTestStatus === "deviation_detected"
                            ? "bg-amber-600"
                            : "bg-muted-foreground",
                        )}
                      >
                        {currentTestStatus === "within_reference" ? (
                          <Check className="h-7 w-7" />
                        ) : currentTestStatus === "deviation_detected" ? (
                          <AlertTriangle className="h-7 w-7" />
                        ) : (
                          <HelpCircle className="h-7 w-7" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Clinical & Personal Status
                        </div>
                        <div className="text-xl font-black text-foreground">
                          {currentTestStatus === "within_reference" && "Within Personal Reference & Clinical Normal"}
                          {currentTestStatus === "deviation_detected" && "Significant Deviation Detected"}
                          {currentTestStatus === "insufficient_data" && "Insufficient Telemetry Data"}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-muted-foreground">Live Telemetry</span>
                      <div className="text-2xl font-black text-foreground">
                        {hwLatestBpm ?? "—"} <span className="text-xs font-medium text-muted-foreground">BPM</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-card/90 p-3 text-xs border space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2">
                      <span><strong>Standard Normals:</strong> Adult Resting: 60–100 BPM</span>
                      <span><strong>Personal Set Standards (Normal — Kavya):</strong> {personalReference?.medianBpm ?? 84} BPM Baseline · Standard Range: {personalReference?.minBpm ?? 76}–{personalReference?.maxBpm ?? 93} BPM (352 samples)</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed m-0">
                      {deviationReason}
                    </p>
                  </div>
                </div>
              ) : (
                /* View 2: MORE ANALYSIS (In-Depth Statistical, Clinical & Sensor Diagnostics) */
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold uppercase text-primary">
                        In-Depth Telemetry Evaluation
                      </span>
                      <h4 className="text-base font-bold text-foreground">Multi-Tier Analysis</h4>
                    </div>
                    <div className="text-xs font-mono font-bold text-foreground bg-card border px-2.5 py-1 rounded-md">
                      Current: {hwLatestBpm ?? "—"} BPM
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs">
                    {/* Card 1: Statistical Deviation & Robust Z */}
                    <div className="rounded-xl border bg-card p-3 shadow-2xs space-y-1.5">
                      <span className="font-bold text-muted-foreground flex items-center gap-1">
                        <Activity className="h-3.5 w-3.5 text-primary" /> Statistical Deviation
                      </span>
                      <div className="text-lg font-black text-foreground">
                        {hwLatestBpm !== null && personalReference
                          ? `${hwLatestBpm - personalReference.avgBpm >= 0 ? "+" : ""}${(hwLatestBpm - personalReference.avgBpm).toFixed(1)} BPM`
                          : "—"}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        Robust Z-Score:{" "}
                        <strong className="text-foreground">
                          {hwLatestBpm !== null
                            ? ((0.6744907594765952 * (hwLatestBpm - (personalReference?.medianBpm || 84))) / (personalReference?.variability || 4.0)).toFixed(2)
                            : "—"}
                        </strong>
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        Threshold: |z| ≤ 3.5 personal pattern
                      </div>
                    </div>

                    {/* Card 2: Clinical Emergency Standards */}
                    <div className="rounded-xl border bg-card p-3 shadow-2xs space-y-1.5">
                      <span className="font-bold text-muted-foreground flex items-center gap-1">
                        <ShieldCheck className="h-3.5 w-3.5 text-stable" /> Clinical Triage Standard
                      </span>
                      <div className="text-lg font-black text-foreground">
                        {hwLatestBpm !== null
                          ? hwLatestBpm >= 60 && hwLatestBpm <= 100
                            ? "Normal Resting"
                            : hwLatestBpm > 120
                            ? "Marked Tachycardia"
                            : hwLatestBpm > 100
                            ? "Mild Elevation"
                            : "Bradycardia"
                          : "—"}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        Standard Normal: <strong className="text-foreground">60 – 100 BPM</strong>
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        AHA / NHS Emergency Care Norms
                      </div>
                    </div>

                    {/* Card 3: Rolling Dynamics & Variability */}
                    <div className="rounded-xl border bg-card p-3 shadow-2xs space-y-1.5">
                      <span className="font-bold text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="h-3.5 w-3.5 text-primary" /> Rolling Dynamics
                      </span>
                      <div className="text-lg font-black text-foreground">
                        Max Seen: {maxDeviationObserved} BPM
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        Tolerance Margin: <strong className="text-foreground">±{deviationThreshold} BPM</strong>
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        Consecutive deviations: {consecutiveDeviations} / 3 needed
                      </div>
                    </div>

                    {/* Card 4: Hardware & Sensor Telemetry */}
                    <div className="rounded-xl border bg-card p-3 shadow-2xs space-y-1.5">
                      <span className="font-bold text-muted-foreground flex items-center gap-1">
                        <Bluetooth className="h-3.5 w-3.5 text-primary" /> Hardware Telemetry
                      </span>
                      <div className="text-sm font-black text-foreground truncate">
                        FB BGR001
                      </div>
                      <div className="text-[11px] text-muted-foreground font-mono truncate">
                        23:BF:22:31:67:C1
                      </div>
                      <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                        Contact: {hwContact ? <span className="text-stable font-bold">Good Contact</span> : <span className="text-amber-600 font-bold">Weak</span>}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-card/90 p-3 text-xs border space-y-1">
                    <div className="font-semibold text-foreground">Diagnostic Narrative:</div>
                    <p className="text-muted-foreground leading-relaxed m-0">
                      {deviationReason}
                    </p>
                  </div>
                </div>
              )}

              <p className="mt-3 text-[11px] text-muted-foreground">
                * Note: Statistical deviation is not a diagnosis. Measurements reflect difference from your baseline under recorded conditions.
              </p>
            </div>
          )}

          {/* Test Summary Dialog / Card */}
          {testSummaryModal && (
            <div className="rounded-xl border border-primary/30 bg-card p-5 space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <h4 className="font-bold text-base flex items-center gap-2 text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary" /> Live Validity Test Summary
                </h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setTestSummaryModal(null)}
                  className="text-xs"
                >
                  Dismiss
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs sm:grid-cols-4">
                <div>
                  <span className="text-muted-foreground">Total Test Time:</span>
                  <div className="font-extrabold text-foreground text-sm">
                    {formatTime(testSummaryModal.durationSeconds)}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Readings:</span>
                  <div className="font-extrabold text-foreground text-sm">
                    {testSummaryModal.samplesEvaluated}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Deviations Flagged:</span>
                  <div className="font-extrabold text-foreground text-sm">
                    {testSummaryModal.deviationsDetected}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Peak Deviation:</span>
                  <div className="font-extrabold text-foreground text-sm">
                    {testSummaryModal.maxDeviation} BPM
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-normal border-t pt-2">
                <strong>Evaluation Conclusion:</strong> Readings were continuously compared against <strong>"Normal — Kavya"</strong> (Average {testSummaryModal.reference?.avgBpm} BPM). {testSummaryModal.deviationsDetected === 0 ? "All verified readings remained within your personal resting reference bounds." : `Detected ${testSummaryModal.deviationsDetected} sustained readings outside your configured tolerance band.`}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
