import React from "react";
import { observer } from "mobx-react-lite";
import drag from "store/drag";
import { dragStartHandler, dragLeaveHandler, dropHandler } from "utils/dragDrop";
import DropArea from "./drop/DropArea";
import SearchContainer from "./search/SearchContainer";
import SearchBar from "./search/SearchBar";
import ChipContainer from "./genres/ChipContainer";
import ChipContainerTitle from "./genres/ChipContainerTitle";
import GenreChips from "./genres/GenreChips";
import styles from "../styles/Home.module.scss";

function Home(): JSX.Element {
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
          <SearchContainer>
            <SearchBar />
          </SearchContainer>
          <ChipContainer>
            <ChipContainerTitle />
            <GenreChips />
          </ChipContainer>
        </div>
      )}
    </div>
  );
}

export default observer(Home);
