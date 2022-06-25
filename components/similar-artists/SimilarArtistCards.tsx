import React from "react";
import { observer } from "mobx-react-lite";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify, faYoutube } from "@fortawesome/free-brands-svg-icons";
import artist from "store/artist";
import similarArtists from "store/similarArtists";

function SimilarArtistCards() {
  return (
    <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
      {similarArtists.data[0]?.artists.slice(0, 15).map((similarArtist) => (
        <ListItem
          key={artist.id}
          secondaryAction={
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
                href={`https://www.youtube.com/results?search_query=${similarArtist.name}%2C+music`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </IconButton>
            </div>
          }
        >
          <ListItemAvatar>
            <Avatar alt="band photo small" src={similarArtist.images[2]?.url} />
          </ListItemAvatar>
          <ListItemText primary={similarArtist.name} />
        </ListItem>
      ))}
    </List>
  );
}

export default observer(SimilarArtistCards);
