import { screen, waitFor } from "@testing-library/react";

import { renderRoute } from "@/test/renderRoute";

describe("routes", () => {
  it("renders the home page with one h1 and a main landmark", async () => {
    renderRoute("/");
    expect(await screen.findByRole("heading", { level: 1 })).toHaveTextContent("design systems");
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("shows the not-found page for an unknown case study", async () => {
    renderRoute("/work/does-not-exist");
    expect(
      await screen.findByRole("heading", { level: 1, name: "Page not found" }),
    ).toBeInTheDocument();
  });

  it("redirects links from the previous site to their new case study", async () => {
    const { router } = renderRoute("/project/archer-website");
    await waitFor(() => expect(router.state.location.pathname).toBe("/work/archer-law"));
    expect(
      await screen.findByRole("heading", { level: 1, name: "Archer Law website" }),
    ).toBeInTheDocument();
  });

  it("marks the current section in the primary navigation", async () => {
    renderRoute("/work/quizzes");
    const [primary] = await screen.findAllByRole("navigation", { name: "Primary" });
    expect(primary?.querySelector('[aria-current="page"]')).toHaveTextContent("Work");
  });
});
