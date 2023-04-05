import type { FC, HTMLAttributes } from "react";
import { autocompleteClasses, styled } from "@mui/material";
import { observer } from "mobx-react-lite";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

import { artistStore } from "../../store/artistStore";
import { generateId } from "../../utils/generateId";

interface GetOptionProps {
  option: SpotifyApi.ArtistObjectFull;
  index: number;
}

interface SearchListBoxProps {
  inputValue: string;
  getListboxProps: () => HTMLAttributes<HTMLUListElement>;
  getOptionProps: ({ option, index }: GetOptionProps) => HTMLAttributes<HTMLLIElement>; // eslint-disable-line
  options: SpotifyApi.ArtistObjectFull[];
}

const StyledListbox = styled("ul")(() => `
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  list-style: none;
  background-color: #FFFFFF;
  overflow: auto;
  max-height: 25rem;
  border-radius: 3px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 6;

  & li {
    padding: 0.5rem 1.5rem;
    display: flex;
    color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
  }

  & li.${autocompleteClasses.focused} {
    background-color: rgba(0, 0, 0, 0.05);
    cursor: pointer;
  }
`);

export const SearchListBox: FC<SearchListBoxProps> = observer((
  {
    getListboxProps,
    getOptionProps,
    options,
    inputValue,
  },
) => {
  const { list } = artistStore;

  if (!list) {
    return null;
  }

  return (list.length > 0 && inputValue.length > 0 ? (
    // Map through the array with the suggested artists and create a dropdown list.
    // Matched text in the search input and artist names gets hihglighted.
    <StyledListbox {...getListboxProps()}>
      {options.map((option, index) => {
        const matches = match(option.name, inputValue);
        const parts = parse(option.name, matches);
        return (
          <li
            {...getOptionProps({ option, index })}
            key={generateId()}
          >
            <div>
              {parts.map((part) => (
                <span
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                  key={generateId()}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        );
      })}

    </StyledListbox>
  ) : null
  );
});

SearchListBox.displayName = "SearchListBox";
