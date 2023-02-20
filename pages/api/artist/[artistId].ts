import type { NextApiRequest, NextApiResponse } from "next";

import { cors, runMiddleware } from "../middleware";
import { fetchWithToken } from "../spotifyApi";
import { SPOTIFY_ARTISTS_ENDPOINT } from "../consts";

/**
 * Setting up a Node.js serverless function for an HTTP request to the Spotify API.
 * @returns Detailed information about the searched artist.
 * @link https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artist
 */
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  // Initialise API middleware with the CORS config.
  await runMiddleware(req, res, cors);

  // Extract the artistId from the query parameters in the request object.
  const artistId = req.query.artistId as string;

  if (!artistId) {
    throw new Error("Artist ID parameter is required");
  }

  // Construct Spotify API URL to get information about an artist using the artistId.
  const url = `${SPOTIFY_ARTISTS_ENDPOINT}/${artistId}`;

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
