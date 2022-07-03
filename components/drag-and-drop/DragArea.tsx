import React from "react";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./DragArea.module.scss";

function DragArea() {
  return (
    <div className={styles.dragContainer}>
      <div className={styles.dragArea}>
        <div className={styles.dragAreaText}>Or drag an artist from Spotify</div>
        <FontAwesomeIcon className={styles.dragAreaIcon} icon={faSpotify} />
      </div>
    </div>
  );
}

export default DragArea;
