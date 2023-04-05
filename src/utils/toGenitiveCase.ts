/**
 * Transforms a given artist name to the genitive case by appending 's or ' depending on the last character of the name.
 * @param name - Artist name
 * @returns Adjusted artist name with `'s` or `s'` at the end
 */
export function toGenitiveCase(name: string | undefined): string {
  if (!name) {
    return "";
  }

  if (name[name.length - 1] === "s") {
    return `${name}'`;
  }

  return `${name}'s`;
}
