import styles from "../styles/Home.module.css";
import SearchBar from "./UI/SearchBar";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.container__content}>
        <h1>Which music style is this?</h1>
        <p>Start searching now.</p>
        <SearchBar />
      </div>
    </div>
  );
}
