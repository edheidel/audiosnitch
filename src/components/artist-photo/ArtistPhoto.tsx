import type { FC } from "react";
import {
  IconButton,
  Skeleton,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { faSpotify, faYoutube } from "@fortawesome/free-brands-svg-icons";

import Image from "next/image";
import { getArtistImageSrc } from "../../utils/getArtistImageSrc";
import { artistStore } from "../../store/artistStore";

import { Icon } from "../common/icon-wrapper/IconWrapper";

import styles from "./ArtistPhoto.module.scss";

export const ArtistPhoto: FC = observer(() => {
  const { artist, isArtistLoading } = artistStore;
  const spotifyUrl = `https://open.spotify.com/artist/${artist?.id}`;
  const youtubeUrl = `https://www.youtube.com/results?search_query=${artist?.name.replace(/&/gi, "")}%2C+music`;

  return (
    <div
      className={styles.wrapper}
      data-testid="artist-photo"
    >
      <Skeleton
        variant="circular"
        width={150}
        height={150}
      />

      {!isArtistLoading && (
        <div
          className={styles.photo}
        >
          <Image
            src={getArtistImageSrc(artist, 200)}
            alt={artist.name}
            width={150}
            height={150}
            priority
            objectFit="cover"
            objectPosition="top"
          />
        </div>
      )}

      <div
        className={styles.buttons}
      >
        <IconButton
          aria-label="play on spotify"
          href={spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon
            icon={faSpotify}
            style={{
              color: "#1db954",
              fontSize: "2rem",
            }}
          />
        </IconButton>
        <IconButton
          aria-label="play on youtube"
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon
            icon={faYoutube}
            style={{
              color: "#da0000",
              fontSize: "2rem",
            }}
          />
        </IconButton>
      </div>
    </div>
  );
});

ArtistPhoto.displayName = "ArtistPhoto";
