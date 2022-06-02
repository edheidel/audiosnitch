import { SetStateAction, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

const SEARCH_ENDPOINT = "https://api.spotify.com/v1/search";

export default function Search({ token }): JSX.Element {
  const [searchValue, setSearchValue] = useState("");
  const [artistData, setArtistData] = useState();
  const [artistList, setArtistList] = useState([]);

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }): void => {
    setSearchValue(e.target.value);
    updateArtistList();
  };

  const updateArtistList = () => {
    try {
      if (searchValue.length > 1) {
        getArtistData();
        setArtistList(artistData.items.map((item) => item.name));
      } else if (searchValue.length <= 1) {
        setArtistList([]);
      }
    } catch (error) {
      console.log(`--updateArtistList failed: ${error}`);
    }
  };

  const getArtistData = () => {
    axios(`${SEARCH_ENDPOINT}?q=artist:${searchValue}&type=artist`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => setArtistData(response.data.artists))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box"
        options={artistList}
        // clearOnEscape={true}
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
      <h5 style={{ textAlign: "center" }}>
        {token.length > 0 && <p>token received</p>}
      </h5>
    </>
  );
}
