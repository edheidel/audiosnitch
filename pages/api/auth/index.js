import axios from "axios";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
let token = [];

// Exposes an OAuth token for the Spotify API.
async function getToken() {
  axios("https://accounts.spotify.com/api/token", {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
    },
    data: "grant_type=client_credentials",
  }).then((response) => token.push(response.data.access_token));
}

getToken();

export default function handler(req, res) {
  res.status(200).json(token);
}
