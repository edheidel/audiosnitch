import { SetStateAction, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

const ARTISTS_ENDPOINT = "/api/artists";

export default function Search(): JSX.Element {
  const [artists, setArtists] = useState<SpotifyApi.ArtistSearchResponse>();

  const [searchValue, setSearchValue] = useState("");
  const [artistList, setArtistList] = useState();

  useEffect(() => {
    callArtists();
  }, []);

  async function callArtists(): Promise<void> {
    await fetch(ARTISTS_ENDPOINT)
      .then((artists) => artists.json())
      .then((data) => setArtists(data));
  }

  console.log(artists?.artists.items.map((item) => item.name));

  // const handleInputChange = (e: {
  //   target: { value: SetStateAction<string> };
  // }): void => {
  //   setSearchValue(e.target.value);
  //   updateArtistList();
  // };

  // const updateArtistList = () => {
  //   try {
  //     if (searchValue.length > 1) {
  //       getArtistData();
  //       setArtistList(artistData.items.map((item) => item.name));
  //     } else if (searchValue.length <= 1) {
  //       setArtistList([]);
  //     }
  //   } catch (error) {
  //     console.log(`--updateArtistList failed: ${error}`);
  //   }
  // };

  return (
    <>
      {/* <Autocomplete
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
        onInputChange={handleInputChange}
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
      <h5 style={{ textAlign: "center", color: "#00e870" }}>
        {token.length > 0 && <p>token received</p>}
      </h5> */}
    </>
  );
}
