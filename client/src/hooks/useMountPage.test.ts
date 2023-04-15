// @ts-nocheck
import { render } from "../setupTests";
import { useLoading } from "../context/LoadingContext";
import { useMountPage } from "./useMountPage";

jest.mock("../context/LoadingContext", () => ({
  useLoading: jest.fn(),
}));

describe("useMountPage", () => {
  let setPageLoading;
  beforeEach(() => {
    setPageLoading = jest.fn();
    useLoading.mockReturnValue({
      setPageLoading,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should set page loading to false on mount", () => {
    const TestComponent = () => {
      useMountPage();
      return null;
    };

    render(<TestComponent />);

    expect(setPageLoading).toHaveBeenCalledWith(false);
  });
});
