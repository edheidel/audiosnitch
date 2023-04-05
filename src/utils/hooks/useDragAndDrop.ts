import { DragEvent, useState } from "react";
import { useRouter } from "next/router";

import { artistStore } from "../../store/artistStore";

export const useDragAndDrop = () => {
  // Use to enable or disable visual overlay
  const [isDropAreaActive, setIsDropAreaActive] = useState(false);
  // Use to track dragging state
  const [isDragging, setIsDragging] = useState(false);
  const { fetchArtistData } = artistStore;
  // Get Next.js object with information about the current route
  const router = useRouter();

  const enableDrop = (boolean: boolean) => {
    setIsDropAreaActive(boolean);
  };

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
    enableDrop(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    enableDrop(false);
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    enableDrop(false);

    const spotifyArtistId = [...event.dataTransfer.getData("text/uri-list")].slice(-22).join("");

    if (spotifyArtistId) {
      await fetchArtistData(spotifyArtistId);
      router.push(`/artist/${spotifyArtistId}`);
    }
  };

  return {
    isDropAreaActive,
    isDragging,
    handleDragStart,
    handleDragLeave,
    handleDrop,
  };
};
