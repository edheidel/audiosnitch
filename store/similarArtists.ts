import { makeAutoObservable } from "mobx";
import artist from "./artist";

class SimilarArtistsStore {
  data: SpotifyApi.ArtistsRelatedArtistsResponse[] = [];

  isLoadingSimilarArtists = true;

  constructor() {
    makeAutoObservable(this);
  }

  clearSimilarArtists() {
    this.data.length = 0;
  }

  updateSimilarArtists(artists: SpotifyApi.ArtistsRelatedArtistsResponse) {
    this.clearSimilarArtists();
    this.data.push(artists);
  }

  async fetchSimilarArtists(spotifyArtistId: string = artist.artistData.id): Promise<void> {
    this.isLoadingSimilarArtists = true;

    await fetch(`/api/related-artists/${spotifyArtistId}`)
      .then((response) => response.json())
      .then((json) => {
        this.updateSimilarArtists(json);
      })
      .catch((err) => console.log("Related Artists API call:", err)); // eslint-disable-line

    this.isLoadingSimilarArtists = false;
  }
}

export default new SimilarArtistsStore();
