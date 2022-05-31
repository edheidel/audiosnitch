import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

export default function SearchBar(_props: any): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("Type an artist name...");

  // Gets an OAuth token for the Spotify API and saves it in the state.
  useEffect(() => {
    async function getToken(): Promise<void> {
      try {
        setLoading(true);

        axios("https://accounts.spotify.com/api/token", {
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
          },
          data: "grant_type=client_credentials",
        }).then((response) => setToken(response.data.access_token));

        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    getToken();
  }, []);

  const onChange = (e: { target: { value: SetStateAction<string> } }): void =>
    setSearch(e.target.value);

  const onSubmit = (e: { preventDefault: () => void }): void => {
    e.preventDefault();
    console.log(`---searching: ${search}`);
    setSearch("");
  };

  return (
    <>
      <p>SearchBar.tsx state: {search}</p>
      <input type="text" value={search} onChange={onChange} />
      <input type="submit" value="Search" onClick={onSubmit} />

      <p>{loading && "Loading..."}</p>
      <p>{error && "Oops, something went wrong. Please try again later!"}</p>

      <h2>API Response</h2>
      <p>{token}</p>
    </>
  );
}
