import drag from "store/drag";
import artist from "store/artist";

export function dragStartHandler(event: any) {
  event.preventDefault();
  drag.enableDrop(true);
}

export function dragLeaveHandler(event: any) {
  event.preventDefault();
  drag.enableDrop(false);
}

export async function dropHandler(event: any) {
  const spotifyArtistId = [...event.dataTransfer.getData("text/uri-list")].slice(-22).join("");
  event.preventDefault();
  artist.saveId(spotifyArtistId);
  await artist.fetchArtistById(artist.id);
  drag.enableDrop(false);
}
