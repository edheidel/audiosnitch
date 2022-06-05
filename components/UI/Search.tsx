import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

const ARTISTS_ENDPOINT = "/api/artists";

export default function Search(): JSX.Element {
  const [artistData, setArtistData] =
    useState<SpotifyApi.ArtistSearchResponse>();
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [artistList, setArtistList] = useState<string[]>([]);

  async function callArtistsAPI(value: string | null): Promise<void> {
    console.log(`--Calling artists API--`);
    try {
      await fetch(`${ARTISTS_ENDPOINT}/${value}`)
        .then((artists) => artists.json())
        .then((data) => setArtistData(data))
        .finally(() => {
          setArtistList(artistData!.artists.items.map((item) => item.name));
          console.log(`--Setting artist list--`);
        });
    } catch (e) {
      console.log(`--Failed to call Artists API: ${e}`);
    }
  }

  useEffect(() => {
    callArtistsAPI(searchValue);
    console.log(`--useEffect was triggered--`);
  }, [searchValue]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box"
        options={artistList}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Type an artist name..."
            margin="normal"
          />
        )}
        value={searchValue}
        onChange={(e: any, value: string | null) => setSearchValue(value)}
        onInputChange={(e: any, value: string | null) => setSearchValue(value)}
        freeSolo={true}
        filterOptions={(x) => x}
        filterSelectedOptions
        getOptionLabel={(option) => option}
        renderOption={(props, option, { inputValue }) => {
          const matches = match(option, inputValue);
          const parts = parse(option, matches);
          return (
            <li {...props}>
              <div>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </li>
          );
        }}
      />
    </>
  );
}
