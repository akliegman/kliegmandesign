import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { WorkFigure } from "@/components/WorkFigure";
import { screenshot } from "@/content/media";

const figure = {
  media: screenshot("demyst-platform-billing", "A billing report with a spend chart and a table"),
  caption: "The billing report.",
};

describe("WorkFigure", () => {
  it("opens the screenshot at full size and returns focus when closed", async () => {
    render(<WorkFigure figure={figure} />);
    const trigger = screen.getByRole("button", { name: /view full size/i });

    await userEvent.click(trigger);
    expect(screen.getByRole("dialog", { name: "The billing report." })).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
