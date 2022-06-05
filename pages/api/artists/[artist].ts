/* eslint-disable */
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

interface IToken {
  value: string;
  expirationDate: number;
}

interface IAccountResponse {
  access_token: string;
  token_type: "bearer";
  expires_in: 3600;
}

let token: IToken;

export async function fetchToken(): Promise<string> {
  if (!token || token.expirationDate < Date.now()) {
    token = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
      },
      body: "grant_type=client_credentials",
    })
      .then<IAccountResponse>((response) => response.json())
      .then<IToken>((data) => ({
        value: data.access_token,
        expirationDate: Date.now() + data.expires_in,
      }));
  }
  return token.value;
}


const SEARCH_ENDPOINT = "https://api.spotify.com/v1/search";

let artists: SpotifyApi.ArtistSearchResponse;

async function fetchArtists(artist: string | string[]): Promise<{}> {
  artists = await axios
    .get<Promise<SpotifyApi.ArtistSearchResponse>>(
      `${SEARCH_ENDPOINT}?q=artist:${artist}&type=artist`,
      {
        headers: {
          Authorization: `Bearer ${await fetchToken()}`,
        },
      }
    )
    .then((response) => response.data);
  return artists;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { artist } = req.query;
  res.status(200).json(await fetchArtists(artist));
};
