import { makeAutoObservable } from "mobx";

class ArtistList {
  options: SpotifyApi.ArtistObjectFull[] = [];

  isLoading: boolean = false;

  isLoaded: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchArtists(searchValue: string): Promise<void> {
    this.isLoading = true;
    await fetch(`/api/search/${searchValue}`)
      .then((response) => response.json())
      .then((json: SpotifyApi.ArtistSearchResponse) => {
        this.options = json.artists.items.map((item) => item);
      })
      .catch((err) => console.log("Search API call:", err)); // eslint-disable-line no-console
    this.isLoading = false;
    this.isLoaded = true;
  }

  clear() {
    this.options.length = 0;
  }
}

export default new ArtistList();
