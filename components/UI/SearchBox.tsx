import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import debounce from "lodash.debounce";
import GenreChips from "./GenreChips";

const ARTISTS_ENDPOINT = "/api/artists";

export interface IArtist {
  name: string;
  id: string;
  genres: string[];
}

interface IArtists extends Array<IArtist> {}

let artistList: IArtists = [{ name: "", id: "", genres: [""] }];
let artistData: SpotifyApi.ArtistSearchResponse;

export default function SearchBox(): JSX.Element {
  const [optionList, setOptionList] = useState<IArtists>([{ name: "Start searching now...", id: "", genres: [] }]);
  const [selectedArtist, setSelectedArtist] = useState<any>();
  const [genres, setGenres] = useState<string[] | null[] | undefined>([]);

  async function callArtistsAPI(searchValue: string): Promise<void> {
    if (searchValue.length > 0) {
      await fetch(`${ARTISTS_ENDPOINT}/${searchValue}`)
        .then((response) => response.json())
        .then((response) => {
          return (artistData = response);
        })
        .finally(() => {
          updateArtistList();
        })
        .catch((err) => console.log(err)); // eslint-disable-line no-console
    }
  }

  function updateArtistList() {
    artistList = artistData.artists.items.map((item) => {
      return {
        name: item.name,
        id: item.id,
        genres: item.genres,
      };
    });
    setOptionList(artistList);
  }

  const inputHandler = (event: any, searchValue: string): Promise<void> => callArtistsAPI(searchValue);
  const debouncedInputHandler = debounce(inputHandler, 500);

  const onChangeHandler = (event: any, newValue: any): void => {
    if (!newValue) {
      setOptionList([{ name: "Start searching now...", id: "", genres: [] }]);
      setGenres([null]);
    } else {
      setSelectedArtist(newValue);
      setGenres(artistData?.artists.items.find((artist) => artist === artist)?.genres);
    }
  };

  return (
    <>
      <Autocomplete
        id="search-box"
        onInputChange={debouncedInputHandler}
        onChange={onChangeHandler}
        options={optionList}
        getOptionLabel={(option: any) => option.name}
        renderOption={(props, option, { inputValue }) => {
          const matches = match(option.name, inputValue);
          const parts = parse(option.name, matches);
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
        }}
        autoHighlight={true}
        includeInputInList
        isOptionEqualToValue={(option, value) => option.name === value.name}
        noOptionsText="Not found, try other name"
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
