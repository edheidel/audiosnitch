import type { FC } from "react";
import { Chip } from "@mui/material";
import { artistStore } from "../../store/artistStore";

interface GenreChip {
    genre: string,
}

export const GenreChip: FC<GenreChip> = ({ genre }) => {
  // Get additional details about the genre
  const { wikiUrl, isValidUrl } = artistStore.genreUrls[genre];

  // Open wikipedia article about the genre with valid url
  const handleClick = (): void => {
    if (isValidUrl) {
      window.open(wikiUrl, "_blank");
    }
  };

  return (
    <Chip
      data-testid="chip"
      key={genre}
      label={genre}
      color="info"
      component="a"
      clickable={isValidUrl}
      onClick={() => handleClick()}
      sx={isValidUrl
        ? {
          background: "#1db954",
          margin: 0.8,
          cursor: "pointer",
        }
        : {
          background: "none",
          border: "1px solid white",
          margin: 0.8,
          cursor: "default",
        }}
    />
  );
};

GenreChip.displayName = "GenreChip";
