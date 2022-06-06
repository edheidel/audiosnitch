import * as React from "react";
import { Chip } from "@mui/material";

export interface IGenreChipsProps {
  genres: string[] | undefined;
}

export default function GenreChips(props: IGenreChipsProps) {
  return (
    <div>
      {props.genres?.map((genre) => (
        <Chip label={genre} color="info" key={genre}/>
      ))}
    </div>
  );
}
