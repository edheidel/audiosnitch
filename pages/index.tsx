import React from "react";
import { observer } from "mobx-react-lite";
import SearchAutocomplete from "@/components/SearchAutocomplete/SearchAutocomplete";
import Title from "@/components/Title/Title";
import styles from "../styles/Home.module.scss";

const Home = observer(() => (
  <div className={styles.container}>
    <Title tag="h1" text="Searching for music style?" />
    <SearchAutocomplete type="primary" />
  </div>
));

export default Home;
