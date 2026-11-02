import { describe, expect, it } from "vitest";
import { calculateStats } from "@/lib/smartwatch-service";

describe("Smartwatch Vitals Lab statistics", () => {
  it("calculates accurate stats for sample heart rate values", () => {
    const samples = [70, 72, 74, 76, 78];
    const stats = calculateStats(samples);

    expect(stats.avg).toBe(74);
    expect(stats.min).toBe(70);
    expect(stats.max).toBe(78);
    expect(stats.median).toBe(74);
    expect(stats.stdDev).toBeCloseTo(2.8, 1);
  });

  it("handles empty sample array safely without dividing by zero", () => {
    const stats = calculateStats([]);
    expect(stats.avg).toBe(0);
    expect(stats.min).toBe(0);
    expect(stats.max).toBe(0);
    expect(stats.median).toBe(0);
    expect(stats.stdDev).toBe(0);
  });

  it("calculates median properly for even-length arrays", () => {
    const samples = [60, 70, 80, 90];
    const stats = calculateStats(samples);
    expect(stats.median).toBe(75);
  });
});
