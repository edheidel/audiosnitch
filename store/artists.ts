import { makeAutoObservable } from "mobx";

class Artists {
  data: any = [];

  constructor() {
    makeAutoObservable(this);
  }

  async search(searchValue: string) {
    this.data = await fetch(`/api/artists/${searchValue}`)
      .then((response) => response.json())
      .then((response: SpotifyApi.ArtistSearchResponse) => response.artists.items.map((item) => item))
      .catch((err) => console.log("Artist API call:", err)); // eslint-disable-line no-console
  }
}

export default new Artists();
