import { makeAutoObservable } from "mobx";

class Artists {
  data: any = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchArtists(searchValue: string) {
    await fetch(`/api/artists/${searchValue}`)
      .then((response) => response.json())
      .then((json: SpotifyApi.ArtistSearchResponse) => {
        this.data = [...json.artists.items.map((item) => item)];
      })
      .catch((err) => console.log("Artist API call:", err)); // eslint-disable-line no-console
  }

  clear() {
    this.data.length = 0;
  }
}

export default new Artists();
