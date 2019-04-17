export const nextDiggingCycle = (): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, 0));
