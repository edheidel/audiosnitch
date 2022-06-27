import { makeAutoObservable } from "mobx";

class ArtistStore {
  id: string = "";

  data: SpotifyApi.ArtistObjectFull[] = [];

  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  saveId(artistId: string) {
    this.id = artistId;
  }

  async fetchArtistById(artistId: string): Promise<void> {
    this.isLoading = true;
    await fetch(`/api/artist/${artistId}`)
      .then((response) => response.json())
      .then((json: SpotifyApi.ArtistObjectFull) => {
        this.data = [json];
      })
      .catch((err) => console.log("Artist API call:", err)); // eslint-disable-line no-console
    this.isLoading = false;
  }

  clear() {
    this.data.length = 0;
  }

  update(artist: SpotifyApi.ArtistObjectFull) {
    this.clear();
    this.data.push(artist);
  }
}

export default new ArtistStore();
