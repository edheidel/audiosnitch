import type { NextApiRequest, NextApiResponse } from "next";

import { cors, runMiddleware } from "../middleware";
import { fetchWithToken } from "../spotifyApi";
import { SPOTIFY_SEARCH_ENDPOINT } from "../consts";

/**
 * Setting up a Node.js serverless function for an HTTP request to the Spotify API.
 * @returns an object with 10 artist options.
 * @link https://developer.spotify.com/documentation/web-api/reference/#/operations/search
 */
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  // Initialise API middleware with CORS config.
  await runMiddleware(req, res, cors);

  // Extract the searched artist name string from the query parameters in the request object.
  const artist = req.query.artist as string;

  if (!artist) {
    throw new Error("Artist parameter is required");
  }

  // Construct Spotify API URL to perform an artist search.
  const url = `${SPOTIFY_SEARCH_ENDPOINT}?q=artist:${artist}&type=artist&limit=10&market=ES`;

  try {
    // Make an HTTP request to the Spotify API URL with an access token.
    const response = await fetchWithToken(url);
    res.status(200).json(response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error occurred while fetching ${url}: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
