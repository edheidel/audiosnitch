import * as React from "react";
import { observer } from "mobx-react-lite";
import { dragStartHandler, dragLeaveHandler, dropHandler } from "utils/dragDrop";
import styles from "../../styles/DropArea.module.css";

function DropArea() {
  return (
    <div
      className={styles.container__drop_area_active}
      onDragStart={(event) => dragStartHandler(event)}
      onDragLeave={(event) => dragLeaveHandler(event)}
      onDragOver={(event) => dragStartHandler(event)}
      onDrop={async (event) => dropHandler(event)}
    >
      Drag an artist name here
    </div>
  );
}

export default observer(DropArea);
