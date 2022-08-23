import React from "react";
import { observer } from "mobx-react-lite";
import artist from "store/artist";
import styles from "./SimilarArtistsContainer.module.scss";
import Title from "../Title/Title";
import SimilarArtists from "./SimilarArtists";

const SimilarArtistsContainer = observer(() => {
  if (artist.artistData.genres.length > 0) {
    return (
      <>
        <Title tag="h3" text={`More artists like ${artist.artistData.name}`} />
        <div className={styles.container}>
          <SimilarArtists />
        </div>
      </>
    );
  }
  return null;
});

export default SimilarArtistsContainer;
