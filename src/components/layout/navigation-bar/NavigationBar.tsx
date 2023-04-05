import { memo, type FC } from "react";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "@mui/material";
import Link from "next/link";

import { SearchBar } from "../../search-bar/SearchBar";
import { Icon } from "../../common/icon-wrapper/IconWrapper";

import styles from "./NavigationBar.module.scss";

export const NavigationBar: FC = memo(() => (
  <div className={styles.navbar}>
    <div className={styles.homeButton}>
      <Link href="/">
        <IconButton>
          <Icon
            className={styles.homeIcon}
            icon={faHome}
          />
        </IconButton>
      </Link>
    </div>
    <div className={styles.search}>
      <SearchBar type="navbar" />
    </div>
  </div>
));

NavigationBar.displayName = "NavigationBar";
