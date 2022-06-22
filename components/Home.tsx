import * as React from "react";
import { observer } from "mobx-react-lite";
import { drag } from "store";
import { dragStartHandler, dragLeaveHandler, dropHandler } from "utils/dragDrop";
import styles from "../styles/Home.module.scss";
import DropArea from "./UI/drop/DropArea";
import SearchArea from "./UI/search/SearchArea";
import ChipContainer from "./UI/genres/ChipContainer";

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
          <SearchArea />
          <ChipContainer />
        </div>
      )}
    </div>
  );
}

export default observer(Home);
