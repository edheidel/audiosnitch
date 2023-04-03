import type {
  BaseSyntheticEvent,
  FC,
  InputHTMLAttributes,
} from "react";

import { styled } from "@mui/material";

interface SearchInputProps {
  type: "homepage" | "navbar";
  getInputProps: () => InputHTMLAttributes<HTMLInputElement>;
  onChange: (_event: BaseSyntheticEvent) => Promise<void>;
  inputValue: string;
}

// Conditionally renders styles based on the type prop.
// Primary type used on the home page, secondary is for the header component.
const StyledSearchInput = styled("input")(({ type }) => ({
  width: "100%",
  height: type === "homepage" ? "3.5rem" : "2.5rem",
  fontSize: "1rem",
  backgroundColor: "rgba(0, 0, 0, 0)",
  color: type === "homepage" ? "whitesmoke" : "rgba(0, 0, 0, 0.8)",
  outline: 0,
  border: 0,

  "&::placeholder": {
    color: type === "homepage" ? "whitesmoke" : "rgba(0, 0, 0, 0.4)",
    fontSize: type === "homepage" ? "1rem" : "0.95rem",
  },
}));

export const SearchInput: FC<SearchInputProps> = ({
  type,
  getInputProps,
  onChange,
  inputValue,
}) => (
  <StyledSearchInput
    {...getInputProps()}
    type={type}
    value={inputValue}
    onChange={onChange}
    placeholder="Type an artist name"
    id="searchBarInput"
  />
);

SearchInput.displayName = "SearchInput";
