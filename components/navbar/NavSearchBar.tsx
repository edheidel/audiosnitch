import React from "react";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import { styled } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import debounce from "lodash.debounce";
import { observer } from "mobx-react-lite";
import artistList from "store/artistList";
import artist from "store/artist";
import similarArtists from "store/similarArtists";
import drag from "store/drag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { CircularProgress } from "@mui/material";
import scrollToRef from "utils/scrollToRef";
import refs from "store/refs";
import styles from "./NavSearchBar.module.scss";

const StyledRoot = styled("div")(
  () => `
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  padding: 0;
  box-sizing: border-box;
  font-size: 1rem;
  width: 350px;
  max-width: 70vw;
  border: 1px solid whitesmoke;
  border-radius: 2rem;
  background-color: #FFFFFF;

  :focus-within {
    box-shadow: 0 0 5px #9ecaed;
  }
`
);

const StyledInput = styled("input")(
  () => `
  width: 100%;
  height: 2.5rem;
  background-color: rgba(0, 0, 0, 0);
  color: rgba(0, 0, 0, 0.8);  
  border: 0;
  outline: 0;
  font-size: 1rem;

  ::placeholder{
    font-size: 0.95rem;
    color: rgba(0, 0, 0, 0.4);
  }
`
);

const StyledListbox = styled("ul")(
  ({ theme }) => `
  position: absolute;
  width: 300px;
  max-width: 70vw;
  margin: 2.7rem 0 0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  list-style: none;
  background-color: #FFFFFF;
  overflow: auto;
  max-height: 20rem;
  border-radius: 3px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;

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

function NavSearchBar(): JSX.Element {
  const [isVisible, setIsVisible] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>("");

  function toggleVisibility(): void {
    if (window.scrollY > 350) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  React.useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  const debouncedFetch = React.useCallback(
    debounce((value) => artistList.fetchArtists(value), 500),
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
      setTimeout(() => scrollToRef(refs.chipsRef, -75), 500);
    }
    document.getElementById("navSearchBarInput")?.blur();
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
    <div className={isVisible ? styles.nav_visible : styles.nav_invisible}>
      <StyledRoot {...getRootProps()}>
        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
        <StyledInput
          {...getInputProps()}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search for other artists"
          id="navSearchBarInput"
        />
        {inputValue.length > 0 && groupedOptions.length > 0 ? (
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
            <CircularProgress size={16} sx={{ color: "rgba(0, 0, 0, 0.4)", marginTop: 1.5, marginRight: 2 }} />
          </div>
        )}
        {inputValue.length > 0 && !artistList.isLoading ? (
          <FontAwesomeIcon icon={faXmark} className={styles.crossIcon} onClick={clearInput} />
        ) : null}
      </StyledRoot>
    </div>
  );
}

export default observer(NavSearchBar);
