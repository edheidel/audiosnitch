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
  const { artistId } = router.query;

  React.useEffect(() => {
    device.calculateIsMobile();
  }, []);

  React.useEffect(() => {
    function loadArtistFromRoute() {
      artist.fetchArtistData(artistId);
      similarArtists.fetchSimilarArtists(artistId);
    }

    if (artistId) {
      loadArtistFromRoute();
    }
  }, [router]);

  return <div>{children}</div>;
};

export default withRouter(Loader);
