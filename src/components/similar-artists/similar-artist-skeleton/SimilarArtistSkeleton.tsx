import { memo, type FC } from "react";
import { observer } from "mobx-react-lite";
import { List, Skeleton, Stack } from "@mui/material";

import { artistStore } from "../../../store/artistStore";
import { generateId } from "../../../utils/generateId";

interface SimilarArtistSkeletonProps {
  displayArtistCount: number
}

const SkeletonElement: FC = () => (
  <Stack
    direction="row"
    spacing="0.5rem"
    sx={{
      marginTop: "0.2rem",
      marginLeft: "1rem",
      marginBottom: "0.5rem",
    }}
  >
    <Skeleton
      variant="circular"
      width="2.5rem"
      animation="wave"
      sx={{ minWidth: "2.5rem", minHeight: "2.5rem" }}
    />
    <Skeleton
      width="390px"
      height="1.5rem"
      animation="wave"
      style={{
        maxWidth: "90%",
        marginTop: "0.5rem",
        marginLeft: "1rem",
        marginRight: "2rem",
      }}
    />
  </Stack>
);

export const SimilarArtistSkeleton: FC<SimilarArtistSkeletonProps> = memo(observer(({ displayArtistCount }) => {
  const { isSimilarArtistsLoading } = artistStore;

  return (isSimilarArtistsLoading ? (
    <List
      dense
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        maxWidth: "500px",
        maxHeight: "736px",
        borderRadius: 4,
      }}
    >
      {Array.from({ length: displayArtistCount }).map(() => (
        <SkeletonElement key={generateId()} />
      ))}
    </List>
  ) : null);
}));

SimilarArtistSkeleton.displayName = "SimilarArtistSkeleton";
