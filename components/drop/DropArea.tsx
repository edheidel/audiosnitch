import React from "react";
import { dragStartHandler, dragLeaveHandler, dropHandler } from "utils/dragDrop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { observer } from "mobx-react-lite";
import styles from "../../styles/DropArea.module.scss";

function DropArea(): JSX.Element {
  return (
    <div
      className={styles.dropArea}
      onDragStart={(e) => dragStartHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragOver={(e) => dragStartHandler(e)}
      onDrop={async (e) => dropHandler(e)}
    >
      <FontAwesomeIcon className={styles.icon} icon={faSpotify} />
      <div className={styles.title}>Drag an artist name here</div>
    </div>
  );
}

export default observer(DropArea);
