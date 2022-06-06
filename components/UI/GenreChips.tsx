import * as React from "react";
import { Chip } from "@mui/material";
import styles from "../../styles/GenreChips.module.css";

export interface IGenreChipsProps {
  genres: string[] | undefined;
}

export default function GenreChips(props: IGenreChipsProps) {
  return (
    <div className={styles.container}>
      {props.genres?.map((genre) => (
        <Chip
          className={styles.container__chip}
          label={genre}
          color="info"
          key={genre}
          sx={{background: "#4caf50"}}
        />
      ))}
    </div>
  );
}
