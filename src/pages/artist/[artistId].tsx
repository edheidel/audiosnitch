import type { FC } from "react";
import { observer } from "mobx-react-lite";

import { artistStore } from "../../store/artistStore";

import { ArtistPhoto } from "../../components/artist-photo/ArtistPhoto";
import { ChipContainer } from "../../components/chips/ChipContainer";
import { SimilarArtistsContainer } from "../../components/similar-artists/SimilarArtistsContainer";

/**
 * A page with the information about the artist.
 * Name format of this files allows Next.js dynamically update the URL, based on the selected artist's ID.
 */
const Artist: FC = observer(() => {
  const { artistExists } = artistStore;

  // Make sure that the store contains any artist data before rendering the container.
  return artistExists ? (
    <div data-testid="artist-container">
      <ArtistPhoto />
      <ChipContainer />
      <SimilarArtistsContainer />
    </div>
  ) : null;
});

export default Artist;
