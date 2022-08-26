import React from "react";
import { useRouter } from "next/router";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import { CircularProgress } from "@mui/material";
import { debounce } from "lodash";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react-lite";
import artist from "store/artist";
import styles from "./SearchAutocomplete.module.scss";
import SearchListbox from "./SearchListbox";
import SearchInput from "./SearchInput";
import IconWrapper from "../IconWrapper/IconWrapper";

interface ISearchAutocompleteProps {
  type: "primary" | "secondary";
}

const SearchAutocomplete = observer(({ type }: ISearchAutocompleteProps) => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const router = useRouter();

  const debouncedFetch = React.useCallback(
    debounce((value: string) => {
      artist.fetchArtistList(value);
    }, 600),
    []
  );

  const clearInput = () => {
    setInputValue("");
    artist.clearArtistList();
  };

  const handleInputChange = async (event: React.BaseSyntheticEvent) => {
    if (inputValue.length === 0) {
      clearInput();
    }
    const { value } = event.target;
    setInputValue(value);
    debouncedFetch(value);
  };

  const handleSubmit = async (event: any, artistData: any) => {
    if (artistData === null) {
      artist.clearArtistData();
    } else {
      artist.updateArtistData(artistData);
    }

    document.getElementById("searchBarInput")?.blur();
    router.push(`/artist/${artist.artistData.id}`);
    clearInput();
  };

  const { getRootProps, getInputProps, getListboxProps, getOptionProps } = useAutocomplete({
    options: artist.artistList,
    getOptionLabel: (option) => option.name,
    onChange: handleSubmit,
    autoHighlight: true,
  });

  return (
    <div className={type === "primary" ? styles.wrapper : styles.wrapperNav}>
      <div className={type === "primary" ? styles.container : styles.containerNav} {...getRootProps()}>
        <IconWrapper className={type === "primary" ? styles.searchIcon : styles.searchIconNav} icon={faSearch} />
        <SearchInput
          type={type}
          getInputProps={getInputProps}
          handleInputChange={handleInputChange}
          inputValue={inputValue}
        />

        {artist.isLoadingList && (
          <div>
            <CircularProgress
              size={25}
              sx={type === "primary" ? { color: "white", marginRight: 2 } : { color: "black", marginRight: 2 }}
            />
          </div>
        )}

        {inputValue.length > 0 && !artist.isLoadingList && (
          <IconWrapper
            className={type === "primary" ? styles.xIcon : styles.xIconNav}
            icon={faXmark}
            onClick={clearInput}
          />
        )}
      </div>
      <div className={styles.listbox}>
        <SearchListbox
          getListboxProps={getListboxProps}
          getOptionProps={getOptionProps}
          options={artist.artistList}
          inputValue={inputValue}
        />
      </div>
    </div>
  );
});

export default SearchAutocomplete;
