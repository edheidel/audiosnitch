import React from "react";
import { observer } from "mobx-react-lite";
import useIsMobile from "../utils/hooks/useIsMobile";
import DropArea from "./drop/DropArea";
import SearchContainer from "./search/SearchContainer";
import SearchBar from "./search/SearchBar";
import ChipContainer from "./genre-chips/ChipContainer";
import ChipContainerTitle from "./genre-chips/ChipContainerTitle";
import GenreChips from "./genre-chips/GenreChips";
import SimilarArtistsTitle from "./similar-artists/SimilarArtistsTitle";
import SimilarArtistsContainer from "./similar-artists/SimilarArtistsContainer";
import SimilarArtistCards from "./similar-artists/SimilarArtistCards";
import ScrollToTopButton from "./scroll/ScrollToTopButton";
import NavSearchBar from "./navbar/NavSearchBar";
import styles from "./Home.module.scss";

function Home(): JSX.Element {
  const isMobile = useIsMobile();

  return (
    <>
      <NavSearchBar />
      <div className={styles.container}>
        <SearchContainer>
          <SearchBar />
        </SearchContainer>
        {!isMobile && <DropArea />} {/* Renders drag and drop component for the desktop version */}
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
      <ScrollToTopButton />
    </>
  );
}

export default observer(Home);
