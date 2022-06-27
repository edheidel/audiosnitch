import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { observer } from "mobx-react-lite";
import drag from "store/drag";
import artist from "store/artist";
import similarArtists from "store/similarArtists";
import scrollToRef from "utils/scrollToRef";
import refs from "store/refs";
import styles from "./DropArea.module.scss";

function dragStartHandler(event: any): void {
  event.preventDefault();
  drag.enableDrop(true);
}

function dragLeaveHandler(event: any): void {
  event.preventDefault();
  drag.enableDrop(false);
}

async function dropHandler(event: any): Promise<void> {
  const spotifyArtistId = [...event.dataTransfer.getData("text/uri-list")].slice(-22).join("");
  event.preventDefault();
  similarArtists.clear();
  artist.saveId(spotifyArtistId);
  await artist.fetchArtistById(artist.id);
  await similarArtists.fetchSimilarArtists(artist.data[0]?.id);
  drag.enableDrop(false);
  setTimeout(() => scrollToRef(refs.chipsRef, -75), 500);
}

function DropArea(): JSX.Element {
  return drag.isActive ? (
    <div
      className={styles.dropArea_active}
      onDragStart={(e) => dragStartHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragOver={(e) => dragStartHandler(e)}
      onDrop={async (e) => dropHandler(e)}
    >
      <FontAwesomeIcon className={styles.icon_active} icon={faSpotify} />
      <div className={styles.title_active}>Drop an artist here</div>
    </div>
  ) : (
    <div
      className={styles.dropArea_inactive}
      onDragStart={(e) => dragStartHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragOver={(e) => dragStartHandler(e)}
      onDrop={async (e) => dropHandler(e)}
    >
      <FontAwesomeIcon className={styles.icon_inactive} icon={faSpotify} />
      <div className={styles.title_inactive}>Drag a Spotify artist here</div>
    </div>
  );
}

export default observer(DropArea);
