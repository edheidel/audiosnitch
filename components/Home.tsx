import React from "react";
import { observer } from "mobx-react-lite";
import artist from "store/artist";
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
import Photo from "./about-artist/Photo";

function Home(): JSX.Element {
  const isMobile: boolean = useIsMobile();
  const ref: React.RefObject<HTMLDivElement> = React.useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div className={styles.container} id="container">
        <SearchContainer>
          <SearchBar breakRef={ref.current} isMobile={isMobile} />
        </SearchContainer>
        {!isMobile && <DropArea breakRef={ref.current} />}
        <div id="scroll-breakpoint" ref={ref} />
        {artist.isLoaded && (
          <div className={styles.results} id="search-results">
            <Photo />
            <ChipContainer>
              <ChipContainerTitle />
              <GenreChips />
            </ChipContainer>
            <SimilarArtistsContainer>
              <SimilarArtistsTitle />
              <SimilarArtistCards breakRef={ref.current} />
            </SimilarArtistsContainer>
          </div>
        )}
      </div>
      <ScrollToTopButton />
    </>
  );
}

export default observer(Home);
