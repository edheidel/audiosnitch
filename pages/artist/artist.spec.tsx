import { render, screen } from "@testing-library/react";
import { action } from "mobx";

import Artist from "./[artistId]";
import { ChipContainer } from "../../src/components/common/chips/ChipContainer";
import { ArtistPhoto } from "../../src/components/artist/ArtistPhoto";

import { artistStore } from "../../src/store/artistStore";

// eslint-disable-next-line import/no-extraneous-dependencies
global.fetch = require("node-fetch");

// This mocks the fetch implementation in the node.js environment.
jest.mock("node-fetch", () => jest.fn().mockImplementation(() => Promise.resolve({
  json: () => ({
    // Mocked data, with a non-empty images array
    name: "Deftones",
    images: [
      { url: "https://example.com/image1.jpg" },
      { url: "https://example.com/image2.jpg" },
    ],
    genres: ["metal"],
  }),
})));

// This mocks the next/router functionality.
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
  withRouter: (component: any) => {
    const defaultProps = {
      ...component.defaultProps,
      router: { pathname: "/" },
    };
    return { ...component, defaultProps };
  },
}));

// This mocks the observer functionality, reducing unnecessary mobx related messaged in the output.
jest.mock("mobx-react-lite", () => ({
  observer: jest.fn((component) => component),
}));

describe("Artist Page", () => {
  beforeEach(() => {
    action(() => {
      artistStore.isArtistLoaded = true;
      artistStore.fetchArtistData("6Ghvu1VvMGScGpOUJBAHNH");
    })();
  });

  afterEach(() => {
    action(() => {
      artistStore.isArtistLoaded = false;
      artistStore.artist = null;
    })();
  });

  it("should render the Artist page for the specified artist ID", async () => {
    render(<Artist />);

    action(() => {
      expect(screen.getByTestId("artist-container")).toBeInTheDocument();
    })();
  });

  it("should render the artist photo when artist data is loaded", async () => {
    render(<ArtistPhoto />);

    action(() => {
      const artistPhoto = screen.getByTestId("artist-photo");
      expect(artistPhoto).toBeInTheDocument();
      expect(screen.getByAltText("Deftones")).toBeInTheDocument();
    })();
  });

  it("should render the chips when artist data is loaded", async () => {
    render(<ChipContainer />);

    action(() => {
      const chip = screen.getByTestId("chip-element");
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveTextContent("metal");
    })();
  });
});
