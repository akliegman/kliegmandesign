import { createBrowserRouter, redirect } from "react-router";

import { RootLayout } from "@/components/RootLayout";
import { AboutPage } from "@/pages/AboutPage";
import { AiPage } from "@/pages/AiPage";
import { CaseStudyPage } from "@/pages/CaseStudyPage";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ResumePage } from "@/pages/ResumePage";
import { RouteErrorPage } from "@/pages/RouteErrorPage";
import { WorkIndexPage } from "@/pages/WorkIndexPage";

/** Project slugs from the previous version of the site that changed, so old links still land. */
const renamedProjects: Record<string, string> = { "archer-website": "archer-law" };

/** The legal pages are long and rarely visited, so their copy loads with the route. */
async function legalRoute(name: "termsOfUse" | "privacyPolicy") {
  const [{ LegalPage }, legal] = await Promise.all([
    import("@/pages/LegalPage"),
    import("@/content/legal"),
  ]);
  const document = legal[name];
  return { Component: () => <LegalPage document={document} /> };
}

export const routes = [
  {
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    // Shown only while a lazily loaded route (/system, the legal pages) loads on first visit.
    hydrateFallbackElement: <div className="min-h-dvh" />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "work", element: <WorkIndexPage /> },
      { path: "work/:slug", element: <CaseStudyPage /> },
      {
        path: "system",
        // /system carries the token parser and a copy of the theme source, so it loads on demand.
        lazy: async () => ({ Component: (await import("@/pages/SystemPage")).SystemPage }),
      },
      { path: "ai", element: <AiPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "resume", element: <ResumePage /> },
      { path: "terms-of-use", lazy: () => legalRoute("termsOfUse") },
      { path: "privacy-policy", lazy: () => legalRoute("privacyPolicy") },
      { path: "projects", loader: () => redirect("/work") },
      {
        path: "project/:slug",
        loader: ({ params }: { params: { slug?: string } }) => {
          const slug = params.slug ?? "";
          return redirect(`/work/${renamedProjects[slug] ?? slug}`);
        },
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];

export function createRouter() {
  return createBrowserRouter(routes);
}
