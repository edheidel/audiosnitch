import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
// import parse from "autosuggest-highlight/parse";
// import match from "autosuggest-highlight/match";

export interface ISearchProps {
  searchValue: string | null;
  artistList: { label: string; id: string }[];
  setSearchValue: any;
}

export default function SearchBox(props: ISearchProps): JSX.Element {
  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box"
        options={props.artistList}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              <div>{option.label}</div>
            </li>
          );
        }}
        // renderOption={(props, option, { inputValue }) => {
        //   const matches = match(option.label, inputValue);
        //   const parts = parse(option.label, matches);
        //   return (
        //     <li {...props}>
        //       {parts.map((part) => (
        //         <div
        //           style={{
        //             fontWeight: part.highlight ? 700 : 400,
        //           }}
        //           key={option.id}
        //         >
        //           {option.label}
        //         </div>
        //       ))}
        //     </li>
        //   );
        // }}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            sx={{
              input: { color: "#F7F7F7", margin: 0.2 },
              label: { color: "#F7F7F7" },
            }}
            helperText="Type an artist name"
            label="Start searching now..."
            margin="normal"
            variant="outlined"
          />
        )}
        value={props.searchValue}
        // onChange={(e: any, value: string | null) => props.setSearchValue(value)}
        onInputChange={(e: any, value) => props.setSearchValue(value)}
        freeSolo={true}
        filterOptions={(x) => x}
        filterSelectedOptions
      />
    </>
  );
}