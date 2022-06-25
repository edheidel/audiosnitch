/* eslint-disable react/jsx-boolean-value */
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import debounce from "lodash.debounce";
import { observer } from "mobx-react-lite";
import artistList from "store/artistList";
import artist from "store/artist";
import similarArtists from "store/similarArtists";
import drag from "store/drag";

function SearchBar(): JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<readonly SpotifyApi.ArtistObjectFull[]>([]);

  React.useEffect(() => {
    if (!isOpen) {
      setOptions([]);
    }
  }, [isOpen]);

  async function inputHandler(event: any, inputValue: string): Promise<void> {
    if (!inputValue) {
      setOptions([]);
    } else {
      setIsLoading(true);
      await artistList.fetchArtists(inputValue);
      setOptions(artistList.options);
      setIsLoading(false);
    }
  }

  const debounceInput = debounce(inputHandler, 700);

  function onChangeHandler(event: any, newValue: any): void {
    if (newValue === null) {
      artist.clear();
      if (drag.isActive) {
        similarArtists.fetchSimilarArtists(artist.data[0]?.id);
      }
    } else {
      artist.update(newValue);
      similarArtists.fetchSimilarArtists(artist.data[0]?.id);
      setTimeout(() => window.scrollTo(0, 755), 500);
    }
    setOptions([]);
  }

  return (
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
      getOptionLabel={(option: SpotifyApi.ArtistObjectFull) => option.name}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      onInputChange={debounceInput}
      onChange={onChangeHandler}
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
          variant="outlined"
          // fullWidth
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
      blurOnSelect
      clearOnBlur
      clearOnEscape
      noOptionsText="Keep on searching..."
      sx={{
        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#F7F7F7" },
      }}
    />
  );
}

export default observer(SearchBar);
