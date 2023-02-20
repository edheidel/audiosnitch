import type { FC } from "react";
import { observer } from "mobx-react-lite";

import { artistStore } from "../../src/store/artistStore";

import { ArtistPhoto } from "../../src/components/artist/ArtistPhoto";
import { ChipContainer } from "../../src/components/common/chips/ChipContainer";
import { SimilarArtistsContainer } from "../../src/components/similar-artists/SimilarArtistsContainer";

/**
 * A page with the information about the artist.
 * The file name format allows Next.js dynamically update the URL, based on the selected artist's ID.
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
