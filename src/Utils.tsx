export function capitalize(str: string): string {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
}

// regex allow only numbers and e and + and - and .
export const regexInputNotAllowed: RegExp = /[^0-9eE\+\-\.]/g;
