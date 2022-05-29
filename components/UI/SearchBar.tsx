import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";

interface ISearchBarProps {}

const SearchBar: React.FunctionComponent<ISearchBarProps> = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
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
    };
    fetchPosts();
  }, []);

  const [searchValue, setSearchValue] = useState("Type an artist name...");
  const onChange = (e: { target: { value: SetStateAction<string> } }): void =>
    setSearchValue(e.target.value);

  const onSubmit = (e: { preventDefault: () => void }): void => {
    e.preventDefault();

    console.log(`---searching: ${searchValue}`);
    setSearchValue("");
  };

  return (
    <>
      {loading && "Loading..."}
      {error && "Oops, something went wrong. Please try again later!"}
      <p>Current state: {searchValue}</p>
      <input type="text" value={searchValue} onChange={onChange} />
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
};

export default SearchBar;
