import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TrendPoint } from "@/lib/data";

export const SERIES = [
  { key: "hr", name: "Heart Rate", color: "var(--chart-1)" },
  { key: "spo2", name: "SpO₂", color: "var(--chart-2)" },
  { key: "sys", name: "Systolic BP", color: "var(--chart-3)" },
  { key: "rr", name: "Respiratory Rate", color: "var(--chart-4)" },
] as const;

export function TrendChart({ data, keys = ["hr", "spo2", "sys", "rr"], height = 240 }: { data: TrendPoint[]; keys?: string[]; height?: number }) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
          <CartesianGrid stroke="var(--border)" vertical={false} />
          <XAxis dataKey="time" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} domain={["auto", "auto"]} />
          <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid var(--border)", fontSize: 12 }} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
          {SERIES.filter((s) => keys.includes(s.key)).map((s) => (
            <Line key={s.key} type="monotone" dataKey={s.key} name={s.name} stroke={s.color} strokeWidth={2} dot={{ r: 2 }} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
