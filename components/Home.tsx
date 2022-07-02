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
import ScrollToTopButton from "./scroll-button/ScrollToTopButton";
import styles from "./Home.module.scss";

function Home(): JSX.Element {
  const isMobile: boolean = useIsMobile();
  const resultsRef: React.RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <div className={styles.container} id="container">
        <SearchContainer>
          <SearchBar resultsDiv={resultsRef.current} />
        </SearchContainer>
        {!isMobile && <DropArea resultsDiv={resultsRef.current} />}
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
      <ScrollToTopButton />
    </>
  );
}

export default observer(Home);
