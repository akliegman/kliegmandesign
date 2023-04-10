import { render, waitFor } from "../../setupTests";
import { PageHelmet } from "./PageHelmet";

describe("PageHelmet", () => {
  it("renders with default props", () => {
    const { getByTitle, getByText } = render(<PageHelmet />);

    waitFor(() => {
      expect(getByTitle("Adam Kliegman")).toBeInTheDocument();
      expect(getByText("Adam Kliegman")).toBeInTheDocument();
      expect(
        getByText(
          "Adam Kliegman: NYC-based frontend developer and UX evangelist"
        )
      ).toBeInTheDocument();
      expect(
        getByText(
          "Adam Kliegman is an NYC-based frontend developer and UX evangelist. He is currently available for hire."
        )
      ).toBeInTheDocument();
    });
  });

  it("renders with provided title and description", () => {
    const title = "Test Title";
    const description = "Test Description";
    const { getByTitle, getByText } = render(
      <PageHelmet title={title} description={description} />
    );
    waitFor(() => {
      expect(getByTitle(`${title} | Adam Kliegman`)).toBeInTheDocument();
      expect(getByText(title)).toBeInTheDocument();
      expect(getByText(description)).toBeInTheDocument();
    });
  });

  it("renders with child elements", () => {
    const childText = "Child Element";
    const { getByText } = render(
      <PageHelmet>
        <title>{childText}</title>
      </PageHelmet>
    );
    waitFor(() => {
      expect(getByText(childText)).toBeInTheDocument();
    });
  });
});
