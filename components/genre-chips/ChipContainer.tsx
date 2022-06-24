import React from "react";
import { observer } from "mobx-react-lite";
import artist from "store/artist";
import styles from "./ChipContainer.module.scss";

function ChipContainer({ children }: { children: React.ReactNode }): JSX.Element | null {
  return artist.data && artist.data.length > 0 ? <div className={styles.body}>{children}</div> : null;
}

export default observer(ChipContainer);
