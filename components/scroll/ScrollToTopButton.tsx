import React from "react";
import { Fab } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./ScrollToTopButton.module.scss";

function ScrollToTopButton(): JSX.Element {
  const [isVisible, setIsVisible] = React.useState(false);

  function toggleVisibility(): void {
    if (window.scrollY > 700) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  function scrollToTop() {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }

  React.useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className={styles.button}>
      <Fab onClick={scrollToTop} className={isVisible ? styles.button_visible : styles.button_invisible}>
        <FontAwesomeIcon icon={faArrowUp} />
      </Fab>
    </div>
  );
}

export default ScrollToTopButton;
