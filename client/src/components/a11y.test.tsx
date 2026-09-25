import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { axe } from "vitest-axe";

import { ConsentNotice } from "@/components/ConsentNotice";
import { SiteHeader } from "@/components/SiteHeader";
import { WorkCard } from "@/components/WorkCard";
import { findWork } from "@/content/work";

function inRouter(element: React.ReactNode) {
  const router = createMemoryRouter([{ path: "*", element }]);
  return render(<RouterProvider router={router} />);
}

describe("accessibility", () => {
  it("the header has no axe violations", async () => {
    const { container } = inRouter(<SiteHeader />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("a work card has no axe violations and one link", async () => {
    const item = findWork("quizzes");
    if (!item) throw new Error("fixture missing");
    const { container } = inRouter(<WorkCard item={item} />);
    expect(await axe(container)).toHaveNoViolations();
    expect(container.querySelectorAll("a, button")).toHaveLength(1);
  });

  it("the consent notice has no axe violations in each state", async () => {
    for (const [consent, optedOutByBrowser] of [
      ["unset", false],
      ["granted", false],
      ["denied", true],
    ] as const) {
      const { container, unmount } = inRouter(
        <ConsentNotice
          consent={consent}
          optedOutByBrowser={optedOutByBrowser}
          onChoose={() => {}}
          onClose={() => {}}
        />,
      );
      expect(await axe(container)).toHaveNoViolations();
      unmount();
    }
  });
});
