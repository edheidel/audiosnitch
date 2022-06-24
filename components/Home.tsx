import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./Home.module.scss";
import DropArea from "./drop/DropArea";
import SearchContainer from "./search/SearchContainer";
import SearchBar from "./search/SearchBar";
import ChipContainer from "./genre-chips/ChipContainer";
import ChipContainerTitle from "./genre-chips/ChipContainerTitle";
import GenreChips from "./genre-chips/GenreChips";
import SimilarArtistsTitle from "./similar-artists/SimilarArtistsTitle";
import SimilarArtistsContainer from "./similar-artists/SimilarArtistsContainer";
import SimilarArtistCards from "./similar-artists/SimilarArtistCards";

function Home(): JSX.Element {
  return (
    <div className={styles.container}>
      <SearchContainer>
        <SearchBar />
      </SearchContainer>
      <DropArea />
      <div className={styles.results}>
        <ChipContainer>
          <ChipContainerTitle />
          <GenreChips />
        </ChipContainer>
        <SimilarArtistsContainer>
          <SimilarArtistsTitle />
          <SimilarArtistCards />
        </SimilarArtistsContainer>
      </div>
    </div>
  );
}

export default observer(Home);
