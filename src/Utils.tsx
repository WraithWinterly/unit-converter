export function capitalize(str: string, lowerRest = true): string {
  str = str
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .replaceAll('_', ' ')
    .trim();
  return str;
}

// regex allow only numbers and e and + and - and .
export const regexInputNotAllowed: RegExp = /[^0-9eE\+\-\.]/g;
