import { type FC, useEffect } from "react";
import { useRouter } from "next/router";

import { observer } from "mobx-react-lite";
import { artistStore } from "../../../store/artistStore";

// TO-DO: Create a fallback behaviour if artist does not exist (route with bad artistId).

/**
 * Layer of the app that prepares the MobX store prior to the page and its visual component initialisation.
 */
export const Loader: FC = observer(() => {
  const router = useRouter();
  // Get artist ID from the browser url.
  const urlWithArtistId = router.query.artistId as string;
  // Get the methods from the store.
  const { fetchArtistData, fetchSimilarArtists, artistExists } = artistStore;

  // Initialise the store by fetching the artist information from the Spotify API.
  useEffect(() => {
    if (urlWithArtistId) {
      fetchArtistData(urlWithArtistId);
    }
  }, [urlWithArtistId, fetchArtistData]);

  useEffect(() => {
    if (artistExists && urlWithArtistId) {
      fetchSimilarArtists(urlWithArtistId);
    }
  }, [artistExists, urlWithArtistId, fetchSimilarArtists]);

  return null;
});

Loader.displayName = "Loader";
