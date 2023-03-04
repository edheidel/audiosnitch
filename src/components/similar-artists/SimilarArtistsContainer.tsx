import type { FC } from "react";
import { observer } from "mobx-react-lite";

import { artistStore } from "../../store/artistStore";
import { Title } from "../common/title/Title";

import { SimilarArtists } from "./SimilarArtists";

import styles from "./SimilarArtistsContainer.module.scss";

/**
 * TO-DO: Provide a way to retry.
 * If there is an error fetching data, it might be helpful to provide a button or link for retry.
 */

export const SimilarArtistsContainer: FC = observer(() => {
  const { artist, isSimilarArtistsLoaded } = artistStore;

  return artist?.genres && artist.genres.length > 0 && isSimilarArtistsLoaded ? (
    <>
      <Title
        tag="h3"
        text={`More artists like ${artist.name || ""}`}
      />
      <div className={styles.container}>
        <SimilarArtists displayArtistCount={15} />
      </div>
    </>
  ) : null;
});

SimilarArtistsContainer.displayName = "SimilarArtistsContainer";
