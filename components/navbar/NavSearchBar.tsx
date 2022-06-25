import React from "react";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import { styled } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import debounce from "lodash.debounce";
import { observer } from "mobx-react-lite";
import artistList from "store/artistList";
import artist from "store/artist";
import similarArtists from "store/similarArtists";
import drag from "store/drag";
import styles from "./NavSearchBar.module.scss";

const StyledRoot = styled("div")(
  ({ theme }) => `
  color: ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"};
  font-size: 0.9rem;
  width: 400px;
  max-width: 70vw;
`
);

const StyledInput = styled("input")(
  () => `
  width: 100%;
  height: 2.5rem;
  padding: 0 0 0 1.5rem;
  background-color: #FFFFFF;
  color: rgba(0, 0, 0, 0.6);
  border-radius: 30px;
  border: 0;
  margin: 0;
  outline: 0;
`
);

const StyledListbox = styled("ul")(
  ({ theme }) => `
  max-width: 70vw;
  margin: 1px 0 0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  list-style: none;
  background-color: #FFFFFF;
  overflow: auto;
  max-height: 20rem;
  border-radius: 3px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  z-index: 9001;
  cursor: pointer;

  & li {
    padding: 0.5rem 1.5rem;
    display: flex;
    color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
  }


  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "rgba(0, 0, 0, 0.05)"};
    cursor: pointer;
  }
`
);

function NavSearchBar() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [list, setList] = React.useState<readonly SpotifyApi.ArtistObjectFull[]>([]);

  function toggleVisibility(): void {
    if (window.scrollY > 750) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  React.useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  async function inputHandler(event: any, inputValue: string): Promise<void> {
    if (!inputValue) {
      setList([]);
    } else {
      await artistList.fetchArtists(inputValue);
      setList(artistList.options);
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
      setTimeout(() => window.scrollTo(0, 800), 500);
    }
    setList([]);
  }

  const { getRootProps, getInputProps, getListboxProps, getOptionProps, groupedOptions } = useAutocomplete({
    options: list,
    getOptionLabel: (option) => option.name,
    onInputChange: debounceInput,
    onChange: onChangeHandler,
  });

  return (
    <div className={isVisible ? styles.nav_visible : styles.nav_invisible}>
      <StyledRoot {...getRootProps()}>
        <StyledInput {...getInputProps()} placeholder="Search for other artists" />
        {list.length > 0 && groupedOptions.length > 0 ? (
          <StyledListbox {...getListboxProps()}>
            {groupedOptions.map((option: any, index) => (
              <li {...getOptionProps({ option, index })} key={option.id}>
                <span>{option.name}</span>
              </li>
            ))}
          </StyledListbox>
        ) : null}
      </StyledRoot>
    </div>
  );
}

export default observer(NavSearchBar);
