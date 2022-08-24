import React from "react";
import { Avatar, Badge, IconButton, Skeleton } from "@mui/material";
import { observer } from "mobx-react-lite";
import artist from "store/artist";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import styles from "./ArtistPhoto.module.scss";
import IconWrapper from "../IconWrapper/IconWrapper";

const ArtistPhoto = observer(() => {
  if (artist.isLoadingArtist) {
    return (
      <div className={styles.container}>
        <Skeleton variant="circular" width={150} height={150} />
      </div>
    );
  }
  if (!artist.isLoadingArtist) {
    return (
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
          <Avatar src={artist.artistData.images[1].url} alt={artist.artistData.name} sx={{ width: 150, height: 150 }} />
        </Badge>
      </div>
    );
  }
  return null;
});

export default ArtistPhoto;
