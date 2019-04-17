export const TransitionsTiming = {
  quick: 150,
  normal: 300,
  slow: 600,
  show: 2000,
  showEase: 2500,
  debug: 20000
};

export const Transitions = {
  quick: TransitionsTiming.quick + 'ms ease-in-out',
  normal: TransitionsTiming.normal + 'ms ease-in-out',
  slow: TransitionsTiming.slow + 'ms ease',
  show: TransitionsTiming.show + 'ms linear',
  showEase: TransitionsTiming.showEase + 'ms ease-in-out',
  debug: TransitionsTiming.debug + 'ms linear'
};
