import { makeAutoObservable } from "mobx";

class SimilarArtistsStore {
  data: SpotifyApi.ArtistsRelatedArtistsResponse[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchSimilarArtists(artistId: string): Promise<void> {
    await fetch(`/api/related-artists/${artistId}`)
      .then((response) => response.json())
      .then((json) => {
        this.data = [json];
      })
      .catch((err) => console.log("Related Artists API call:", err)); // eslint-disable-line no-console
  }
}

export default new SimilarArtistsStore();
