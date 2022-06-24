import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./SearchContainer.module.scss";

function SearchContainer({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className={styles.body}>
      <div className={styles.title}>Which music style is this?</div>
      <div className={styles.search}>{children}</div>
    </div>
  );
}

export default observer(SearchContainer);
