import React, { HTMLAttributes } from "react";
import { autocompleteClasses, styled } from "@mui/material";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import artist from "store/artist";

interface IGetOptionProps {
  option: SpotifyApi.ArtistObjectFull;
  index: number;
}

interface ISearchListBoxProps {
  inputValue: string;
  getListboxProps: () => React.HTMLAttributes<HTMLUListElement>;
  getOptionProps: ({ option, index }: IGetOptionProps) => HTMLAttributes<HTMLLIElement>; // eslint-disable-line
  options: SpotifyApi.ArtistObjectFull[];
}

const StyledListbox = styled("ul")(
  () => `
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
`
);

const SearchListBox = ({ getListboxProps, getOptionProps, options, inputValue }: ISearchListBoxProps) => {
  if (artist.artistList.length > 0 && inputValue.length > 0) {
    return (
      <StyledListbox {...getListboxProps()}>
        {options.map((option, index) => {
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
    );
  }
  return null;
};

export default SearchListBox;
