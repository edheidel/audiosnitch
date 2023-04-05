// Given an artist object, return the URL of the best-fitting image from artist images array.
export function getArtistImageSrc(artist: SpotifyApi.ArtistObjectFull, expectedWidth: number) {
  const { images } = artist;

  if (!images?.length) {
    return "/";
  }

  // Сopy original images array to prevent mutations in mobx store
  const copiedImages = images.slice();

  // Sort images array by the absolute difference between actual and expected width of each image element
  const sortedImages = copiedImages.sort((a, b) => {
    const aWidthDiff = Math.abs((a.width ?? 0) - expectedWidth);
    const bWidthDiff = Math.abs((b.width ?? 0) - expectedWidth);
    return aWidthDiff - bWidthDiff;
  });

  // Return an element with least width delta
  return sortedImages[0].url;
}
