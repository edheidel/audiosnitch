import React from "react";
import { observer } from "mobx-react-lite";
import artist from "store/artist";
import styles from "./SimilarArtistsContainer.module.scss";

function SimilarArtistsContainer({ children }: { children: React.ReactNode }): JSX.Element | null {
  return artist.data && artist.data.length > 0 && artist.data[0].genres.length > 0 ? (
    <div className={styles.body}>{children}</div>
  ) : null;
}

export default observer(SimilarArtistsContainer);
