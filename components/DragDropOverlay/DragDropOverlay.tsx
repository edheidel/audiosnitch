import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { observer } from "mobx-react-lite";
import { handleDragLeave, handleDragStart, handleDrop } from "utils/dragAndDrop";
import device from "store/device";
import dragDrop from "store/dragDrop";
import { useRouter } from "next/router";
import styles from "./DragDropOverlay.module.scss";

const DragDropOverlay = observer(() => {
  const { isDesktop } = device;
  const { isActive } = dragDrop;
  const router = useRouter();

  if (isDesktop && isActive) {
    return (
      <div
        className={styles.dropContainer}
        onDragStart={(e) => handleDragStart(e)}
        onDragLeave={(e) => handleDragLeave(e)}
        onDragOver={(e) => handleDragStart(e)}
        onDrop={async (e) => handleDrop(e, router)}
      >
        <div className={styles.dropArea}>
          <div className={styles.dropAreaText}>Drop an artist here</div>
          <FontAwesomeIcon className={styles.dropAreaIcon} icon={faSpotify} />
        </div>
        <div className={styles.dropOverlay} />
      </div>
    );
  }
  return null;
});

export default DragDropOverlay;
