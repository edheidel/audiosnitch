import {
  type BaseSyntheticEvent,
  useState,
  useEffect,
  type FormEvent,
  type FC,
} from "react";

import { useRouter } from "next/router";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import { CircularProgress } from "@mui/material";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react-lite";
import debounce from "lodash.debounce";

import { artistStore } from "../../store/artistStore";
import { IconWrapper } from "../common/icon-wrapper/IconWrapper";

import { SearchInput } from "./SearchInput";
import { SearchListBox } from "./SearchListbox";

import styles from "./SearchAutocomplete.module.scss";

interface SearchAutocompleteProps {
  type: "primary" | "secondary";
}

export const SearchAutocomplete: FC<SearchAutocompleteProps> = observer(({ type }) => {
  // Define the input state.
  const [inputValue, setInputValue] = useState("");
  const [prevInputValue, setPrevInputValue] = useState("");
  // Get the router object from Next.js.
  const router = useRouter();

  // Desctucture observables from the store.
  const {
    list,
    isListLoading,
    fetchArtistList,
    clearArtistList,
    clearArtistData,
    updateArtistData,
  } = artistStore;

  // Use the useEffect hook to fetch artist data with a debounced delay.
  useEffect(() => {
    const debouncedFetch = debounce((value: string) => {
      if (value !== prevInputValue && value !== "") {
        fetchArtistList(value);
        setPrevInputValue(value);
      }
    }, 500);

    debouncedFetch(inputValue);

    return () => {
      debouncedFetch.cancel();
    };
  }, [inputValue, prevInputValue, fetchArtistList]);

  // Clears the search input value and dropdown list.
  const clearInput = () => {
    setInputValue("");
    clearArtistList();
  };

  // Handles changes to the input value.
  const handleInputChange = async (event: BaseSyntheticEvent) => {
    const { value } = event.target;

    if (inputValue.length === 0) {
      clearInput();
    }

    setInputValue(value);
  };

  // Handle form submission.
  const handleSubmit = (event: FormEvent<HTMLFormElement>, artistData: SpotifyApi.ArtistObjectFull | null) => {
    event.preventDefault();

    // Clear the artist data or update it with the selected option.
    if (artistData === null) {
      clearArtistData();
    } else {
      updateArtistData(artistData);
    }

    // Remove focus from the input element and navigate to the selected artist page.
    document.getElementById("searchBarInput")?.blur();
    router.push(`/artist/${artistData?.id}`);
    // Clear the input value and artist list
    clearInput();
  };

  // Get the necessary props from the MUI useAutocomplete hook.
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
  } = useAutocomplete({
    options: list,
    getOptionLabel: (option) => option.name,
    // Pass a callback function to handle the selection of an option.
    onChange: (_event, value) => handleSubmit(_event as FormEvent<HTMLFormElement>, value),
    autoHighlight: true,
    isOptionEqualToValue: (option, value) => option.id === value.id,
  });

  return (
    <div
      className={type === "primary" ? styles.wrapper : styles.wrapperNav}
      data-testid="search-autocomplete"
    >
      <div className={type === "primary" ? styles.container : styles.containerNav} {...getRootProps()}>
        {/* Render the search icon */}
        <IconWrapper
          className={type === "primary" ? styles.searchIcon : styles.searchIconNav}
          icon={faSearch}
        />
        {/* Render the search input */}
        <SearchInput
          type={type}
          getInputProps={getInputProps}
          inputValue={inputValue}
          onChange={handleInputChange}
        />
        {/* Render loading spinner when the artist list is being fetched */}
        {isListLoading && (
          <div>
            <CircularProgress
              size={25}
              sx={
                type === "primary"
                  ? { color: "white", marginRight: 2 }
                  : { color: "black", marginRight: 2 }
              }
            />
          </div>
        )}
        {/* Render a clear icon if there is input value */}
        {inputValue.length > 0 && !isListLoading && (
          <IconWrapper
            className={type === "primary" ? styles.xIcon : styles.xIconNav}
            icon={faXmark}
            onClick={clearInput}
          />
        )}
      </div>
      {/* Render the search options list */}
      <div className={styles.listbox}>
        <SearchListBox
          getListboxProps={getListboxProps}
          getOptionProps={getOptionProps}
          options={list}
          inputValue={inputValue}
        />
      </div>
    </div>
  );
});

SearchAutocomplete.displayName = "SearchAutocomplete";
