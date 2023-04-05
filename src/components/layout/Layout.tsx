import type { FC, ReactNode } from "react";
import { useRouter } from "next/router";

import { useDragAndDrop } from "../../utils/hooks/useDragAndDrop";
import { DragAndDropOverlay } from "../drag-and-drop/DragAndDropOverlay";
import { NavigationBar } from "./navigation-bar/NavigationBar";
import { ScrollToTopButton } from "../buttons/scroll-to-top-button/ScrollToTopButton";

import styles from "./Layout.module.scss";

type LayoutProps = {
  children: ReactNode;
};

/**
 * This high order component positions page content and adds other elements, such as:
 * - Navigation bar
 * - Drag and drop overlay
 * - Scroll-to-top button
 */
export const Layout: FC<LayoutProps> = ({ children }) => {
  // Get Next.js object with information about current route
  const router = useRouter();
  // Get artist ID from browser url
  const urlWithArtistId = router.query.artistId as string;

  const {
    isDropAreaActive,
    isDragging,
    handleDragStart,
    handleDragLeave,
    handleDrop,
  } = useDragAndDrop();

  return (
    <div
      className={styles.layoutWrapper}
      onDragStart={handleDragStart}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragStart}
    >
      {urlWithArtistId && <NavigationBar />}

      {isDropAreaActive && (
        <DragAndDropOverlay
          isDragging={isDragging}
          handleDragStart={handleDragStart}
          handleDragLeave={handleDragLeave}
          handleDrop={handleDrop}
        />
      )}

      <ScrollToTopButton />

      <div className={styles.container}>
        { children }
      </div>
    </div>
  );
};

Layout.displayName = "Layout";
