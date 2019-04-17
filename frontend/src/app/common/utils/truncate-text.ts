export const TruncateText = (text: string, maxLength: number): string => {
  if (text && text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  } else {
    return text;
  }
};
