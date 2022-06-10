import { Chip } from "@mui/material";
import styles from "../../styles/GenreChips.module.css";

interface IGenreChipsProps {
  genres: string[] | null[] | undefined;
}

export default function GenreChips({ genres }: IGenreChipsProps): JSX.Element {
  function renderChips() {
    if (genres && genres[0] != null) {
      return genres.map((genre) => {
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
      });
    } else if (genres!.length === 0) {
      return <>Too underground. No genres found 🥲</>;
    } else {
      return <></>;
    }
  }

  return <div className={styles.container}>{renderChips()}</div>;
}
