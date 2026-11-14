import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { DEMO_CREDENTIALS, signIn, signOut } from "@/lib/auth";
import { getState } from "@/lib/store";
import { Route as HomeRoute } from "@/routes/index";
import { Route as PlatformRoute } from "@/routes/platform";
import { Route as HowItWorksRoute } from "@/routes/how-it-works";
import { Route as AboutRoute } from "@/routes/about";
import { Route as ContactRoute } from "@/routes/contact";
import { Route as LoginRoute } from "@/routes/login";
import { Route as AppRoute } from "@/routes/_app";
import { Route as DashboardRoute } from "@/routes/_app.dashboard";

function createTestRouter(initialPath: string) {
  const rootRoute = createRootRoute({ component: () => <Outlet /> });
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: HomeRoute.options.component!,
  });
  const platformRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/platform",
    component: PlatformRoute.options.component!,
  });
  const howItWorksRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/how-it-works",
    component: HowItWorksRoute.options.component!,
  });
  const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/about",
    component: AboutRoute.options.component!,
  });
  const contactRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/contact",
    component: ContactRoute.options.component!,
  });
  const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/login",
    component: LoginRoute.options.component!,
  });
  const appLayoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: "_app",
    component: AppRoute.options.component!,
  });
  const dashboardRoute = createRoute({
    getParentRoute: () => appLayoutRoute,
    path: "/dashboard",
    component: DashboardRoute.options.component!,
  });

  // Minimal stub routes for AppShell nav links
  const stubPaths = ["/queue", "/patients", "/smartwatch", "/alerts", "/analytics", "/settings", "/privacy", "/terms", "/disclaimer"] as const;
  const stubRoutes = stubPaths.map((p) =>
    createRoute({
      getParentRoute: () => rootRoute,
      path: p,
      component: () => <div>{p}</div>,
    }),
  );

  const testTree = rootRoute.addChildren([
    indexRoute,
    platformRoute,
    howItWorksRoute,
    aboutRoute,
    contactRoute,
    loginRoute,
    appLayoutRoute.addChildren([dashboardRoute]),
    ...stubRoutes,
  ]);

  return createRouter({
    routeTree: testTree,
    history: createMemoryHistory({ initialEntries: [initialPath] }),
  });
}

async function renderAt(initialPath: string) {
  const queryClient = new QueryClient();
  const router = createTestRouter(initialPath);
  await router.load();
  const utils = render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router as never} />
    </QueryClientProvider>,
  );
  return { router, ...utils };
}

