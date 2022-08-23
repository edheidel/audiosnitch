import React from "react";
import { handleDragLeave, handleDragStart } from "utils/dragAndDrop";
import artist from "store/artist";
import { observer } from "mobx-react-lite";
import Header from "../Header/Header";
import DragDropOverlay from "../DragDropOverlay/DragDropOverlay";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";
import styles from "./Layout.module.scss";

const Layout = observer(({ children }: { children: React.ReactNode }) => (
  <div
    className={styles.wrapper}
    onDragStart={(e) => handleDragStart(e)}
    onDragLeave={(e) => handleDragLeave(e)}
    onDragOver={(e) => handleDragStart(e)}
  >
    {artist.isLoadedArtist && <Header />}
    <DragDropOverlay />
    <ScrollToTopButton />
    <div className={styles.container}>{children}</div>
  </div>
));

export default Layout;
