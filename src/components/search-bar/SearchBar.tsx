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

import classNames from "classnames";
import { artistStore } from "../../store/artistStore";
import { Icon } from "../common/icon-wrapper/IconWrapper";

import { SearchInput } from "./SearchInput";
import { SearchListBox } from "./SearchListbox";

import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  type: "homepage" | "navbar";
}

export const SearchBar: FC<SearchBarProps> = observer(({ type }) => {
  const [inputValue, setInputValue] = useState("");
  const [prevInputValue, setPrevInputValue] = useState("");
  // Get router object from Next.js.
  const router = useRouter();

  // Retrieve observables from the store
  const {
    list,
    isListLoading,
    fetchArtistList,
    clearArtistList,
    clearArtistData,
    updateArtistData,
  } = artistStore;

  // Fetch artist data with a debounced delay
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

  // Clear search input value and dropdown list
  const clearInput = () => {
    setInputValue("");
    clearArtistList();
  };

  // Handle change of input value
  const handleInputChange = async (event: BaseSyntheticEvent) => {
    const { value } = event.target;

    if (inputValue.length === 0) {
      clearInput();
    }

    setInputValue(value);
  };

  // Handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>, artistData: SpotifyApi.ArtistObjectFull | null) => {
    event.preventDefault();

    // Clear artist data or update it with the selected option
    if (artistData === null) {
      clearArtistData();
    } else {
      updateArtistData(artistData);
    }

    // Remove focus from input element and navigate to the selected artist page
    document.getElementById("searchBarInput")?.blur();
    router.push(`/artist/${artistData?.id}`);
    // Clear input value and artist list
    clearInput();
  };

  // Get necessary props from MUI useAutocomplete hook
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
  } = useAutocomplete({
    options: list,
    getOptionLabel: (option) => option.name,
    // Pass a callback function to handle the option selection
    onChange: (_event, value) => handleSubmit(_event as FormEvent<HTMLFormElement>, value),
    autoHighlight: true,
    isOptionEqualToValue: (option, value) => option.id === value.id,
  });

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.navbar]: type === "navbar",
      })}
    >
      <div
        className={classNames(styles.container, {
          [styles.navbar]: type === "navbar",
        })}
        {...getRootProps()}
      >
        <Icon
          className={classNames(styles.searchIcon, {
            [styles.navbar]: type === "navbar",
          })}
          icon={faSearch}
        />
        <SearchInput
          type={type}
          getInputProps={getInputProps}
          inputValue={inputValue}
          onChange={handleInputChange}
        />
        {isListLoading && (
          <div>
            <CircularProgress
              size={25}
              sx={type === "homepage"
                ? { color: "white", marginRight: 2 }
                : { color: "black", marginRight: 2 }}
            />
          </div>
        )}
        {inputValue.length > 0 && !isListLoading && (
          <Icon
            className={classNames(styles.clearIcon, {
              [styles.navbar]: type === "navbar",
            })}
            icon={faXmark}
            onClick={clearInput}
          />
        )}
      </div>
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

SearchBar.displayName = "SearchBar";
