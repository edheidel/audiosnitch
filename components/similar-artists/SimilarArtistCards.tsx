import React from "react";
import { observer } from "mobx-react-lite";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, ListItemButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify, faYoutube } from "@fortawesome/free-brands-svg-icons";
import similarArtists from "store/similarArtists";
import artist from "store/artist";
import scrollToRef from "utils/scrollToRef";
import SimilarArtistSkeleton from "./SimilarArtistSkeleton";

function parseName(name: string): string {
  return name.replace(/&/gi, "");
}

function SimilarArtistCards({ breakRef }: { breakRef: HTMLDivElement | null }): JSX.Element {
  async function clickHandler(event: any, spotifyArtistId: string): Promise<void> {
    await artist.fetchArtistById(spotifyArtistId);
    await similarArtists.fetchSimilarArtists(artist.data[0]?.id);
    if (!similarArtists.isLoading) {
      scrollToRef(breakRef, -50);
    }
  }
  return similarArtists.isLoading ? (
    <SimilarArtistSkeleton />
  ) : (
    <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
      {similarArtists.data[0]?.artists.slice(0, 15).map((similarArtist) => (
        <ListItemButton sx={{ padding: 0 }} key={similarArtist.id}>
          <ListItem
            key={similarArtist.id}
            onClick={(e) => clickHandler(e, similarArtist.id)}
            secondaryAction={
              similarArtists.isLoading ? null : (
                <div>
                  <IconButton
                    aria-label="play on spotify"
                    href={`https://open.spotify.com/artist/${similarArtist.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faSpotify} />
                  </IconButton>

                  <IconButton
                    aria-label="play on youtube"
                    href={`https://www.youtube.com/results?search_query=${parseName(similarArtist.name)}%2C+music`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faYoutube} />
                  </IconButton>
                </div>
              )
            }
          >
            <ListItemAvatar>
              <Avatar alt="band photo small" src={similarArtist.images[2]?.url} />
            </ListItemAvatar>
            <ListItemText primary={similarArtist.name} sx={{ maxWidth: "65%" }} />
          </ListItem>
        </ListItemButton>
      ))}
    </List>
  );
}

export default observer(SimilarArtistCards);
