import { type FC, useEffect } from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";

import { artistStore } from "../../store/artistStore";

/**
 * Layer of the app that prepares the MobX store prior to the visual component rendering.
 */
export const Loader: FC = observer(() => {
  const router = useRouter();
  // Get artist ID from browser url
  const urlWithArtistId = router.query.artistId as string;
  // Get methods from the store
  const {
    fetchArtistData,
    fetchSimilarArtists,
    artistExists,
  } = artistStore;

  // Initialise the store by fetching artist information from Spotify API
  useEffect(() => {
    if (urlWithArtistId) {
      fetchArtistData(urlWithArtistId);
    }
  }, [urlWithArtistId, fetchArtistData]);

  useEffect(() => {
    if (artistExists && urlWithArtistId) {
      fetchSimilarArtists(urlWithArtistId);
    }
  }, [
    artistExists,
    urlWithArtistId,
    fetchSimilarArtists,
  ]);

  return null;
});
