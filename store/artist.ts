import { makeAutoObservable } from "mobx";

class ArtistStore {
  id: string = "";

  data: SpotifyApi.ArtistObjectFull[] = [];

  isLoading: boolean = false;

  isLoaded: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  saveId(artistId: string) {
    this.id = artistId;
  }

  clear() {
    this.data.length = 0;
  }

  update(artist: SpotifyApi.ArtistObjectFull) {
    this.clear();
    this.data.push(artist);
    this.isLoaded = true;
  }

  async fetchArtistById(artistId: string): Promise<void> {
    this.isLoading = true;
    await fetch(`/api/artist/${artistId}`)
      .then((response) => response.json())
      .then((json: SpotifyApi.ArtistObjectFull) => {
        this.update(json);
      })
      .catch((err) => console.log("Artist API call:", err)); // eslint-disable-line no-console
    this.isLoading = false;
    this.isLoaded = true;
  }
}

export default new ArtistStore();
