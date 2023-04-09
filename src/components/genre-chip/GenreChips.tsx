import type { FC } from "react";
import { observer } from "mobx-react-lite";

import { Skeleton } from "@mui/material";
import { artistStore } from "../../store/artistStore";
import { GenreChip } from "./GenreChip";

export const GenreChips: FC = observer(() => {
  const {
    genreUrls,
    isValidatingGenres,
  } = artistStore;

  return (
    <>
      {(isValidatingGenres) && (
        <Skeleton
          sx={{
            fontSize: "2.4rem",
          }}
        />
      )}

      {(!isValidatingGenres) && (
        <>
          {Object.values(genreUrls).map((genre) => (
            <GenreChip
              key={genre.genreName}
              genre={genre.genreName}
            />
          ))}
        </>
      )}
    </>
  );
});

GenreChips.displayName = "GenreChips";
