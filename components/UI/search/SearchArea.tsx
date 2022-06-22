import * as React from "react";
import styles from "../../../styles/SearchArea.module.scss";
import SearchBar from "./SearchBar";

function SearchArea() {
  return (
    <div className={styles.body}>
      <div className={styles.title}>Which music style is this?</div>
      <div className={styles.search}>
        <SearchBar />
      </div>
    </div>
  );
}

export default SearchArea;
