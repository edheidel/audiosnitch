import React from "react";
import { observer } from "mobx-react-lite";
import artist from "store/artist";
import { dragLeaveHandler, dragStartHandler } from "utils/dragAndDrop";
import drag from "store/drag";
import useIsMobile from "../utils/hooks/useIsMobile";
import DropOverlay from "./drag-and-drop/DropOverlay";
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
import DragArea from "./drag-and-drop/DragArea";

function Home(): JSX.Element {
  const isMobile: boolean = useIsMobile();
  const ref: React.RefObject<HTMLDivElement> = React.useRef<HTMLDivElement | null>(null);

  return (
    <div
      id="container"
      className={styles.container}
      onDragStart={(e) => dragStartHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragOver={(e) => dragStartHandler(e)}
    >
      <SearchContainer>
        <SearchBar breakRef={ref.current} isMobile={isMobile} />
      </SearchContainer>

      {!isMobile && !artist.isLoaded && <DragArea />}
      {!isMobile && drag.isActive && <DropOverlay breakRef={ref.current} />}

      <div id="scroll-breakpoint" ref={ref} />

      {artist.isLoaded && (
        <div id="results" className={styles.results}>
          <Photo />
          <ChipContainer>
            <ChipContainerTitle />
            <GenreChips />
          </ChipContainer>
          <SimilarArtistsContainer>
            <SimilarArtistsTitle />
            <SimilarArtistCards breakRef={ref.current} />
          </SimilarArtistsContainer>
          <ScrollToTopButton />
        </div>
      )}
    </div>
  );
}

export default observer(Home);
