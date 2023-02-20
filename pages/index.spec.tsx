import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import { artistStore } from "../src/store/artistStore";

import Home from ".";

jest.mock("../src/store/artistStore", () => ({
  __esModule: true,
  artistStore: {
    clearAllData: jest.fn(),
  },
}));

describe("Home", () => {
  it("should render the container element correctly", () => {
    render(<Home />);
    const container = screen.getByTestId("home-container");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("container");
  });

  it("should render the Title component correctly", () => {
    render(<Home />);
    const title = screen.getByTestId("home-title");
    expect(title).toBeInTheDocument();
    expect(screen.getByText("Searching for music style?")).toBeInTheDocument();
  });

  it("should render the SearchAutocomplete component correctly", () => {
    render(<Home />);
    const searchInput = screen.getByPlaceholderText("Type an artist name");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("type", "primary");
  });

  it("should clear artist data and artist list on mount", async () => {
    render(<Home />);

    await waitFor(() => {
      expect(artistStore.clearAllData).toHaveBeenCalled();
    });
  });
});
