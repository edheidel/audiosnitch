import { Chip } from "@mui/material";
import styles from "../../styles/GenreChips.module.css";

interface IGenreChipsProps {
  genres: string[] | undefined;
}

export default function GenreChips({ genres }: IGenreChipsProps): JSX.Element {
  return (
    <div className={styles.container}>
      {genres?.map((genre) => (
        <Chip
          className={styles.container__chip}
          label={genre}
          color="info"
          sx={{ background: "#4caf50" }}
          component="a"
          clickable
          href={`https://en.wikipedia.org/wiki/${genre}`}
          target="_blank"
          key={genre}
        />
      ))}
    </div>
  );
}
