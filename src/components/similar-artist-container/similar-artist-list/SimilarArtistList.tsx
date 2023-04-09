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

interface SimilarArtistListProps {
  displayArtistCount: number;
}

// Display similar artists in a list with avatar, name, and links to music streaming services
export const SimilarArtistList: FC<SimilarArtistListProps> = observer(({ displayArtistCount }) => {
  const {
    similarArtists,
    isSimilarArtistsLoaded,
  } = artistStore;

  // Limit number of artist to shown based on `displayArtistCount` prop
  const similarArtistsToDisplay: SpotifyApi.ArtistObjectFull[] = similarArtists.slice(0, displayArtistCount);
  // Get Next.js object with information about the current route
  const router = useRouter();

  // Redirect to artist page after clicking on item from the list
  function handleClick(_: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, spotifyArtistId: string) {
    router.push(`/artist/${spotifyArtistId}`);
  }

  return (similarArtists ? (
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
                    // eslint-disable-next-line max-len
                href={`https://www.youtube.com/results?search_query=${similarArtist.name.replace(/&/gi, "")}%2C+music`}
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
              sx={{ maxWidth: "50%" }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  ) : null);
});

SimilarArtistList.displayName = "SimilarArtistList";
