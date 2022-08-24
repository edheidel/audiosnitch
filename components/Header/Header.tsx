import { observer } from "mobx-react-lite";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "@mui/material";
import Link from "next/link";
import artist from "store/artist";
import IconWrapper from "../IconWrapper/IconWrapper";
import SearchAutocomplete from "../SearchAutocomplete/SearchAutocomplete";
import styles from "./Header.module.scss";

const Header = observer(() => (
  <div className={styles.container}>
    <div className={styles.homeButton}>
      <Link href="/">
        <IconButton
          onClick={() => {
            artist.clearArtistData();
          }}
        >
          <IconWrapper className={styles.homeIcon} icon={faHome} />
        </IconButton>
      </Link>
    </div>
    <div className={styles.search}>
      <SearchAutocomplete type="secondary" />
    </div>
  </div>
));

export default Header;
