import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Search from "./UI/Search";
import SearchButton from "./UI/SearchButton";

const ARTISTS_ENDPOINT = "/api/artists";

export default function Home(): JSX.Element {
  const [artistData, setArtistData] =
    useState<SpotifyApi.ArtistSearchResponse | undefined >();
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [artistList, setArtistList] = useState<string[]>([]);

  async function callArtistsAPI(value: string | null): Promise<void> {
    console.log(`--Calling artists API--`);
    try {
      await fetch(`${ARTISTS_ENDPOINT}/${value}`)
        .then((artists) => artists.json())
        .then((data) => setArtistData(data))
        .finally(() => {
          setArtistList(artistData!.artists.items.map((item) => item.name));
          console.log(`--Setting artist list--`);
        });
    } catch (e) {
      console.log(`--Failed to call Artists API: ${e}`);
    }
  }

  useEffect(() => {
    callArtistsAPI(searchValue);
    console.log(`--useEffect was triggered--`);
  }, [searchValue]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.container}>
      <div className={styles.container__content}>
        <h1>Which music style is this?</h1>
        <p>Start searching now.</p>
        <Search
          artistList={artistList}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <SearchButton artistData={artistData} searchValue={searchValue} />
      </div>
    </div>
  );
}
