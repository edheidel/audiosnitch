import { Chip } from "@mui/material";
import { genres } from "store";
import styles from "../../styles/GenreChips.module.css";

export default function GenreChips() {
  function renderChips() {
    switch (genres.data && genres.data.length > 0) {
      case true:
        return genres.data!.map((genre) => (
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
        ));
      case false:
        return <>Too underground. No genres found 🥲</>;
      default:
        return <> </>;
    }
  }

  return <div className={styles.container}>{renderChips()}</div>;
}
