import React from "react";
import { observer } from "mobx-react-lite";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, ListItemButton } from "@mui/material";
import { faSpotify, faYoutube } from "@fortawesome/free-brands-svg-icons";
import similarArtists from "store/similarArtists";
import { NextRouter, withRouter } from "next/router";
import parseName from "utils/parseName";
import SimilarArtistSkeleton from "../SimilarArtistSkeleton/SimilarArtistSkeleton";
import IconWrapper from "../IconWrapper/IconWrapper";

interface ISimilarArtistsProps {
  router: NextRouter;
}

const SimilarArtists = observer(({ router }: ISimilarArtistsProps) => {
  const handleClick = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>, spotifyArtistId: string) => {
    router.push(`/artist/${spotifyArtistId}`);
  };

  if (similarArtists.isLoadingSimilarArtists || similarArtists.data.length === 0) {
    return <SimilarArtistSkeleton />;
  }
  if (similarArtists.data.length > 0) {
    return (
      <List dense sx={{ width: "100%", bgcolor: "background.paper", borderRadius: 4 }}>
        {similarArtists.data[0].artists.slice(0, 15).map((similarArtist) => (
          <ListItem
            key={similarArtist.id}
            secondaryAction={
              similarArtists.isLoadingSimilarArtists ? null : (
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
                    href={`https://www.youtube.com/results?search_query=${parseName(similarArtist.name)}%2C+music`}
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
    );
  }
  return null;
});

export default withRouter(SimilarArtists);
