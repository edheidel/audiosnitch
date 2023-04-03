import { type FC } from "react";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "@mui/material";
import Link from "next/link";

import { SearchAutocomplete } from "../../search/SearchAutocomplete";
import { IconWrapper } from "../icon-wrapper/IconWrapper";

import styles from "./Header.module.scss";

export const Header: FC = () => (
  <div className={styles.container}>
    <div className={styles.homeButton}>
      <Link href="/">
        <IconButton>
          <IconWrapper
            className={styles.homeIcon}
            icon={faHome}
          />
        </IconButton>
      </Link>
    </div>
    <div className={styles.search}>
      <SearchAutocomplete type="navbar" />
    </div>
  </div>
);

Header.displayName = "Header";
