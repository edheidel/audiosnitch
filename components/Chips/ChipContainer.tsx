import React from "react";
import { observer } from "mobx-react-lite";
import artist from "store/artist";
import Title from "../Title/Title";
import Chips from "./Chips";
import styles from "./ChipContainer.module.scss";

const ChipContainer = observer(() => {
  const artistName = artist.artistData.name;
  const hasGenres = artist.artistData.genres.length > 0;

  // Grammatically transforms a name to the genitive case
  const transformToGenitiveCase = (name: string) => (name[name.length - 1] === "s" ? `${name}'` : `${name}'s`);

  if (hasGenres) {
    return (
      <div className={styles.container}>
        <Title tag="h2" text={`${transformToGenitiveCase(artistName)} style is`} />
        <Chips />
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <Title tag="h2" text={`${artistName} is too underground 🥲`} />
      <Title tag="h3" text="Try other artists" />
    </div>
  );
});

export default ChipContainer;
