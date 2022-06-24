import { observer } from "mobx-react-lite";
import artist from "store/artist";
import styles from "./ChipContainerTitle.module.scss";

function adjustName(name: string) {
  return name[name.length - 1] === "s" ? `${name}'` : `${name}'s`;
}

function ChipContainerTitle(): JSX.Element | null {
  if (artist.data[0].genres.length > 0) {
    return <div className={styles.title}>{`${adjustName(artist.data[0].name)} style is`}</div>;
  }
  if (artist.data[0].genres.length === 0) {
    return <div className={styles.title}>Too underground 🥲</div>;
  }
  return null;
}

export default observer(ChipContainerTitle);
