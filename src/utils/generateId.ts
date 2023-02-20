let idCounter = 0;

export const generateId = () => {
  // eslint-disable-next-line no-plusplus
  idCounter++;
  return `id-${idCounter}`;
};
