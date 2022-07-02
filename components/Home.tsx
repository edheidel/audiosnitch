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
import styles from "./Home.module.scss";

function Home(): JSX.Element {
  const isMobile: boolean = useIsMobile();
  const resultsRef: React.RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(null);
  const resultsDiv: HTMLDivElement | null = resultsRef.current;

  return (
    <>
      <div className={styles.container} id="container">
        <SearchContainer>
          <SearchBar resultsDiv={resultsDiv} />
        </SearchContainer>
        {!isMobile && <DropArea resultsDiv={resultsDiv} />}
        <div className={styles.results} id="search-results" ref={resultsRef}>
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
      <ScrollToTopButton resultsDiv={resultsDiv} />
    </>
  );
}

export default observer(Home);
