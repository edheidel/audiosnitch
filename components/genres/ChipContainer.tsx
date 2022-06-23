import React from "react";
import { observer } from "mobx-react-lite";
import styles from "../../styles/ChipContainer.module.scss";

function ChipContainer({ children }: { children: React.ReactNode }): JSX.Element {
  return <div className={styles.body}>{children}</div>;
}

export default observer(ChipContainer);
