import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, SearchX } from "lucide-react";
import { cn } from "@/lib/utils";
import { patients, SEVERITY_LABEL, SEVERITY_RANK, type Severity } from "@/lib/data";
import { SeverityBadge, sevStyles } from "./ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Filter = "all" | Severity;

export function PatientQueue({ search = "", limit, selectedId, onSelect }: { search?: string; limit?: number; selectedId?: string; onSelect?: (id: string) => void }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<"priority" | "wait">("priority");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: patients.length };
    patients.forEach((p) => (c[p.severity] = (c[p.severity] ?? 0) + 1));
    return c;
  }, []);

  const list = useMemo(() => {
    const q = search.trim().toLowerCase();
    return patients
      .filter((p) => filter === "all" || p.severity === filter)
      .filter((p) => !q || [p.id, p.name, p.complaint].some((f) => f.toLowerCase().includes(q)))
      .sort((a, b) => (sort === "priority" ? SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity] || a.wait - b.wait : b.wait - a.wait));
  }, [filter, sort, search]);

  const shown = limit ? list.slice(0, limit) : list;
  const tabs: Filter[] = ["all", "critical", "high", "moderate", "low"];

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5" role="tablist">
          {tabs.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={filter === t}
              onClick={() => setFilter(t)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors",
                filter === t ? "border-primary bg-primary text-primary-foreground" : t === "all" ? "bg-surface text-foreground hover:bg-accent" : cn(sevStyles[t].soft, sevStyles[t].text, "border-transparent hover:border-border"),
              )}
            >
              {t === "all" ? "All" : SEVERITY_LABEL[t]} ({counts[t] ?? 0})
            </button>
          ))}
        </div>
        <Select value={sort} onValueChange={(v) => setSort(v as "priority" | "wait")}>
          <SelectTrigger className="h-8 w-[170px] text-xs" aria-label="Sort patients"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="priority">Sort by: Priority</SelectItem>
            <SelectItem value="wait">Sort by: Wait time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {shown.length === 0 ? (
        <div className="grid place-items-center rounded-xl border border-dashed py-12 text-center text-muted-foreground">
          <SearchX className="mb-2 h-8 w-8" />
          <p className="font-semibold text-foreground">No patients found</p>
          <p className="text-sm">Try a different search or filter.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {shown.map((p, i) => {
            const s = sevStyles[p.severity];
            const content = (
              <>
                <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold", p.severity === "critical" ? "bg-critical text-primary-foreground" : cn(s.soft, s.text))}>{i + 1}</span>
                <div className="w-24 shrink-0">
                  <div className="font-bold">{p.id}</div>
                  <div className="text-xs text-muted-foreground">{p.age} yrs · {p.gender}</div>
                </div>
                <div className="min-w-0 flex-1 truncate text-sm">{p.complaint}</div>
                <SeverityBadge severity={p.severity} className="hidden sm:inline-flex" />
                <div className="w-16 shrink-0 text-right">
                  <div className="text-[10px] text-muted-foreground">Wait</div>
                  <div className={cn("text-sm font-bold", p.severity === "critical" && "text-critical")}>{p.wait} min</div>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </>
            );
            const cls = cn(
              "flex w-full items-center gap-3 rounded-xl border border-l-4 px-3 py-2.5 text-left transition-shadow hover:shadow-md",
              s.bar,
              p.severity === "critical" ? "bg-critical-soft" : "bg-card",
              selectedId === p.id && "ring-2 ring-primary",
            );
            return (
              <li key={p.id}>
                {onSelect ? (
                  <button className={cls} onClick={() => onSelect(p.id)} aria-label={`Select ${p.id}`}>{content}</button>
                ) : (
                  <Link to="/patients/$id" params={{ id: p.id }} className={cls}>{content}</Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
