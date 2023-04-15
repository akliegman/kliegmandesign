// @ts-nocheck
import { screen, shallow } from "../../../../setupTests";
import { TextBlockItem } from "./TextBlockItem";

describe("TextBlockItem", () => {
  it("renders null if no item is passed", () => {
    shallow(<TextBlockItem />);

    const textBlockItem = screen.queryByTestId("text-block-item");

    expect(textBlockItem).not.toBeInTheDocument();
  });

  it("renders an h1 element if item type is heading-1", () => {
    const item = { type: "heading-1", content: "Example Heading" };
    shallow(<TextBlockItem item={item} />);
    const textBlockItem = screen.queryByTestId("text-block-item");
    expect(textBlockItem).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Example Heading"
    );
  });

  it("renders an h2 element if item type is heading-2", () => {
    const item = { type: "heading-2", content: "Example Heading" };
    shallow(<TextBlockItem item={item} />);
    const textBlockItem = screen.queryByTestId("text-block-item");
    expect(textBlockItem).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Example Heading"
    );
  });

  it("renders an h3 element if item type is heading-3", () => {
    const item = { type: "heading-3", content: "Example Heading" };
    shallow(<TextBlockItem item={item} />);
    const textBlockItem = screen.queryByTestId("text-block-item");
    expect(textBlockItem).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Example Heading"
    );
  });

  it("renders an h4 element if item type is heading-4", () => {
    const item = { type: "heading-4", content: "Example Heading" };
    shallow(<TextBlockItem item={item} />);
    const textBlockItem = screen.queryByTestId("text-block-item");
    expect(textBlockItem).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 4 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
      "Example Heading"
    );
  });

  it("renders a p element with TextBlockInnerText if item type is paragraph", () => {
    const item = {
      type: "paragraph",
      content: [{ type: "text", content: "Example paragraph text" }],
    };
    shallow(<TextBlockItem item={item} />);
    const textBlockItem = screen.queryByTestId("text-block-item");
    expect(textBlockItem).toBeInTheDocument();
    expect(screen.getByText("Example paragraph text")).toBeInTheDocument();
  });

  it("renders unordered-list correctly", () => {
    const data = [
      { type: "text", content: "Example list item 1" },
      { type: "text-strong", content: "Example list item 2 (strong)" },
      { type: "text-emphasis", content: "Example list item 3 (emphasis)" },
    ];
    shallow(
      <TextBlockItem
        item={{ type: "unordered-list", content: [{ content: data }] }}
      />
    );
    const textBlockItem = screen.queryByTestId("text-block-item");
    expect(textBlockItem).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getAllByRole("listitem")[0]).toHaveTextContent(
      "Example list item 1Example list item 2 (strong)Example list item 3 (emphasis)"
    );
  });
});
