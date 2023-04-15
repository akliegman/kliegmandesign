// @ts-nocheck
import { render, waitFor } from "../../setupTests";
import { PageHelmet } from "./PageHelmet";

describe("PageHelmet", () => {
  it("renders with default props", async () => {
    render(<PageHelmet />);

    await waitFor(() => {
      const title = document.title;
      expect(title).toBe(
        "Adam Kliegman: NYC-based frontend developer and UX evangelist"
      );
    });
  });

  it("renders with provided title", async () => {
    const testData = "Test Title";
    render(<PageHelmet title={testData} />);

    await waitFor(() => {
      const title = document.title;
      expect(title).toBe(`${testData} | Adam Kliegman`);
    });
  });

  it("renders with child elements", async () => {
    const childText = "Child Element";
    render(
      <PageHelmet>
        <title>{childText}</title>
      </PageHelmet>
    );
    await waitFor(() => {
      const title = document.title;
      expect(title).toBe(childText);
    });
  });
});
