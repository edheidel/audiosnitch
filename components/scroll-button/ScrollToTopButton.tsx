import React from "react";
import { Fab } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import scrollToTop from "utils/scrollToTop";
import styles from "./ScrollToTopButton.module.scss";

function ScrollToTopButton(): JSX.Element {
  const [isVisible, setIsVisible] = React.useState(false);

  function toggleVisibility(): void {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  React.useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className={styles.button}>
      <Fab onClick={scrollToTop} className={isVisible ? styles.button_visible : styles.button_invisible}>
        <FontAwesomeIcon icon={faArrowUp} style={{ fontSize: "1.3rem" }} />
      </Fab>
    </div>
  );
}

export default ScrollToTopButton;
