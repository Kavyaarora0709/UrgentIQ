import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

describe("App routing", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

  it("matches a page for / instead of falling back to not found", () => {
    const matches = router.matchRoutes("/");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches Smartwatch Vitals Lab route (/smartwatch)", () => {
    const matches = router.matchRoutes("/smartwatch");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    expect(matches.some((m) => m.pathname === "/smartwatch")).toBe(true);
  });

  it("matches all core routes in navigation", () => {
    const routes = ["/dashboard", "/queue", "/patients", "/alerts", "/analytics", "/settings"];
    for (const r of routes) {
      const matches = router.matchRoutes(r);
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    }
  });
});
