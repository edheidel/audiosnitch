import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import GenreChips from "./GenreChips";

export interface ISearchButtonProps {
  artistData: SpotifyApi.ArtistSearchResponse | undefined;
  searchValue: string | null;
}

// This component returns genres from the artist data object.
export default function SearchButton(props: ISearchButtonProps) {
  const [genres, setGenres] = useState<string[] | undefined>();

  const searchedArtist: SpotifyApi.ArtistObjectFull | undefined =
    props.artistData?.artists.items.find(
      ({ name }) => name === props.searchValue
    );
  
  useEffect(()=>{
    setGenres([])
  }, [searchedArtist])

  return (
    <>
      <Button
        variant="contained"
        disableElevation={true}
        fullWidth={true}
        size="large"
        onClick={(e) => setGenres(searchedArtist?.genres)}
        sx={{
          marginTop: 1.5,
          background: "#03a9f4",
          "&:hover": { background: "#42a5f5" },
        }}
      >
        Search
      </Button>
      <GenreChips genres={genres} />
    </>
  );
}
