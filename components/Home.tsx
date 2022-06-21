import * as React from "react";
import { observer } from "mobx-react-lite";
import { drag, artists } from "store";
import { dragStartHandler, dragLeaveHandler, dropHandler } from "utils/dragDrop";
import styles from "../styles/Home.module.css";
import DropArea from "./UI/DropArea";
import SearchBox from "./UI/SearchBox";

function Home() {
  return (
    <div>
      {drag.isActive ? (
        <DropArea />
      ) : (
        <div
          className={styles.container}
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          onDrop={(e) => dropHandler(e)}
        >
          <div className={styles.container__content}>
            {!artists.data.name && <h1 className={styles.container__h1}>Which music style is this?</h1>}
            {artists.data.name && <h1 className={styles.container__h1}>{`${artists.data.name}'s style is`}</h1>}
            <div className={styles.container__search}>
              <SearchBox />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default observer(Home);
