import type { DragEvent, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { observer } from "mobx-react-lite";

import { useDevice } from "../../utils/hooks/useDevice";

import styles from "./DragDropOverlay.module.scss";

interface DragAndDropOverlayProps {
  isDragging: boolean,
  handleDragStart: (_event: DragEvent<HTMLDivElement>) => void,
  handleDragLeave: (_event: DragEvent<HTMLDivElement>) => void,
  handleDrop: (_event: DragEvent<HTMLDivElement>) => void,
}

/**
 * An overlay that allows a user to drag an artist to the app directly from the Spotify player,
 * instead of manually typing artist's name inside the search bar.
 */
export const DragAndDropOverlay: FC<DragAndDropOverlayProps> = observer(({
  isDragging,
  handleDragStart,
  handleDragLeave,
  handleDrop,
}) => {
  const { isDesktop } = useDevice();

  // Render the component for the desktop version of the app.
  return isDesktop ? (
    <div
      className={styles.dropContainer}
      onDragStart={handleDragStart}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={styles.dropArea}>
        <div className={styles.dropAreaText}>
          {isDragging ? "Release to drop" : "Drop an artist here"}
        </div>
        <FontAwesomeIcon className={styles.dropAreaIcon} icon={faSpotify} />
      </div>
      <div className={styles.dropOverlay} />
    </div>
  ) : null;
});

DragAndDropOverlay.displayName = "DragAndDropOverlay";
