/* eslint-disable react/jsx-one-expression-per-line */
import type { FC } from "react";
import { observer } from "mobx-react-lite";

import { Skeleton } from "@mui/material";
import { artistStore } from "../../../store/artistStore";
import { GenreChips } from "../GenreChips";

import styles from "./ChipContainer.module.scss";
import { toGenitiveCase } from "../../../utils/toGenitiveCase";

export const ChipContainer: FC = observer(() => {
  const { artist, isArtistLoading } = artistStore;

  const artistName = artist.name;
  const hasGenres = !!artist.genres.length;

  return (
    <div
      className={styles.container}
      data-testid="chip-container"
    >
      {hasGenres && (
        <>
          {isArtistLoading && (
            <Skeleton
              sx={{ fontSize: "2.5rem" }}
            />
          )}
          {!isArtistLoading && (
            <h2>{toGenitiveCase(artistName)} style is</h2>
          )}
          <GenreChips />
        </>
      )}
      {!hasGenres && (
        <>
          <h2>{artistName} is too underground 🥲</h2>
          <h4>Try searching for other artists</h4>
        </>
      )}
    </div>
  );
});

ChipContainer.displayName = "ChipContainer";
