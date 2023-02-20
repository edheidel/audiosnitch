import type { FC } from "react";
import { observer } from "mobx-react-lite";

import { artistStore } from "../../../store/artistStore";

import { Title } from "../title/Title";

import { Chips } from "./Chips";

import styles from "./ChipContainer.module.scss";

export const ChipContainer: FC = observer(() => {
  const { artist } = artistStore;

  const artistName = artist?.name;
  const hasGenres = artist?.genres?.length ?? 0;

  return (
    <div className={styles.container} data-testid="chip-container">
      <Title
        tag="h2"
        text={
          hasGenres
            ? `${transformToGenitiveCase(artistName)} style is`
            : `${artistName} is too underground 🥲`
        }
      />
      {hasGenres ? <Chips /> : <Title tag="h3" text="Try other artists" />}
    </div>
  );
});

ChipContainer.displayName = "ChipContainer";

// Grammatically transforms a name to the genitive case.
function transformToGenitiveCase(name: string | undefined): string {
  if (name === undefined) {
    return "";
  }

  if (name[name.length - 1] === "s") {
    return `${name}'`;
  }

  return `${name}'s`;
}
