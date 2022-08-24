import { makeAutoObservable } from "mobx";
import artist from "./artist";

class SimilarArtistsStore {
  data: SpotifyApi.ArtistsRelatedArtistsResponse[] = [];

  isLoadingSimilarArtists = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchSimilarArtists(spotifyArtistId: string | string[] = artist.artistData.id): Promise<void> {
    this.isLoadingSimilarArtists = true;
    this.clearSimilarArtists();

    await fetch(`/api/related-artists/${spotifyArtistId}`)
      .then((response) => response.json())
      .then((json) => {
        this.data.push(json);
      })
      .catch((err) => console.log("Related Artists API call:", err)); // eslint-disable-line

    this.isLoadingSimilarArtists = false;
  }

  clearSimilarArtists() {
    this.data.length = 0;
  }
}

export default new SimilarArtistsStore();
