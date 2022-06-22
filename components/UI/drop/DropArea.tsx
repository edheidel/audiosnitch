import * as React from "react";
import { observer } from "mobx-react-lite";
import { dragStartHandler, dragLeaveHandler, dropHandler } from "utils/dragDrop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

import styles from "../../../styles/DropArea.module.scss";

function DropArea() {
  return (
    <div
      className={styles.dropArea}
      onDragStart={(e) => dragStartHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragOver={(e) => dragStartHandler(e)}
      onDrop={async (e) => dropHandler(e)}
    >
      <FontAwesomeIcon icon={faSpotify} className={styles.icon} />
      <div className={styles.title}>Drag an artist name here</div>
    </div>
  );
}

export default observer(DropArea);
