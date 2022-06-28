import React from "react";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import { styled } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import { CircularProgress } from "@mui/material";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import debounce from "lodash.debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react-lite";
import artistList from "store/artistList";
import artist from "store/artist";
import similarArtists from "store/similarArtists";
import drag from "store/drag";
import scrollToChipContainer from "utils/scrollToChipContainer";
import styles from "./SearchBar.module.scss";

const StyledRoot = styled("div")(
  () => `
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  padding: 0;
  box-sizing: border-box;
  width: 500px;
  max-width: 70vw;
  background-color: rgba(0, 0, 0, 0);
  color: whitesmoke;
  border: 1px solid whitesmoke;
  border-radius: 2rem;

  :focus-within {
    box-shadow: 0 0 10px #9ecaed;
  }

`
);

const StyledInput = styled("input")(
  () => `
  width: 100%;
  height: 3.5rem;
  padding: 1rem 0 1rem 0rem;
  outline: 0;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0);
  color: whitesmoke;
  border: 0;

  ::placeholder{
    color: whitesmoke;
    font-size: 1rem;
  }
`
);

const StyledListbox = styled("ul")(
  ({ theme }) => `
  position: absolute;
  width: 450px;
  max-width: 70vw;
  margin: 3.5rem 0 0 0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  list-style: none;
  background-color: #FFFFFF;
  overflow: auto;
  max-height: 25rem;
  border-radius: 3px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 9000;

  & li {
    padding: 0.5rem 1.5rem;
    display: flex;
    color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "rgba(0, 0, 0, 0.05)"};
    cursor: pointer;
  }
`
);

function SearchBar(): JSX.Element {
  const [inputValue, setInputValue] = React.useState<string>("");

  const debouncedFetch = React.useCallback(
    debounce((value) => {
      artistList.fetchArtists(value);
    }, 500),
    []
  );

  async function handleInputChange(event: any) {
    const { value } = event.target;
    setInputValue(value);
    debouncedFetch(value);
  }

  function clearInput() {
    setInputValue("");
    artistList.clear();
  }

  async function handleSubmit(event: any, value: any) {
    if (value === null) {
      artist.clear();
      if (drag.isActive) {
        similarArtists.fetchSimilarArtists(artist.data[0]?.id);
      }
    } else {
      artist.update(value);
      await similarArtists.fetchSimilarArtists(artist.data[0]?.id);
      scrollToChipContainer();
    }
    document.getElementById("searchBarInput")?.blur();
    setInputValue("");
    artistList.clear();
  }

  const { getRootProps, getInputProps, getListboxProps, getOptionProps, groupedOptions } = useAutocomplete({
    options: artistList.options,
    getOptionLabel: (option) => option.name,
    onChange: handleSubmit,
    autoHighlight: true,
  });

  return (
    <StyledRoot {...getRootProps()}>
      <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
      <StyledInput
        {...getInputProps()}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type an artist name"
        id="searchBarInput"
      />
      {groupedOptions.length > 0 ? (
        <StyledListbox {...getListboxProps()}>
          {groupedOptions.map((option: any, index: number) => {
            const matches = match(option.name, inputValue);
            const parts = parse(option.name, matches);
            return (
              <li {...getOptionProps({ option, index })} key={option.id}>
                <div>
                  {parts.map((part, idx) => (
                    <span
                      style={{
                        fontWeight: part.highlight ? 700 : 400,
                      }}
                      key={idx} // eslint-disable-line react/no-array-index-key
                    >
                      {part.text}
                    </span>
                  ))}
                </div>
              </li>
            );
          })}
        </StyledListbox>
      ) : null}
      {artistList.isLoading && (
        <div>
          <CircularProgress size={25} sx={{ color: "white", marginTop: 2, marginRight: 2 }} />
        </div>
      )}
      {inputValue.length > 0 && !artistList.isLoading ? (
        <FontAwesomeIcon icon={faXmark} className={styles.crossIcon} onClick={clearInput} />
      ) : null}
    </StyledRoot>
  );
}

export default observer(SearchBar);
