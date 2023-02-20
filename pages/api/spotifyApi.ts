import axios from "axios";
import { encode } from "base-64";

import type { Token, AccountResponse } from "./types";
import { CLIENT_ID, CLIENT_SECRET } from "./consts";

// Initialize the authentication token.
let token: Token | null = null;

// Call Spotify API for the access token value.
async function fetchToken(): Promise<string | undefined> {
  // If the fetched token has not been yet expired, return the existing access token value.
  if (token && token.expirationDate >= Date.now()) {
    return token.value;
  }

  try {
    // Make a request to the Spotify API to fetch a new token.
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${encode(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
      },
      body: "grant_type=client_credentials",
    });

    // Throw an error if the response status is not OK.
    if (!response.ok) {
      throw new Error("Failed to fetch token.");
    }

    // Parse and store response body in the token variable.
    const data: AccountResponse = await response.json();
    token = {
      value: data.access_token,
      expirationDate: Date.now() + data.expires_in,
    };

    // Return the access token value.
    return token.value;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to fetch token:", error);
    return undefined;
  }
}

/**
 * Makes a request to a Spotify API endpoint using a valid access token.
 *
 * @param url The URL of the endpoint to fetch.
 * @returns A Promise that resolves to the artist data, or undefined if an error occurs.
 */
export async function fetchWithToken(url: string): Promise<{} | undefined> {
  try {
    // Fetch a new token if one is not available or has expired.
    const authToken = await fetchToken();
    if (!authToken) {
      throw new Error("Failed to fetch auth token.");
    }

    // Make a request to the specified Spotify API endpoint using the access token.
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // Throw an error if response does not contain any data.
    if (!response.data) {
      throw new Error("Failed to fetch data.");
    }

    // Return the artist data from the response.
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to fetch data:", error);
    return undefined;
  }
}
