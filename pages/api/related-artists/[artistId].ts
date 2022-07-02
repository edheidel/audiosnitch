/* eslint-disable */
import axios from "axios";
import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";
import type { IToken, IAccountResponse, IArtist } from "types";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_ARTISTS_ENDPOINT = "https://api.spotify.com/v1/artists";

let token: IToken;

const cors = Cors({
  methods: ["GET", "HEAD"],
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: {
    (
      req: Cors.CorsRequest,
      res: {
        statusCode?: number | undefined;
        setHeader(key: string, value: string): any;
        end(): any;
      },
      next: (err?: any) => any
    ): void;
    (arg0: NextApiRequest, arg1: NextApiResponse<any>, arg2: (result: any) => void): void;
  }
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

async function fetchToken(): Promise<string> {
  if (!token || token.expirationDate < Date.now()) {
    token = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
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

async function fetchRelatedArtists(artistId: string | string[] | undefined): Promise<{}> {
  const artist: IArtist = await axios
    .get<Promise<IArtist>>(`${SPOTIFY_ARTISTS_ENDPOINT}/${artistId}/related-artists`, {
      headers: {
        Authorization: `Bearer ${await fetchToken()}`,
      },
    })
    .then((response) => response.data);
  return artist;
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await runMiddleware(req, res, cors);
  const { artistId } = req.query;
  res.status(200).json(await fetchRelatedArtists(artistId));
};
