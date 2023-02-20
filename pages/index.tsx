import { type FC, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { artistStore } from "../src/store/artistStore";
import { SearchAutocomplete } from "../src/components/search/SearchAutocomplete";
import { Title } from "../src/components/common/title/Title";

import styles from "./index.module.scss";

const Home: FC = observer(() => {
  // Resets the artist store on the home page redirect.
  useEffect(() => artistStore.clearAllData(), []);

  return (
    <div className={styles.container} data-testid="home-container">
      <div data-testid="home-title">
        <Title tag="h1" text="Searching for music style?" />
      </div>
      <div className={styles.search} data-testid="home-search">
        <SearchAutocomplete type="primary" />
      </div>
    </div>
  );
});

export default Home;
