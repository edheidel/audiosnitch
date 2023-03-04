import {
  type FC,
  memo,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Fab } from "@mui/material";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

import { IconWrapper } from "../../common/icon-wrapper/IconWrapper";

import styles from "./ScrollToTopButton.module.scss";

/** A small button which appears during the page scroll. Allows user to navigate back to the top of the page. */
export const ScrollToTopButton: FC = memo(() => {
  // Initialise the visual state of the button.
  const [isVisible, setIsVisible] = useState(false);
  /** Make the button appear and disapear after scrolling the first 100 px threshold. */
  const toggleVisibility = useCallback(() => (window.scrollY > 100 ? setIsVisible(true) : setIsVisible(false)), []);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [toggleVisibility]);

  /** Handle the page scroll on the button click. */
  const handleClick = () => { window.scroll({ top: 0, behavior: "smooth" }); };

  return (
    <div className={styles.container}>
      <Fab
        className={isVisible ? styles.buttonVisible : styles.buttonInvisible}
        onClick={handleClick}
      >
        <IconWrapper icon={faChevronUp} style={{ height: "1.5rem" }} />
      </Fab>
    </div>
  );
});

ScrollToTopButton.displayName = "ScrollToTopButton";
