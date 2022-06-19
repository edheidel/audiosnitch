import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import debounce from "lodash.debounce";
import { observer } from "mobx-react-lite";
import { artists, genres } from "store";
import GenreChips from "./GenreChips";

function SearchBox() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<readonly SpotifyApi.ArtistObjectFull[]>([]);

  React.useEffect(() => {
    if (!isOpen) {
      setOptions([]);
    }
  }, [isOpen]);

  async function handleInput(event: any, inputValue: string): Promise<void> {
    if (!inputValue) {
      setOptions([]);
    } else {
      setIsLoading(true);
      await artists.search(inputValue);
      setOptions([...artists.data]);
      setIsLoading(false);
    }
  }

  const debounceInput = debounce(handleInput, 600);

  function handleOnChange(event: any, newValue: any): void {
    if (newValue === null) {
      setOptions([]);
      genres.update(null);
    } else {
      genres.update([...options.find((artist: SpotifyApi.ArtistObjectFull) => artist)!.genres]);
    }
  }

  return (
    <>
      <Autocomplete
        id="search-box"
        loading={isLoading}
        open={isOpen}
        onOpen={() => {
          setIsOpen(true);
        }}
        onClose={() => {
          setIsOpen(false);
        }}
        options={options}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        onInputChange={debounceInput}
        onChange={handleOnChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Type an artist name"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? <CircularProgress size={20} sx={{ color: "#F7F7F7" }} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            margin="normal"
            variant="outlined"
            fullWidth
            sx={{
              input: { color: "#F7F7F7", margin: 0.2 },
              label: { color: "#F7F7F7" },
            }}
          />
        )}
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
                    key={index} // eslint-disable-line react/no-array-index-key
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </li>
          );
        }}
        autoHighlight
        autoComplete
        blurOnSelect
        clearOnEscape
        noOptionsText="Keep on searching..."
        sx={{ "& .MuiOutlinedInput-notchedOutline": { borderColor: "#F7F7F7" } }}
      />
      <GenreChips />
    </>
  );
}

export default observer(SearchBox);
