export const Round = (num: number, decimals?: number) => {
  const coefficient = Math.pow(10, decimals);
  return Math.round(num * coefficient) / coefficient;
};
