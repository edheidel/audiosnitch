import { makeAutoObservable, runInAction } from "mobx";
import { checkURL } from "../utils/checkUrl";
import { genreExceptions } from "../utils/genreExceptions";

export interface GenreInfo {
  genreName: string
  wikiUrl: string;
  isValidUrl: boolean;
}

class ArtistStore {
  // Data objects

  list: SpotifyApi.ArtistObjectFull[] = [];

  artist: SpotifyApi.ArtistObjectFull = {
    external_urls: {
      spotify: "",
    },
    followers: {
      href: null,
      total: 0,
    },
    genres: [],
    href: "",
    id: "",
    images: [],
    name: "",
    popularity: 0,
    type: "artist",
    uri: "",
  };

  genreUrls: { [genre: string]: GenreInfo } = {};

  similarArtists: SpotifyApi.ArtistObjectFull[] = [];

  // Data loading status flags

  isListLoading = false;

  isArtistLoading = false;

  isArtistLoadingFailed = false;

  isSimilarArtistsLoading = false;

  isSimilarArtistsLoaded = false;

  isValidatingGenres = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Spotify API requests

  /**
   * Provides a list of artists later used as options in the search drop-down menu.
   * @param searchValue - A string containing a partial or full artist name for the Spotify API call.
   * @returns A promise which resolves once the list of 7 artists has been retrieved and updated.
   */
  fetchArtistList = async (searchValue: string): Promise<void> => {
    if (!searchValue) {
      return;
    }

    this.isListLoading = true;

    try {
      const response = await fetch(`/api/search/${searchValue}`);
      const json = await response.json();
      runInAction(() => {
        // Store the API response in the list object
        this.list = json?.artists?.items ?? [];
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("🔥 Failed to fetch artist list:", error);
    } finally {
      runInAction(() => {
        this.isListLoading = false;
      });
    }
  };

  /**
   * Provides the detailed information about the selected artist.
   * @param spotifyArtistId - A string with unique artist ID used for the Spotify API call.
   * @returns A promise which resolves once the artist has been retrieved and updated.
   */
  fetchArtistData = async (spotifyArtistId: string) => {
    this.isArtistLoading = true;
    this.isArtistLoadingFailed = false;
    this.isValidatingGenres = true;

    try {
      const response = await fetch(`/api/artist/${spotifyArtistId}`);
      const json = await response.json();
      runInAction(() => {
        // Store the API response in the artist object
        this.artist = json;

        // Handle genreUrls for the fetched artist
        this.genreUrls = {};
        const genrePromises = this.artist.genres.map(async (genre) => {
          const genreInfo = await ArtistStore.validateGenreUrl(genre);
          this.genreUrls[genre] = genreInfo;

          return genreInfo;
        });

        // Wait for all genre validations to finish
        Promise.all(genrePromises).then((genres) => {
        // Sort genres by placing those with valid Wikipedia URLs first and those without valid URLs last
          const sortedGenres = genres.sort((a, b) => Number(b.isValidUrl) - Number(a.isValidUrl));
          runInAction(() => {
            // Update the genreUrls object with the sorted genres
            this.genreUrls = sortedGenres.reduce<{ [genre: string]: GenreInfo }>((acc, genre) => {
              acc[genre.genreName] = genre;

              return acc;
            }, {});

            this.isValidatingGenres = false;
          });
        });
      });
    } catch (error) {
      runInAction(() => {
        // Failure flag in case of error to control UI fall-backs
        this.isArtistLoadingFailed = true;
      });
    } finally {
      runInAction(() => {
        this.isArtistLoading = false;
      });
    }
  };

  /**
   * Provides the list of similar artists from the Spotify API, using the ID of the currently selected artist.
   * @returns A promise which resolves once the list of similar artists has been retrieved and updated.
   */
  fetchSimilarArtists = async (spotifyArtistId: string) => {
    this.isSimilarArtistsLoading = true;

    try {
      const response = await fetch(`/api/related-artists/${spotifyArtistId}`);
      const json = await response.json();
      runInAction(() => {
        // The API response is expected to contain an "artists" array with a list of similar artists.
        this.similarArtists = json?.artists ?? [];
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("🔥 Failed to fetch similar artists:", error);
    } finally {
      runInAction(() => {
        this.isSimilarArtistsLoading = false;
        this.isSimilarArtistsLoaded = true;
      });
    }
  };

  // Validate genres by adding working URLs with wiki articles
  static validateGenreUrl = async (genre: string): Promise<GenreInfo> => {
    const genreName = genre;
    const wikiUrl = genreExceptions[genre]?.wikiUrl || `https://en.wikipedia.org/wiki/${genre}`;
    const isValidUrl = await checkURL(genre);

    return { genreName, wikiUrl, isValidUrl };
  };

  // Data update and clean-up methods

  /**
   * Takes new artist data as an argument and updates the existing artist object together with state flags.
   * @param newArtistData - An object in the Spotify API artist format.
   */
  updateArtistData = (newArtistData: SpotifyApi.ArtistObjectFull) => {
    runInAction(() => {
      this.isArtistLoading = true;
      this.artist = newArtistData;
      this.isArtistLoading = false;
    });
  };

  // Takes no arguments and resets the list object in the artist store
  clearArtistList = () => {
    runInAction(() => {
      this.list = [];
    });
  };

  // Takes no arguments and resets the list object in the artist store
  clearArtistData = () => {
    runInAction(() => {
      this.artist = {
        external_urls: {
          spotify: "",
        },
        followers: {
          href: null,
          total: 0,
        },
        genres: [],
        href: "",
        id: "",
        images: [],
        name: "",
        popularity: 0,
        type: "artist",
        uri: "",
      };
    });
  };

  // Takes no arguments and resets the similar artists object in the artist store
  clearSimilarArtists = () => {
    runInAction(() => {
      this.similarArtists = [];
    });
  };

  // A single funtion for reseting all data objects in the artist store
  clearAllData = () => {
    runInAction(() => {
      this.clearArtistList();
      this.clearArtistData();
      this.clearSimilarArtists();
    });
  };

  /**
   * A flag that could be used for the component conditional rendering which rely on the artist data availability.
   * @returns A boolean which specifies the availability of the artist data in the store.
   */
  get artistExists(): boolean {
    return !!this.artist && this.artist.name.length > 0;
  }

  /**
   * A flag that could be used for managing UI fall-backs in case of unsuccessful artist fetch.
   * @returns A boolean which specifies whether artist data fetch was successful or not.
   */
  get artistFetchFailed(): boolean {
    return this.isArtistLoadingFailed;
  }
}

export const artistStore = new ArtistStore();
