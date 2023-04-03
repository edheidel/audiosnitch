import {
  act,
  cleanup,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import { artistStore } from "../src/store/artistStore";
import Artist from "../src/pages/artist/[artistId]";

// This mocks the fetch implementation.
global.fetch = jest.fn().mockImplementation(async () => Promise.resolve({
  json: () => ({
    // Mocked data, with a non-empty images array
    name: "Deftones",
    images: [
      { url: "https://example.com/image1.jpg" },
      { url: "https://example.com/image2.jpg" },
    ],
    genres: ["metal"],
  }),
}));

const artistIdMock = "6Ghvu1VvMGScGpOUJBAHNH";

describe("Artist Page", () => {
  beforeEach(async () => {
    await act(async () => artistStore.fetchArtistData(artistIdMock));
    render(<Artist />);
  });

  afterEach(async () => {
    await act(async () => artistStore.clearAllData());
    cleanup();
  });

  it("should render the Artist page for the specified artist ID", () => {
    expect(screen.getByTestId("artist-container")).toBeInTheDocument();
  });

  it("should render the artist photo when artist data is loaded", () => {
    const artistPhoto = screen.getByTestId("artist-photo");

    expect(artistPhoto).toBeInTheDocument();
    expect(screen.getByAltText("Deftones")).toBeInTheDocument();
  });

  it("should render the chips when artist data is loaded", async () => {
    const chip = screen.getByTestId("chip-element");

    expect(chip).toBeInTheDocument();
    expect(chip).toHaveTextContent("metal");
  });
});
