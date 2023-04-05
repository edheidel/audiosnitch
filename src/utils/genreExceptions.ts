interface GenreExceptions {
    [key: string]: {
        wikiUrl: string,
        isValidUrl: boolean,
    }
}

export const genreExceptions: GenreExceptions = {
  abstract: {
    wikiUrl: "https://en.wikipedia.org/wiki/Abstract_music",
    isValidUrl: true,
  },
  ambient: {
    wikiUrl: "https://en.wikipedia.org/wiki/Ambient_music",
    isValidUrl: true,
  },
  drone: {
    wikiUrl: "https://en.wikipedia.org/wiki/Drone_music",
    isValidUrl: true,
  },
  experimental: {
    wikiUrl: "https://en.wikipedia.org/wiki/Experimental_music",
    isValidUrl: true,
  },
  industrial: {
    wikiUrl: "https://en.wikipedia.org/wiki/Industrial_music",
    isValidUrl: true,
  },
  metal: {
    wikiUrl: "https://en.wikipedia.org/wiki/Heavy_metal_music",
    isValidUrl: true,
  },
  rock: {
    wikiUrl: "https://en.wikipedia.org/wiki/Rock_music",
    isValidUrl: true,
  },
  "escape room": {
    wikiUrl: "",
    isValidUrl: false,
  },
};
