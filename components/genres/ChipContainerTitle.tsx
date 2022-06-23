import { observer } from "mobx-react-lite";
import artist from "store/artist";
import styles from "../../styles/ChipContainer.module.scss";

function adjustName(name: string) {
  return name[name.length - 1] === "s" ? `${name}'` : `${name}'s`;
}

function ChipContainerTitle(): JSX.Element | null {
  return artist.data && artist.data.length > 0 ? (
    <div>
      <div className={styles.title}>{`${adjustName(artist.data[0].name)} style is`}</div>
    </div>
  ) : null;
}

export default observer(ChipContainerTitle);
