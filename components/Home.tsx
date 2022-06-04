import styles from "../styles/Home.module.css";
import Search from "./UI/Search";

export default function Home(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.container__content}>
        <h1>Which music style is this?</h1>
        <p>Start searching now.</p>
        <Search />
      </div>
    </div>
  );
}
