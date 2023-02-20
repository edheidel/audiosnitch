import { FC } from "react";
import {
  Avatar,
  Badge,
  IconButton,
  Skeleton,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

import { artistStore } from "../../store/artistStore";

import { IconWrapper } from "../common/icon-wrapper/IconWrapper";

import styles from "./ArtistPhoto.module.scss";

export const ArtistPhoto: FC = observer(() => {
  const { artist, isArtistLoading } = artistStore;

  if (isArtistLoading) {
    return (
      <div className={styles.container} data-testid="artist-photo-loading">
        <Skeleton variant="circular" width={150} height={150} />
      </div>
    );
  }
  return (
    <div className={styles.container} data-testid="artist-photo">
      <Badge
        overlap="circular"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent={(
          <IconButton
            aria-label="play on spotify"
            href={`https://open.spotify.com/artist/${artist?.id}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              width: 60, height: 60,
            }}
          >
            <div className={styles.badge}>
              <IconWrapper icon={faSpotify} />
            </div>
          </IconButton>
        )}
      >
        <Avatar
          src={artist?.images[1]?.url}
          alt={artist?.name}
          sx={{
            width: 150,
            height: 150,
          }}
        />
      </Badge>
    </div>
  );
});

ArtistPhoto.displayName = "ArtistPhoto";