describe("UrgentIQ Marketing & Auth Integration", () => {
  beforeEach(() => {
    sessionStorage.clear();
    signOut();
  });

  it("renders the public landing page at / with all required sections and CTAs", async () => {
    await renderAt("/");
    expect(
      await screen.findByRole("heading", {
        name: /Keep Patient Priority in Step With Changing Conditions\./i,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Request a Demo/i }).length).toBeGreaterThanOrEqual(
      2,
    );
    expect(screen.getByRole("link", { name: /Explore the Platform/i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /^Login$/i }).length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByRole("heading", { name: /Make Every Patient's Changing Condition Visible\./i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Privacy Policy/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Terms of Use/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Product Disclaimer/i })).toBeInTheDocument();

    // Hero illustration showing patients in beds with concurrent alerts
    const heroImg = screen.getByAltText(/emergency department beds/i) as HTMLImageElement;
    expect(heroImg).toHaveAttribute("src", "/hero-ed-beds.jpg");

    // Two planned pricing models (Fixed Rental vs Software + Variable Usage)
    expect(screen.getByText(/Model 1 · Band \+ Software Rental/i)).toBeInTheDocument();
    expect(screen.getByText("₹5,000–₹10,000")).toBeInTheDocument();
    expect(screen.getByText(/Model 2 · Software \+ Per-Patient Usage/i)).toBeInTheDocument();
    expect(screen.getByText("₹50,000")).toBeInTheDocument();
    expect(screen.getAllByText(/₹199/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/₹10,000/i).length).toBeGreaterThanOrEqual(2);

    // Dashboard components appear only once on the page (in Product Preview, not Hero)
    expect(screen.getAllByText(/AI Risk Assessment/i)).toHaveLength(1);
    expect(screen.getAllByText(/Patient Priority Queue/i)).toHaveLength(1);
  });

  it("allows interacting with the product preview queue and tabs on /", async () => {
    await renderAt("/");
    const selectP1038 = await screen.findByRole("button", { name: /Select P-1038/i });
    fireEvent.click(selectP1038);
    expect(screen.getByText(/Anita Sharma/i)).toBeInTheDocument();

    const alertTab = screen.getByRole("tab", { name: /Alert Feed/i });
    fireEvent.click(alertTab);
    expect(screen.getByText(/Simulated Priority Alerts/i)).toBeInTheDocument();
  });

  it("renders /platform, /how-it-works, and /about cleanly", async () => {
    await renderAt("/platform");
    expect(
      await screen.findByRole("heading", {
        name: /A Continuous Prioritisation Layer for Emergency Care/i,
      }),
    ).toBeInTheDocument();

    await renderAt("/how-it-works");
    expect(
      await screen.findByRole("heading", {
        name: /How UrgentIQ Keeps Priority Responsive to New Information/i,
      }),
    ).toBeInTheDocument();

    await renderAt("/about");
    expect(
      await screen.findByRole("heading", {
        name: /Making Changing Patient Risk Visible Before It Is Missed/i,
      }),
    ).toBeInTheDocument();
  });

  it("redirects unauthenticated /dashboard access to /login", async () => {
    const { router } = await renderAt("/dashboard");
    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/login");
    });
    expect(await screen.findByRole("heading", { name: /Sign in/i })).toBeInTheDocument();
  });

  it("signs in via /login demo credentials and renders the original dashboard", async () => {
    const { router } = await renderAt("/login");
    const demoFillBtn = await screen.findByRole("button", {
      name: /Demo login \(prototype only/i,
    });
    fireEvent.click(demoFillBtn);
    fireEvent.click(screen.getByRole("button", { name: /Sign In to Dashboard/i }));

    await waitFor(
      () => {
        expect(router.state.location.pathname).toBe("/dashboard");
      },
      { timeout: 3000 },
    );
    expect(getState().user?.name).toBe("Dr. Harleen Kaur");
    expect(
      await screen.findByRole("heading", { name: /Emergency Department/i }),
    ).toBeInTheDocument();
  });

  it("preserves signIn helper and protects authenticated state cleanly", async () => {
    await act(async () => {
      await signIn(
        DEMO_CREDENTIALS.hospital,
        DEMO_CREDENTIALS.username,
        DEMO_CREDENTIALS.password,
      );
    });
    expect(getState().user?.hospital).toBe(DEMO_CREDENTIALS.hospital);
  });

  it("validates the /contact demo form, pre-lists a message, and opens Gmail with the template typed", async () => {
    await renderAt("/contact");
    const messageInput = (await screen.findByLabelText(/^Message/i)) as HTMLTextAreaElement;
    expect(messageInput.value).toMatch(/UrgentIQ dynamic triage/i);

    fireEvent.click(screen.getByRole("button", { name: /Pilot & Band Rental/i }));
    expect(messageInput.value).toMatch(/security deposit terms/i);

    fireEvent.click(screen.getByRole("button", { name: /^Send$/i }));
    expect(await screen.findByText(/Please enter your full name/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/^Name$/i), { target: { value: "Dr. Meera Nair" } });
    fireEvent.change(screen.getByLabelText(/Work Email/i), {
      target: { value: "meera@hospital.org" },
    });
    fireEvent.change(screen.getByLabelText(/Hospital \/ Organisation/i), {
      target: { value: "Metro General" },
    });
    fireEvent.change(screen.getByLabelText(/Designation/i), {
      target: { value: "ED Lead" },
    });
    fireEvent.change(messageInput, {
      target: { value: "Interested in exploring the triage queue workflow." },
    });

    fireEvent.click(screen.getByRole("button", { name: /^Send$/i }));
    expect(
      await screen.findByText(/Demo Request Opened in Gmail/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Dr\. Meera Nair/i)).toBeInTheDocument();
    const gmailLink = screen.getByRole("link", { name: /Open Gmail Again/i });
    expect(gmailLink.getAttribute("href")).toContain("https://mail.google.com/mail/");
    expect(gmailLink.getAttribute("href")).toContain("kavyaa037%40gmail.com");

    // Verify the raw email address and technical jargon are NOT rendered in visible text
    expect(screen.queryByText(/kavyaa037@gmail\.com/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/No Backend Connection/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/default mail app/i)).not.toBeInTheDocument();
  });
});
