import { makeAutoObservable } from "mobx";

class SimilarArtistsStore {
  data: SpotifyApi.ArtistsRelatedArtistsResponse[] = [];

  isLoading: boolean = true;

  isLoaded: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  clear() {
    this.data.length = 0;
  }

  update(artists: SpotifyApi.ArtistsRelatedArtistsResponse) {
    this.clear();
    this.data.push(artists);
  }

  async fetchSimilarArtists(artistId: string): Promise<void> {
    this.isLoading = true;
    await fetch(`/api/related-artists/${artistId}`)
      .then((response) => response.json())
      .then((json) => {
        this.update(json);
      })
      .catch((err) => console.log("Related Artists API call:", err)); // eslint-disable-line no-console
    this.isLoading = false;
    this.isLoaded = true;
  }
}

export default new SimilarArtistsStore();
