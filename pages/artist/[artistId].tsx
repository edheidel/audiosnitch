import React from "react";
import { observer } from "mobx-react-lite";
import artist from "store/artist";
import ArtistPhoto from "@/components/ArtistPhoto/ArtistPhoto";
import ChipContainer from "@/components/Chips/ChipContainer";
import SimilarArtistsContainer from "@/components/SimilarArtists/SimilarArtistsContainer";

const Artist = observer(() => {
  if (artist.isLoadedArtist) {
    return (
      <div>
        <ArtistPhoto />
        <ChipContainer />
        <SimilarArtistsContainer />
      </div>
    );
  }
  return null;
});

export default Artist;
