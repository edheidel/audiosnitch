import * as React from 'react';

interface ISpotifyGetArtistsProps {
}

const SpotifyGetArtists: React.FunctionComponent<ISpotifyGetArtistsProps> = (props) => {
  const [token, setToken] = React.useState("");
  const [data, setData] = React.useState({});
  return (
    <button>Get Artists</button>
  );
};

export default SpotifyGetArtists;
