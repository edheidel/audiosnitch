import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Badge, IconButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import artist from "store/artist";

function Photo(): JSX.Element {
  return (
    <div style={{ marginBottom: "1.2rem" }}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <IconButton
            aria-label="play on spotify"
            href={`https://open.spotify.com/artist/${artist.data[0].id}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ width: 60, height: 60 }}
          >
            <div
              style={{
                fontSize: "2.5rem",
                color: "#1DB954",
                width: "40px",
                height: "40px",
                background: "#191414",
                borderRadius: "50%",
              }}
            >
              <FontAwesomeIcon icon={faSpotify} />
            </div>
          </IconButton>
        }
      >
        <Avatar src={artist.data[0].images[1].url} alt={artist.data[0].name} sx={{ height: 150, width: 150 }} />
      </Badge>
    </div>
  );
}

export default observer(Photo);
