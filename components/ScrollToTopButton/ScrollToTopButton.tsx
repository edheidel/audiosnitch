import React from "react";
import { Fab } from "@mui/material";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import scrollToTop from "utils/scrollToTop";
import IconWrapper from "../IconWrapper/IconWrapper";
import styles from "./ScrollToTopButton.module.scss";

const ScrollToTopButton = React.memo(() => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => (window.scrollY > 100 ? setIsVisible(true) : setIsVisible(false));

  React.useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Fab className={isVisible ? styles.buttonVisible : styles.buttonInvisible} onClick={scrollToTop}>
        <IconWrapper icon={faChevronUp} style={{ height: "1.5rem" }} />
      </Fab>
    </div>
  );
});

export default ScrollToTopButton;
