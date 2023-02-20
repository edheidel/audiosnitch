import type { FC, MouseEvent } from "react";
import { observer } from "mobx-react-lite";

import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  ListItemButton,
} from "@mui/material";

import { faSpotify, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/router";

import { artistStore } from "../../store/artistStore";
import { IconWrapper } from "../common/icon-wrapper/IconWrapper";

import { SimilarArtistSkeleton } from "./similar-artist-skeleton/SimilarArtistSkeleton";

interface SimilarArtistsProps {
  displayArtistCount: number;
}

export const SimilarArtists: FC<SimilarArtistsProps> = observer(({ displayArtistCount }) => {
  const { similarArtists, isSimilarArtistsLoading, isSimilarArtistsLoaded } = artistStore;

  // Number of similar artists defined by the displayArtistCount prop.
  // Will slice the array only if it has at least one element.
  const similarArtistsToDisplay: SpotifyApi.ArtistObjectFull[] = similarArtists?.length
    ? similarArtists.slice(0, displayArtistCount)
    : [];

  // Get the Next.js object with information about the current route.
  const router = useRouter();

  // Redirect to the artist's page after clicking on the list item.
  function handleClick(_: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, spotifyArtistId: string) {
    router.push(`/artist/${spotifyArtistId}`);
  }

  // Display the skeleton while similar artists are still loading.
  if (isSimilarArtistsLoading || !similarArtists) {
    return <SimilarArtistSkeleton displayArtistCount={displayArtistCount} />;
  }

  // Similar artists are displayed in a list with the avatar, name, and links to Spotify and YouTube.
  return (similarArtists ? (
    <List dense sx={{ width: "100%", bgcolor: "background.paper", borderRadius: 4 }}>
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
                  <IconWrapper icon={faSpotify} style={{ color: "#1db954" }} />
                </IconButton>

                <IconButton
                  aria-label="play on youtube"
                  // Transforms string to a valid YouTube url format
                  href={
                    `https://www.youtube.com/results?search_query=${similarArtist.name.replace(/&/gi, "")}%2C+music`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconWrapper icon={faYoutube} style={{ color: "#f00" }} />
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
            <ListItemAvatar>
              <Avatar alt="artist photo small" src={similarArtist.images[2]?.url} />
            </ListItemAvatar>
            <ListItemText primary={similarArtist.name} sx={{ maxWidth: "65%" }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  ) : null);
});

SimilarArtistSkeleton.displayName = "SimilarArtistSkeleton";
