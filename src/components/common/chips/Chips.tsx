import { memo, type FC } from "react";
import { Chip } from "@mui/material";
import { observer } from "mobx-react-lite";

import { artistStore } from "../../../store/artistStore";

export const Chips: FC = memo(observer(() => {
  const { artist } = artistStore;

  const handleChipClick = (genre: string) => {
    window.open(`https://en.wikipedia.org/wiki/${genre}`, "_blank");
  };

  if (!artist) {
    return null;
  }

  return (
    <>
      {artist.genres.map((genre) => (
        <Chip
          data-testid="chip-element"
          key={genre}
          label={genre}
          color="info"
          sx={{ background: "#4caf50", margin: 0.8 }}
          component="a"
          clickable
          onClick={() => handleChipClick(genre)}
        />
      ))}
    </>
  );
}));

Chips.displayName = "Chips";
