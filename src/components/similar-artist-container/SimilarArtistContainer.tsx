/* eslint-disable react/jsx-one-expression-per-line */
import type { FC } from "react";
import { observer } from "mobx-react-lite";

import { Skeleton } from "@mui/material";
import { artistStore } from "../../store/artistStore";
import { SimilarArtistList } from "./similar-artist-list/SimilarArtistList";

import styles from "./SimilarArtistContainer.module.scss";

export const SimilarArtistContainer: FC = observer(() => {
  const { artist, isArtistLoading, isSimilarArtistsLoaded } = artistStore;

  return artist.genres.length > 0 && isSimilarArtistsLoaded ? (
    <>
      {isArtistLoading && (
        <Skeleton
          sx={{
            fontSize: "2.5rem",
            marginTop: "0.5rem",
            marginBottom: "0.75rem",
          }}
        />
      )}
      {!isArtistLoading && (
        <h3>More artists like {artist.name}</h3>
      )}
      <div className={styles.container}>
        <SimilarArtistList
          displayArtistCount={15}
        />
      </div>
    </>
  ) : null;
});

SimilarArtistContainer.displayName = "SimilarArtistContainer";
