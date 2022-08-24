import { makeAutoObservable } from "mobx";

class ArtistStore {
  artistList: SpotifyApi.ArtistObjectFull[] = [];

  isLoadingList = false;

  artistData: SpotifyApi.ArtistObjectFull = {
    followers: { href: null, total: 0 },
    genres: [],
    images: [],
    popularity: 0,
    name: "",
    id: "",
    type: "artist",
    href: "",
    external_urls: { spotify: "" },
    uri: "",
  };

  isLoadingArtist = false;

  isLoadedArtist = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchArtistList = async (searchValue: string | string[]) => {
    this.isLoadingList = true;

    await fetch(`/api/search/${searchValue}`)
      .then((response) => response.json())
      .then((json: SpotifyApi.ArtistSearchResponse) => {
        this.artistList = json.artists.items.map((item) => item);
      })
      .catch((err) => console.log("Search API call:", err)); // eslint-disable-line no-console

    this.isLoadingList = false;
  };

  fetchArtistData = async (spotifyArtistId: string | string[]) => {
    this.isLoadingArtist = true;

    await fetch(`/api/artist/${spotifyArtistId}`)
      .then((response) => response.json())
      .then((json: SpotifyApi.ArtistObjectFull) => {
        this.artistData = json;
      })
      .catch((err) => console.log("Artist API call:", err)); // eslint-disable-line no-console

    this.isLoadingArtist = false;
    this.isLoadedArtist = true;
  };

  clearArtistList = () => {
    this.artistList.length = 0;
  };

  clearArtistData = () => {
    this.artistData = {
      followers: { href: null, total: 0 },
      genres: [],
      images: [],
      popularity: 0,
      name: "",
      id: "",
      type: "artist",
      href: "",
      external_urls: { spotify: "" },
      uri: "",
    };
    this.isLoadedArtist = false;
  };

  updateArtistData = (newArtistData: SpotifyApi.ArtistObjectFull) => {
    this.isLoadingArtist = true;
    this.artistData = newArtistData;
    this.isLoadingArtist = false;
  };
}

export default new ArtistStore();
