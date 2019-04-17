const defaultTimeoutDensity = 50;

// For avoid emit 5-10 event at one action (e.g. scroll event, input typing):
// Emit event only every 'timeoutDensity' ms at max.
export class CallTimeout {
  timeout;
  timeoutDensity: number;

  constructor(timeoutDensity?: number) {
    this.timeoutDensity = timeoutDensity || defaultTimeoutDensity;
  }

  call(_call: () => any) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.timeout = null;
      if (_call) {
        _call();
      }
    }, this.timeoutDensity);
  }

  clear() {
    clearTimeout(this.timeout);
  }
}
