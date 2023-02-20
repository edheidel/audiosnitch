import { makeAutoObservable, runInAction } from "mobx";

class ArtistStore {
    /* Data objects */
    list: SpotifyApi.ArtistObjectFull[] = [];

    artist: SpotifyApi.ArtistObjectFull | null = null;

    similarArtists: SpotifyApi.ArtistObjectFull[] = [];

    /* Data loading status flags */
    isListLoading = false;

    isArtistLoading = false;

    isArtistLoaded = false;

    isSimilarArtistsLoading = false;

    isSimilarArtistsLoaded = false;

    constructor() {
      makeAutoObservable(this);
    }

    /* Spotify API request methods */

    /**
    * Provides a list of artists later used as options in the search drop-down menu.
    * @param searchValue - A string containing a partial or full artist name for the Spotify API call.
    * @returns A promise that resolves once the list of 7 artists has been retrieved and updated.
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
          // The API response gets stored in the list object.
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
    * @param spotifyArtistId - A string with the unique artist ID used for the Spotify API call.
    * @returns A promise that resolves once the artist has been retrieved and updated.
    */
    fetchArtistData = async (spotifyArtistId: string) => {
      this.isArtistLoaded = false;
      this.isArtistLoading = true;

      try {
        const response = await fetch(`/api/artist/${spotifyArtistId}`);
        const json = await response.json();
        runInAction(() => {
          // The API response gets stored in the artist object.
          this.artist = json;
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("🔥 Failed to fetch artist data:", error);
      } finally {
        runInAction(() => {
          this.isArtistLoading = false;
          this.isArtistLoaded = true;
        });
      }
    };

    /**
    * Provides the list of similar artists from the Spotify API, using the ID of the currently selected artist.
    * @returns A promise that resolves once the list of 20 similar artists has been retrieved and updated.
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

    /* Data update and clean-up methods */

    /**
    * Take an new artist data an argument and updates the existing artist object, while updating state flags.
    * @param newArtistData - An object in the Spotify API artist format.
    */
    updateArtistData = (newArtistData: SpotifyApi.ArtistObjectFull) => {
      runInAction(() => {
        this.isArtistLoading = true;
        this.artist = newArtistData;
        this.isArtistLoading = false;
        this.isArtistLoaded = true;
      });
    };

    /**
    * Takes no arguments and resets the list object in the artist store.
    */
    clearArtistList = () => {
      runInAction(() => {
        this.list = [];
      });
    };

    /**
    * Takes no arguments and resets the list object in the artist store, while updating state flags.
    */
    clearArtistData = () => {
      runInAction(() => {
        this.artist = null;
      });
    }

    /**
    * Takes no arguments and resets the similar artists object in the artist store.
    */
    clearSimilarArtists = () => {
      runInAction(() => {
        this.similarArtists = [];
      });
    };

    /**
    * A single funtion for reseting all data objects in the artist store.
    */
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
    get artistExists() {
      return !!this.artist;
    }
}

export const artistStore = new ArtistStore();
