import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

describe("App routing", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

  it("matches all public marketing routes", () => {
    const publicRoutes = [
      "/",
      "/platform",
      "/how-it-works",
      "/about",
      "/contact",
      "/privacy",
      "/terms",
      "/disclaimer",
    ];
    for (const r of publicRoutes) {
      const matches = router.matchRoutes(r);
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
      expect(matches.some((m) => m.pathname === r)).toBe(true);
    }
  });

  it("matches the /login authentication route", () => {
    const matches = router.matchRoutes("/login");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    expect(matches.some((m) => m.pathname === "/login")).toBe(true);
  });

  it("matches Smartwatch Vitals Lab route (/smartwatch)", () => {
    const matches = router.matchRoutes("/smartwatch");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    expect(matches.some((m) => m.pathname === "/smartwatch")).toBe(true);
  });

  it("matches all core authenticated routes in navigation", () => {
    const routes = ["/dashboard", "/queue", "/patients", "/alerts", "/analytics", "/settings"];
    for (const r of routes) {
      const matches = router.matchRoutes(r);
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    }
  });
});
