import { NextRouter } from "next/router";
import artist from "store/artist";
import dragDrop from "store/dragDrop";

export function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
  event.preventDefault();
  dragDrop.enableDrop(true);
}

export function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
  event.preventDefault();
  dragDrop.enableDrop(false);
}

export async function handleDrop(event: React.DragEvent<HTMLDivElement>, router: NextRouter) {
  const spotifyArtistId = [...event.dataTransfer.getData("text/uri-list")].slice(-22).join("");
  event.preventDefault();
  dragDrop.enableDrop(false);
  await artist.fetchArtistData(spotifyArtistId);
  router.push(`/artist/${artist.artistData.name}`);
}
