import { type FC, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { artistStore } from "../store/artistStore";
import { SearchAutocomplete } from "../components/search/SearchAutocomplete";
import { Title } from "../components/common/title/Title";

import styles from "./index.module.scss";

const Home: FC = observer(() => {
  // Resets the artist store on the redirect to home page.
  useEffect(() => artistStore.clearAllData(), []);

  return (
    <div
      className={styles.container}
      data-testid="home-container"
    >
      <div data-testid="home-title">
        <Title
          tag="h1"
          text="Ready to discover more music?"
        />
      </div>
      <div
        className={styles.search}
        data-testid="home-search"
      >
        <SearchAutocomplete type="homepage" />
      </div>
    </div>
  );
});

export default Home;
