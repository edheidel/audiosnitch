import React from "react";
import { observer } from "mobx-react-lite";
import artist from "store/artist";
import styles from "./SimilarArtistsTitle.module.scss";

function SimilarArtistsTitle(): JSX.Element | null {
  return <div className={styles.title}>More artists like {artist.data[0]?.name}</div>;
}

export default observer(SimilarArtistsTitle);
