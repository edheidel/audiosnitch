import type { FC } from "react";
import { observer } from "mobx-react-lite";

import { artistStore } from "../../store/artistStore";

import { ArtistPhoto } from "../../components/artist-photo/ArtistPhoto";
import { ChipContainer } from "../../components/genre-chip/chip-container/ChipContainer";
import { SimilarArtistContainer } from "../../components/similar-artist-container/SimilarArtistContainer";

/**
 * A page with the information about the artist.
 * Name format of this file allows Next.js dynamically update the URL, based on the selected artist's ID.
 */
const Artist: FC = observer(() => {
  const { artistExists, artistFetchFailed } = artistStore;

  // Fall-back in case of failed artist data fetch
  if (artistFetchFailed) {
    return (
      <div
        data-testid="artist-fallback"
        style={{
          marginTop: "4rem",
        }}
      >
        <h2>Ooops, something went wrong 😵</h2>
        <h4>Try again or search for other artist</h4>
      </div>
    );
  }

  // Make sure that the store contains any artist data before rendering the container
  return artistExists ? (
    <div
      data-testid="artist-container"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <ArtistPhoto />
      <ChipContainer />
      <SimilarArtistContainer />
    </div>
  ) : null;
});

export default Artist;
