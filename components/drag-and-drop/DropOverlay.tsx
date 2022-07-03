import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { observer } from "mobx-react-lite";
import drag from "store/drag";
import artist from "store/artist";
import similarArtists from "store/similarArtists";
import scrollToRef from "utils/scrollToRef";
import { dragLeaveHandler, dragStartHandler } from "utils/dragAndDrop";
import styles from "./DropOverlay.module.scss";

function DropArea({ breakRef }: { breakRef: HTMLDivElement | null }): JSX.Element {
  async function dropHandler(event: any): Promise<void> {
    event.preventDefault();
    const spotifyArtistId = [...event.dataTransfer.getData("text/uri-list")].slice(-22).join("");
    await artist.fetchArtistById(spotifyArtistId);
    await similarArtists.fetchSimilarArtists(artist.data[0]?.id);
    drag.enableDrop(false);
    scrollToRef(breakRef, -50);
  }

  return (
    <div
      id="drop-container"
      className={styles.dropContainer}
      onDragStart={(e) => dragStartHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragOver={(e) => dragStartHandler(e)}
      onDrop={async (e) => dropHandler(e)}
    >
      <div className={styles.dropArea}>
        <div className={styles.dropAreaText}>Drop an artist here</div>
        <FontAwesomeIcon className={styles.dropAreaIcon} icon={faSpotify} />
      </div>
      <div className={styles.dropOverlay} />
    </div>
  );
}

export default observer(DropArea);
