import React from "react";
import { observer } from "mobx-react-lite";
import { List, Skeleton, Stack } from "@mui/material";
import similarArtists from "store/similarArtists";

function SkeletonElement() {
  return (
    <Stack direction="row" spacing="0.5rem" sx={{ marginTop: "0.2rem", marginLeft: "1rem", marginBottom: "0.5rem" }}>
      <Skeleton variant="circular" width="2.5rem" sx={{ minWidth: "2.5rem", minHeight: "2.5rem" }} />
      <Skeleton
        width="390px"
        height="1.5rem"
        style={{ maxWidth: "90%", marginTop: "0.5rem", marginLeft: "1rem", marginRight: "2rem" }}
      />
    </Stack>
  );
}

function SimilarArtistSkeleton() {
  return similarArtists.isLoading ? (
    <List dense sx={{ width: "100%", bgcolor: "background.paper", maxWidth: "500px", maxHeigth: "736px" }}>
      {Array.from({ length: 15 }).map((_, index) => (
        <SkeletonElement key={index} /> // eslint-disable-line react/no-array-index-key
      ))}
    </List>
  ) : null;
}

export default observer(SimilarArtistSkeleton);
