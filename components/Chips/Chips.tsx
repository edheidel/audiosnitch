import React from "react";
import { Chip } from "@mui/material";
import { observer } from "mobx-react-lite";
import artist from "store/artist";

const Chips = observer(() => {
  const { genres } = artist.artistData;

  return (
    <>
      {genres.map((genre) => (
        <Chip
          key={genre}
          label={genre}
          color="info"
          sx={{ background: "#4caf50", margin: 0.8 }}
          component="a"
          clickable
          href={`https://en.wikipedia.org/wiki/${genre}`}
          target="_blank"
        />
      ))}
    </>
  );
});

export default Chips;
