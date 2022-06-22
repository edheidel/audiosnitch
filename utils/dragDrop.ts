import { drag, artists, genres } from "store";

export function dragStartHandler(event: any) {
  event.preventDefault();
  drag.enableDrop(true);
}

export function dragLeaveHandler(event: any) {
  event.preventDefault();
  drag.enableDrop(false);
}

export async function dropHandler(event: any) {
  event.preventDefault();
  artists.saveId([...event.dataTransfer.getData("text/uri-list")].slice(-22).join(""));
  await artists.fetchArtistById(artists.id);
  genres.update([...artists.data[0].genres]);
  drag.enableDrop(false);
}
