import React from "react";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import { styled } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import { CircularProgress } from "@mui/material";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react-lite";
import artistList from "store/artistList";
import artist from "store/artist";
import similarArtists from "store/similarArtists";
import drag from "store/drag";
import scrollToRef from "utils/scrollToRef";
import { IResultsDiv } from "types";
import useIsMobile from "utils/hooks/useIsMobile";
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

const StyledRootWrapped = styled("div")(
  () => `
  display: flex;
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

const StyledInputWrapped = styled("input")(
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

const StyledListboxWrapped = styled("ul")(
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

function SearchBar({ resultsDiv }: IResultsDiv): JSX.Element {
  const isMobile: boolean = useIsMobile();
  const [inputValue, setInputValue] = React.useState<string>("");

  const debouncedFetch = React.useCallback(
    debounce((value: any) => {
      artistList.fetchArtists(value);
    }, 500),
    []
  );

  async function handleInputChange(event: any): Promise<void> {
    const { value } = event.target;
    setInputValue(value);
    debouncedFetch(value);
  }

  function clearInput(): void {
    setInputValue("");
    artistList.clear();
  }

  async function handleSubmit(event: any, value: any): Promise<void> {
    if (value === null) {
      artist.clear();
      if (drag.isActive) {
        await similarArtists.fetchSimilarArtists(artist.data[0]?.id);
      }
    } else {
      artist.update(value);
      await similarArtists.fetchSimilarArtists(artist.data[0]?.id);
      isMobile ? scrollToRef(resultsDiv, -300) : scrollToRef(resultsDiv, -60); // eslint-disable-line no-unused-expressions
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

  return similarArtists.isLoaded ? (
    <div className={styles.scrollWrapper}>
      <StyledRootWrapped {...getRootProps()}>
        <FontAwesomeIcon icon={faSearch} className={styles.searchIconWrapped} />
        <StyledInputWrapped
          {...getInputProps()}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type an artist name"
          id="searchBarInput"
        />
        {groupedOptions.length > 0 ? (
          <StyledListboxWrapped {...getListboxProps()}>
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
          </StyledListboxWrapped>
        ) : null}
        {artistList.isLoading && (
          <div>
            <CircularProgress size={25} sx={{ color: "white", marginTop: 2, marginRight: 2 }} />
          </div>
        )}
        {inputValue.length > 0 && !artistList.isLoading ? (
          <FontAwesomeIcon icon={faXmark} className={styles.crossIconWrapped} onClick={clearInput} />
        ) : null}
      </StyledRootWrapped>
    </div>
  ) : (
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
