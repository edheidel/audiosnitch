import { Chip } from "@mui/material";
import { genres } from "store";
import styles from "../../../styles/ChipContainer.module.scss";

function GenreChips() {
  function renderChips() {
    switch (genres.data && genres.data.length > 0) {
      case true:
        return genres.data!.map((genre) => (
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
      case false:
        return <div className={styles.noGenres}>Too underground. No genres found 🥲</div>;
      default:
        return <> </>;
    }
  }

  return <div>{renderChips()}</div>;
}

export default GenreChips;
