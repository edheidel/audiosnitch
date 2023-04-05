import { genreExceptions } from "./genreExceptions";

export const checkURL = async (title: string): Promise<boolean> => {
  // Check predefined genre exception dictionary for non-existent genres
  if (genreExceptions[title.toLowerCase()]) {
    return genreExceptions[title.toLowerCase()].isValidUrl;
  }

  // eslint-disable-next-line max-len
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(title)}&origin=*`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const { pages } = data.query;
    const firstPage = Object.keys(pages)[0];

    return !!pages[firstPage].pageid;
  } catch (error) {
    return false;
  }
};
