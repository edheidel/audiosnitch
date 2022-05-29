import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";

export default function SearchBar(_props: any): JSX.Element {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPosts(): Promise<void> {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setData(response.data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const [search, setSearch] = useState("Type an artist name...");

  const onChange = (e: { target: { value: SetStateAction<string> } }): void =>
    setSearch(e.target.value);

  const onSubmit = (e: { preventDefault: () => void }): void => {
    e.preventDefault();
    console.log(`---searching: ${search}`);
    setSearch("");
  };

  return (
    <>
      {loading && "Loading..."}
      {error && "Oops, something went wrong. Please try again later!"}
      <p>Current state: {search}</p>
      <input type="text" value={search} onChange={onChange} />
      <input type="submit" value="Search" onClick={onSubmit} />

      {data.map((post) => {
        const { id, title } = post;
        return (
          <article key={id}>
            <p>{title}</p>
          </article>
        );
      })}
    </>
  );
}
