import type { FC, MouseEvent } from "react";
import { observer } from "mobx-react-lite";

import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemButton,
} from "@mui/material";

import { faSpotify, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/router";

import Image from "next/image";
import { getArtistImageSrc } from "../../../utils/getArtistImageSrc";
import { artistStore } from "../../../store/artistStore";
import { Icon } from "../../common/icon-wrapper/IconWrapper";

import { SimilarArtistSkeleton } from "../similar-artist-skeleton/SimilarArtistSkeleton";

interface SimilarArtistListProps {
  displayArtistCount: number;
}

export const SimilarArtistList: FC<SimilarArtistListProps> = observer(({ displayArtistCount }) => {
  const {
    similarArtists,
    isSimilarArtistsLoading,
    isSimilarArtistsLoaded,
  } = artistStore;

  // Number of similar artists defined by `displayArtistCount` prop.
  // Will slice the array only if it has at least one element.
  const similarArtistsToDisplay: SpotifyApi.ArtistObjectFull[] = similarArtists?.length
    ? similarArtists.slice(0, displayArtistCount)
    : [];

  // Get Next.js object with information about the current route
  const router = useRouter();

  // Redirect to artist page after clicking on item from the list
  function handleClick(_: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, spotifyArtistId: string) {
    router.push(`/artist/${spotifyArtistId}`);
  }

  // Display skeleton while similar artists are loading
  if (isSimilarArtistsLoading || !similarArtists) {
    return <SimilarArtistSkeleton displayArtistCount={displayArtistCount} />;
  }

  // Display similar artists in a list with avatar, name, and links to Spotify and YouTube.
  return (similarArtists ? (
    <div
      style={{ width: "450px" }}
    >
      <List
        dense
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: 4,
        }}
      >
        {similarArtistsToDisplay.map((similarArtist) => (
          <ListItem
            key={similarArtist.id}
            secondaryAction={
            isSimilarArtistsLoaded && (
              <div>
                <IconButton
                  aria-label="play on spotify"
                  href={`https://open.spotify.com/artist/${similarArtist.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon
                    icon={faSpotify}
                    style={{ color: "#1db954" }}
                  />
                </IconButton>

                <IconButton
                  aria-label="play on youtube"
                  // Transform string to valid YouTube url format
                  href={
                    `https://www.youtube.com/results?search_query=${similarArtist.name.replace(/&/gi, "")}%2C+music`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon
                    icon={faYoutube}
                    style={{ color: "#f00" }}
                  />
                </IconButton>
              </div>
            )
          }
          >
            <ListItemButton
              sx={{ padding: 0 }}
              key={similarArtist.id}
              onClick={(e) => handleClick(e, similarArtist.id)}
            >
              <div
                style={{
                  overflow: "hidden",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  marginRight: "1rem",
                }}
              >
                <Image
                  src={getArtistImageSrc(similarArtist, 40)}
                  alt="artist photo small"
                  width={40}
                  height={40}
                  sizes="40px"
                  objectFit="cover"
                  objectPosition="top"
                />
              </div>
              <ListItemText
                primary={similarArtist.name}
                sx={{ maxWidth: "65%" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  ) : null);
});

SimilarArtistList.displayName = "SimilarArtistList";
