import {
  cleanup,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import { artistStore } from "../src/store/artistStore";
import Home from "../src/pages";

jest.mock("../src/store/artistStore", () => ({
  __esModule: true,
  artistStore: {
    clearAllData: jest.fn(),
  },
}));

describe("Home", () => {
  beforeEach(() => {
    render(<Home />);
  });

  afterEach(() => {
    cleanup();
  });

  it("should render the container element correctly", () => {
    const container = screen.getByTestId("home-container");

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("container");
  });

  it("should render the Title component correctly", () => {
    const title = screen.getByTestId("home-title");

    expect(title).toBeInTheDocument();
    expect(screen.getByText("Ready to discover more music?")).toBeInTheDocument();
  });

  it("should render the SearchAutocomplete component correctly", () => {
    const searchInput = screen.getByPlaceholderText("Type an artist name");

    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("type", "homepage");
  });

  it("should clear artist data and artist list on mount", async () => {
    await waitFor(async () => {
      expect(artistStore.clearAllData).toHaveBeenCalled();
    });
  });
});
