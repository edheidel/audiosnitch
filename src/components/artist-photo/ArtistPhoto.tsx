import { FC } from "react";
import {
  Avatar,
  IconButton,
  Skeleton,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { faSpotify, faYoutube } from "@fortawesome/free-brands-svg-icons";

import { artistStore } from "../../store/artistStore";

import { IconWrapper } from "../common/icon-wrapper/IconWrapper";

import styles from "./ArtistPhoto.module.scss";

export const ArtistPhoto: FC = observer(() => {
  const { artist, isArtistLoading } = artistStore;

  if (isArtistLoading) {
    return (
      <div
        className={styles.container}
        data-testid="artist-photo-loading"
      >
        <Skeleton variant="circular" width={150} height={150} />
      </div>
    );
  }

  return (
    <div
      className={styles.container}
      data-testid="artist-photo"
    >
      <Avatar
        src={artist?.images[1]?.url}
        alt={artist?.name}
        sx={{
          width: 150,
          height: 150,
        }}
      />
      <div
        className={styles.buttonWrapper}
      >
        <IconButton
          aria-label="play on spotify"
          href={`https://open.spotify.com/artist/${artist?.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconWrapper
            icon={faSpotify}
            style={{ color: "#1db954", fontSize: "2rem" }}
          />
        </IconButton>

        <IconButton
          aria-label="play on youtube"
          href={
              `https://www.youtube.com/results?search_query=${artist?.name.replace(/&/gi, "")}%2C+music`
            }
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconWrapper
            icon={faYoutube}
            style={{ color: "#da0000", fontSize: "2rem" }}
          />
        </IconButton>
      </div>
    </div>
  );
});

ArtistPhoto.displayName = "ArtistPhoto";
