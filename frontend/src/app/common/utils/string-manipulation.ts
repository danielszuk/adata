export const sliceString = (str: string, delimeter?: number): string => {
  if (15 < str.length) {
    return str.slice(0, delimeter || 15) + '...';
  } else {
    return str;
  }
};
