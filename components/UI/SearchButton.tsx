import { useState } from "react";
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

  return (
    <>
      <Button
        variant="contained"
        disableElevation={true}
        fullWidth={true}
        size="large"
        onClick={(e) => setGenres(searchedArtist?.genres)}
      >
        Search
      </Button>
      <GenreChips genres={genres}/>
    </>
  );
}
