import { makeAutoObservable } from "mobx";

class ArtistList {
  options: SpotifyApi.ArtistObjectFull[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchArtists(searchValue: string): Promise<void> {
    await fetch(`/api/search/${searchValue}`)
      .then((response) => response.json())
      .then((json: SpotifyApi.ArtistSearchResponse) => {
        this.options = json.artists.items.map((item) => item);
      })
      .catch((err) => console.log("Search API call:", err)); // eslint-disable-line no-console
  }
}

export default new ArtistList();
