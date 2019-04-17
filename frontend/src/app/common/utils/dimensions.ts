export const Height = (el: HTMLElement): number => {
  return Math.max(el.offsetHeight, el.clientHeight, el.scrollHeight);
};

export const Width = (el: HTMLElement): number => {
  return Math.max(el.offsetWidth, el.clientWidth, el.scrollWidth);
};
