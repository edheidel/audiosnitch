import { styled } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";

interface ISearchInputProps {
  type: "primary" | "secondary";
  getInputProps: () => React.InputHTMLAttributes<HTMLInputElement>;
  handleInputChange: (event: React.BaseSyntheticEvent) => Promise<void>; // eslint-disable-line no-unused-vars
  inputValue: string;
}

const StyledSearchInput = styled("input")(() => ({
  width: "100%",
  height: "3.5rem",
  padding: "1rem 0 1rem 0.3rem",
  marginRight: "1rem",
  fontSize: "1rem",
  backgroundColor: "rgba(0, 0, 0, 0)",
  color: "whitesmoke",
  outline: 0,
  border: 0,

  "&::placeholder": {
    color: "whitesmoke",
    fontSize: "1rem",
  },
}));

const StyledSearchInputNav = styled("input")(() => ({
  width: "100%",
  height: "2.5rem",
  padding: "1rem 0 1rem 0.3rem",
  marginRight: "1rem",
  fontSize: "1rem",
  backgroundColor: "rgba(0, 0, 0, 0)",
  color: "rgba(0, 0, 0, 0.8)",
  outline: 0,
  border: 0,

  "&::placeholder": {
    color: "rgba(0, 0, 0, 0.4)",
    fontSize: "0.95rem",
  },
}));

const SearchInput = observer(({ type, getInputProps, handleInputChange, inputValue }: ISearchInputProps) => {
  // Renders search component for the home page
  if (type === "primary") {
    return (
      <StyledSearchInput
        {...getInputProps()}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type an artist name"
        id="searchBarInput"
      />
    );
  }

  // Renders search component in the header
  if (type === "secondary") {
    return (
      <StyledSearchInputNav
        {...getInputProps()}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type an artist name"
        id="searchBarInput"
      />
    );
  }
  return null;
});

export default SearchInput;
