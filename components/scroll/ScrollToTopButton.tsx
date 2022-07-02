import React from "react";
import { Fab } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { IResultsDiv } from "types";
import styles from "./ScrollToTopButton.module.scss";

function ScrollToTopButton({ resultsDiv }: IResultsDiv): JSX.Element {
  const [isVisible, setIsVisible] = React.useState(false);

  function toggleVisibility(): void {
    if (resultsDiv && window.scrollY > resultsDiv.offsetTop + 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  React.useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  function scrollToTop() {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className={styles.button}>
      <Fab onClick={scrollToTop} className={isVisible ? styles.button_visible : styles.button_invisible}>
        <FontAwesomeIcon icon={faArrowUp} style={{ fontSize: "1.3rem" }} />
      </Fab>
    </div>
  );
}

export default ScrollToTopButton;
