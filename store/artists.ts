import { makeAutoObservable } from "mobx";

class Artists {
  data: SpotifyApi.ArtistObjectFull[] = [];

  options: SpotifyApi.ArtistObjectFull[] = [];

  id: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  saveId(artistId: string) {
    this.id = artistId;
  }

  async fetchArtists(searchValue: string): Promise<void> {
    await fetch(`/api/search/${searchValue}`)
      .then((response) => response.json())
      .then((json: SpotifyApi.ArtistSearchResponse) => {
        this.options = json.artists.items.map((item) => item);
      })
      .catch((err) => console.log("Search API call:", err)); // eslint-disable-line no-console
  }

  async fetchArtistById(artistId: string): Promise<void> {
    await fetch(`/api/artist/${artistId}`)
      .then((response) => response.json())
      .then((json: SpotifyApi.ArtistObjectFull) => {
        this.data = [json];
      })
      .catch((err) => console.log("Artist API call:", err)); // eslint-disable-line no-console
  }

  update(artist: SpotifyApi.ArtistObjectFull) {
    this.clear();
    this.data.push(artist);
  }

  clear() {
    this.data.length = 0;
  }
}

export default new Artists();
