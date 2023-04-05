let idCounter = 0;

export const generateId = () => {
  idCounter++;
  return `id-${idCounter}`;
};
