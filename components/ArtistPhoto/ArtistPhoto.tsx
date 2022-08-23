import React from "react";
import { Avatar, Badge, IconButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import artist from "store/artist";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import styles from "./ArtistPhoto.module.scss";
import IconWrapper from "../IconWrapper/IconWrapper";

const ArtistPhoto = observer(() => (
  <div className={styles.container}>
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      badgeContent={
        <IconButton
          aria-label="play on spotify"
          href={`https://open.spotify.com/artist/${artist.artistData.id}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ width: 60, height: 60 }}
        >
          <div className={styles.badge}>
            <IconWrapper icon={faSpotify} />
          </div>
        </IconButton>
      }
    >
      <Avatar src={artist.artistData.images[1].url} alt={artist.artistData.name} sx={{ height: 150, width: 150 }} />
    </Badge>
  </div>
));

export default ArtistPhoto;
