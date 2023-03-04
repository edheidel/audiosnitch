import { DragEvent, useState } from "react";
import { useRouter } from "next/router";

import { artistStore } from "../../store/artistStore";

export const useDragAndDrop = () => {
  const [isActive, setIsActive] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { fetchArtistData } = artistStore;
  // Get the Next.js object with information about the current route.
  const router = useRouter();

  const enableDrop = (boolean: boolean) => {
    setIsActive(boolean);
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
    isActive,
    isDragging,
    handleDragStart,
    handleDragLeave,
    handleDrop,
  };
};
