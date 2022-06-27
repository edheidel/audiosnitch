import { makeAutoObservable } from "mobx";

class SimilarArtistsStore {
  data: SpotifyApi.ArtistsRelatedArtistsResponse[] = [];

  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchSimilarArtists(artistId: string): Promise<void> {
    this.isLoading = true;
    await fetch(`/api/related-artists/${artistId}`)
      .then((response) => response.json())
      .then((json) => {
        this.data = [json];
      })
      .catch((err) => console.log("Related Artists API call:", err)); // eslint-disable-line no-console
    this.isLoading = false;
  }

  clear() {
    this.data.length = 0;
  }
}

export default new SimilarArtistsStore();
