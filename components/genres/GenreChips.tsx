import React from "react";
import { Chip } from "@mui/material";
import { observer } from "mobx-react-lite";
import artist from "store/artist";
import styles from "../../styles/ChipContainer.module.scss";

function renderChips() {
  if (artist.data && artist.data.length > 0 && artist.data[0].genres.length > 0) {
    return artist.data[0].genres.map((genre) => (
      <Chip
        label={genre}
        color="info"
        sx={{ background: "#4caf50", margin: 0.8 }}
        component="a"
        clickable
        href={`https://en.wikipedia.org/wiki/${genre}`}
        target="_blank"
        key={genre}
      />
    ));
  }
  if (artist.data && artist.data.length > 0 && artist.data[0].genres.length === 0) {
    return <div className={styles.noGenres}>Too underground. No genres found 🥲</div>;
  }
  return null;
}

function GenreChips(): JSX.Element {
  return <>{renderChips()}</>;
}

export default observer(GenreChips);
