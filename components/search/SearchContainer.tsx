import React from "react";
import { observer } from "mobx-react-lite";
import similarArtists from "store/similarArtists";
import styles from "./SearchContainer.module.scss";

function SearchContainer({ children }: { children: React.ReactNode }): JSX.Element {
  return !similarArtists.isLoaded ? (
    <div className={styles.body}>
      <div className={styles.title}>Which music style is this?</div>
      <div className={styles.search}>{children}</div>
    </div>
  ) : (
    <div className={styles.bodyWithResults}>
      <div>{children}</div>
    </div>
  );
}

export default observer(SearchContainer);
