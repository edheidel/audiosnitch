import { Chip } from "@mui/material";
import styles from "../../styles/GenreChips.module.css";

interface IGenreChipsProps {
  genres: string[] | undefined;
}

export default function GenreChips({ genres }: IGenreChipsProps): JSX.Element {
  return (
    <div className={styles.container}>
      {genres!.length > 0 ? (
        genres!.map((genre) => {
          return (
            <Chip
              label={genre}
              color="info"
              sx={{ background: "#4caf50", margin: 0.75 }}
              component="a"
              clickable
              href={`https://en.wikipedia.org/wiki/${genre}`}
              target="_blank"
              key={genre}
            />
          );
        })
      ) : (
        <p>Too underground. No genres found 🥲</p>
      )}
    </div>
  );
}
