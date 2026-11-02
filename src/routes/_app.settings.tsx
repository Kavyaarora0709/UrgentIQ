import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bell, Hospital, Save, Sliders, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { Card, DemoNote } from "@/components/urgent/ui";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updatePrefs, useStore } from "@/lib/store";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — UrgentIQ" },
      { name: "description", content: "Department preferences, alert thresholds, and notification controls." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const prefs = useStore((s) => s.prefs);
  const [criticalAlerts, setCriticalAlerts] = useState(prefs.criticalAlerts ?? true);
  const [vitalsAlerts, setVitalsAlerts] = useState(true);
  const [waitTimeAlerts, setWaitTimeAlerts] = useState(true);
  const [sound, setSound] = useState(prefs.sound ?? false);

  const [highRiskThreshold, setHighRiskThreshold] = useState("75");
  const [waitTimeTarget, setWaitTimeTarget] = useState("15");

  const handleSave = () => {
    updatePrefs({
      criticalAlerts,
      sound,
    });
    toast.success("Settings saved successfully", {
      description: "Preferences have been updated for your session.",
    });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage alerts, thresholds and display.</p>
        </div>
        <DemoNote>Configuration is saved to session storage.</DemoNote>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Alerts Preferences */}
        <Card>
          <div className="mb-4 flex items-center gap-2 font-bold text-lg">
            <Bell className="h-5 w-5 text-primary" />
            Alerts & Notifications
          </div>

          <div className="divide-y divide-border">
            <div className="flex items-center justify-between py-3.5">
              <div className="space-y-0.5 pr-4">
                <div className="font-semibold text-foreground text-sm">Critical patient alerts</div>
                <div className="text-xs text-muted-foreground">
                  Notify immediately when a patient is marked critical
                </div>
              </div>
              <Switch checked={criticalAlerts} onCheckedChange={setCriticalAlerts} />
            </div>

            <div className="flex items-center justify-between py-3.5">
              <div className="space-y-0.5 pr-4">
                <div className="font-semibold text-foreground text-sm">Vitals deterioration alerts</div>
                <div className="text-xs text-muted-foreground">
                  Notify on rapid vital sign changes or sudden desaturation
                </div>
              </div>
              <Switch checked={vitalsAlerts} onCheckedChange={setVitalsAlerts} />
            </div>

            <div className="flex items-center justify-between py-3.5">
              <div className="space-y-0.5 pr-4">
                <div className="font-semibold text-foreground text-sm">Wait-time alerts</div>
                <div className="text-xs text-muted-foreground">
                  Notify when a high priority wait exceeds its target
                </div>
              </div>
              <Switch checked={waitTimeAlerts} onCheckedChange={setWaitTimeAlerts} />
            </div>

            <div className="flex items-center justify-between py-3.5">
              <div className="space-y-0.5 pr-4">
                <div className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  Sound notifications
                </div>
                <div className="text-xs text-muted-foreground">
                  Play an auditory tone for new high-severity clinical alerts
                </div>
              </div>
              <Switch checked={sound} onCheckedChange={setSound} />
            </div>
          </div>
        </Card>

        {/* Thresholds & Department Info */}
        <Card>
          <div className="mb-4 flex items-center gap-2 font-bold text-lg">
            <Sliders className="h-5 w-5 text-primary" />
            Clinical Thresholds & Department
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-3.5">
              <div>
                <div className="font-semibold text-foreground text-sm">High-risk threshold</div>
                <div className="text-xs text-muted-foreground">Minimum AI risk score for urgent escalation</div>
              </div>
              <Select value={highRiskThreshold} onValueChange={setHighRiskThreshold}>
                <SelectTrigger className="w-28 text-xs font-semibold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="65">≥ 65%</SelectItem>
                  <SelectItem value="75">≥ 75%</SelectItem>
                  <SelectItem value="85">≥ 85%</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between border-b pb-3.5">
              <div>
                <div className="font-semibold text-foreground text-sm">Wait-time target (High)</div>
                <div className="text-xs text-muted-foreground">Maximum target time before first clinician review</div>
              </div>
              <Select value={waitTimeTarget} onValueChange={setWaitTimeTarget}>
                <SelectTrigger className="w-28 text-xs font-semibold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 min</SelectItem>
                  <SelectItem value="15">15 min</SelectItem>
                  <SelectItem value="20">20 min</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between border-b pb-3.5">
              <div className="flex items-center gap-2">
                <Hospital className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold text-foreground text-sm">Hospital</span>
              </div>
              <span className="text-xs font-bold text-muted-foreground">City General Hospital</span>
            </div>

            <Button onClick={handleSave} className="w-full gap-2 font-semibold">
              <Save className="h-4 w-4" /> Save changes
            </Button>
          </div>
        </Card>
      </div>

      <div className="text-xs text-muted-foreground pt-4">
        Academic prototype · not a clinically validated product. All patient data is simulated.
      </div>
    </div>
  );
}
