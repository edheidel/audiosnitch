import React from "react";
import { NextRouter, withRouter } from "next/router";
import artist from "store/artist";
import device from "store/device";
import similarArtists from "store/similarArtists";

interface ILoaderProps {
  router: NextRouter;
  children: React.ReactNode;
}

const Loader = ({ router, children }: ILoaderProps) => {
  const { artistName } = router.query;

  React.useEffect(() => {
    device.calculateIsMobile();
  }, []);

  React.useEffect(() => {
    async function loadArtistFromRoute() {
      await artist.fetchArtistList(artistName);
      artist.updateArtistData(artist.artistList[0]);
      await similarArtists.fetchSimilarArtists();
    }

    if (artistName) {
      loadArtistFromRoute();
    }
  }, [router]);

  return <div>{children}</div>;
};

export default withRouter(Loader);
