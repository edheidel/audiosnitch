import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchToken } from "../../../utils/fetchToken";

const SEARCH_ENDPOINT = "https://api.spotify.com/v1/search";

let artists: SpotifyApi.ArtistSearchResponse;

export async function fetchArtists(artist?: string): Promise<{}> {
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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(await fetchArtists());
};
