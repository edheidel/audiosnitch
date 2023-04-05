import {
  act,
  cleanup,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import { artistStore } from "../src/store/artistStore";
import Artist from "../src/pages/artist/[artistId]";

const artistIdMock = "6Ghvu1VvMGScGpOUJBAHNH";

describe("Artist Page", () => {
  beforeAll(() => {
    // Mock fetch implementation with resolved promise
    global.fetch = jest.fn().mockImplementation(async () => Promise.resolve({
      json: () => ({
        // Mocked artist data with non-empty image array
        name: "Deftones",
        images: [
          { url: "https://example.com/image1.jpg", width: 640 },
          { url: "https://example.com/image2.jpg", width: 320 },
          { url: "https://example.com/image3.jpg", width: 160 },
          { url: "https://example.com/image4.jpg", width: 64 },
        ],
        genres: ["metal"],
      }),
    }));
  });

  beforeEach(async () => {
    await act(async () => artistStore.fetchArtistData(artistIdMock));

    await act(async () => {
      render(<Artist />);
    });
  });

  afterEach(async () => {
    await act(async () => artistStore.clearAllData());

    cleanup();
  });

  it("should render Artist page for specified artist ID", () => {
    expect(screen.getByTestId("artist-container")).toBeInTheDocument();
  });

  it("should render artist photo when artist data is loaded", () => {
    const artistPhoto = screen.getByTestId("artist-photo");
    const imageElement = screen.getByAltText("Deftones");

    expect(artistPhoto).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
  });

  it("should use 160px image from the images array", () => {
    const imageElement = screen.getByAltText("Deftones");

    expect(imageElement).toHaveAttribute("src", "/_next/image?url=https%3A%2F%2Fexample.com%2Fimage3.jpg&w=384&q=75");
  });

  it("should render chips when artist data is loaded", async () => {
    const chip = screen.getByTestId("chip");

    expect(chip).toHaveTextContent("metal");
  });
});

describe("Fallback message for failed request", () => {
  beforeAll(() => {
    // Mock fetch implementation with rejected promise
    global.fetch = jest.fn().mockImplementation(async () => Promise.reject());
  });

  it("should fall-back in case of failed artist data fetch", async () => {
    await act(async () => artistStore.fetchArtistData("wrong artist ID"));

    render(<Artist />);

    const artistFallback = screen.getByTestId("artist-fallback");

    expect(artistFallback).toBeInTheDocument();
    expect(artistFallback).toHaveTextContent("Ooops, something went wrong");
  });
});

describe("Fallback message for artist with missing genres", () => {
  beforeAll(() => {
    // Mock fetch implementation with resolved promise
    global.fetch = jest.fn().mockImplementation(async () => Promise.resolve({
      json: () => ({
        name: "PASHA TEHNIK",
        images: [
          { url: "https://example.com/image4.jpg", width: 64 },
        ],
        genres: [],
      }),
    }));
  });

  it("should fall-back in case of missing genres", async () => {
    await act(async () => artistStore.fetchArtistData("underground artist ID"));

    render(<Artist />);

    const chipContainer = screen.getByTestId("chip-container");

    expect(chipContainer).toHaveTextContent("PASHA TEHNIK is too underground");
  });
});
