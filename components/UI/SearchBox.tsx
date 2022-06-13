import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import debounce from "lodash.debounce";
import GenreChips from "./GenreChips";
import { noArtist } from "utils/hooks/noArtist";

const ARTISTS_ENDPOINT = "/api/artists";

export default function SearchBox(): JSX.Element {
  const [artistList, setArtistList] = useState<SpotifyApi.ArtistObjectFull[]>(noArtist);
  const [selectedArtist, setSelectedArtist] = useState<any>();
  const [genres, setGenres] = useState<string[] | null[] | undefined>([]);

  async function callArtistsAPI(searchValue: string): Promise<void> {
    if (searchValue.length > 0) {
      await fetch(`${ARTISTS_ENDPOINT}/${searchValue}`)
        .then((response) => response.json())
        .then((response: SpotifyApi.ArtistSearchResponse) => {
          setArtistList(response.artists.items.map((item) => item));
        })
        .catch((err) => console.log(err)); // eslint-disable-line no-console
    }
  }

  const inputHandler = (event: any, searchValue: string) => {
    callArtistsAPI(searchValue);
  };

  const debouncedInputHandler = debounce(inputHandler, 500);

  const onChangeHandler = (event: any, newValue: any): void => {
    if (!newValue) {
      setArtistList(noArtist);
      setGenres([null]);
    } else {
      setSelectedArtist(newValue);
      setGenres(artistList.find((artist) => artist === artist)?.genres);
    }
  };

  return (
    <>
      <Autocomplete
        id="search-box"
        onInputChange={debouncedInputHandler}
        onChange={onChangeHandler}
        options={artistList}
        getOptionLabel={(option: any) => option.name}
        renderOption={(props, option, { inputValue }) => {
          const matches = match(option.name, inputValue);
          const parts = parse(option.name, matches);
          if (inputValue.length > 0) {
            return (
              <li {...props} key={option.id}>
                <div>
                  {parts.map((part, index) => (
                    <span
                      style={{
                        fontWeight: part.highlight ? 700 : 400,
                      }}
                      key={index}
                    >
                      {part.text}
                    </span>
                  ))}
                </div>
              </li>
            );
          } else {
            return <></>;
          }
        }}
        autoHighlight={true}
        includeInputInList
        isOptionEqualToValue={(option, value) => option.name === value.name}
        noOptionsText="Keep on searching..."
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              input: { color: "#F7F7F7", margin: 0.2 },
              label: { color: "#F7F7F7" },
            }}
            label="Type an artist name"
            margin="normal"
            variant="outlined"
            fullWidth={true}
          />
        )}
      />
      {selectedArtist && <GenreChips genres={genres} />}
    </>
  );
}
