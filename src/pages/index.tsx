import { type FC, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { artistStore } from "../store/artistStore";
import { SearchBar } from "../components/search-bar/SearchBar";

import styles from "./index.module.scss";

const Home: FC = observer(() => {
  // Reset the artist store after redirect to home page
  useEffect(() => artistStore.clearAllData(), []);

  return (
    <div
      className={styles.container}
      data-testid="home-container"
    >
      <div data-testid="home-title">
        <h1>Ready to discover more music?</h1>
      </div>
      <div
        className={styles.search}
        data-testid="home-search"
      >
        <SearchBar type="homepage" />
      </div>
    </div>
  );
});

export default Home;
