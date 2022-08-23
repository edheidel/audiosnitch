// Transforms string to a valid YouTube url format

export default function parseName(name: string) {
  return name.replace(/&/gi, "");
}
