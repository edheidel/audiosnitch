import type { FC, ReactNode } from "react";
import { useRouter } from "next/router";

import { useDragAndDrop } from "../../../utils/hooks/useDragAndDrop";
import { DragAndDropOverlay } from "../../drag-and-drop/DragAndDropOverlay";
import { Header } from "../header/Header";
import { ScrollToTopButton } from "../scroll-to-top-button/ScrollToTopButton";

import styles from "./Layout.module.scss";

/**
 * TO-DO
 * Context and children update cause the component to re-render.
 * Header re-renders for 70ms. Optimize performance.
 */

type LayoutProps = {
  children: ReactNode;
};

/**
 * HOC that positions and wraps the page content with other elements, such as:
 * - Header
 * - Drag and drop overlay
 * - Scroll-to-top button
 */
export const Layout: FC<LayoutProps> = ({ children }) => {
  // Get the Next.js object with information about the current route.
  const router = useRouter();
  // Get artist ID from the browser url.
  const urlWithArtistId = router.query.artistId as string;

  const {
    isActive,
    isDragging,
    handleDragStart,
    handleDragLeave,
    handleDrop,
  } = useDragAndDrop();

  return (
    <div
      className={styles.wrapper}
      onDragStart={handleDragStart}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragStart}
    >
      {urlWithArtistId && <Header />}

      {isActive && (
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
