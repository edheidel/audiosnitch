import styles from "../styles/Home.module.css";
import SearchBox from "./UI/SearchBox";

export default function Home(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.container__content}>
        <h1 className={styles.container__h1}>Which music style is this?</h1>
        <SearchBox />
        {/* <SearchButton artistData={artistData} searchValue={searchValue} /> */}
      </div>
    </div>
  );
}
