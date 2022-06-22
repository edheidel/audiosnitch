import { observer } from "mobx-react-lite";
import { artists } from "store";
import styles from "../../../styles/ChipContainer.module.scss";
import GenreChips from "./GenreChips";

function ChipContainer() {
  function adjustName(artist: string) {
    const arr = artist.split("");
    return arr[arr.length - 1] === "s" ? `${artist}'` : `${artist}'s`;
  }
  return (
    <div className={styles.body}>
      {artists.data.length > 0 && (
        <div>
          <div className={styles.title}>{`${adjustName(artists.data[0]!.name)} style is`}</div>
          <GenreChips />
        </div>
      )}
    </div>
  );
}

export default observer(ChipContainer);
