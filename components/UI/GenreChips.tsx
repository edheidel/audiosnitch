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
        <Chip label={genre} color="info" key={genre} className={styles.container__chip}/>
      ))}
    </div>
  );
}
