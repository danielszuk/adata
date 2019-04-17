import { TransitionsTiming } from 'src/app/common/style/variables/transitions';

export class Loader {
  public loading: boolean;
  public loadingComplete: boolean;

  private loaderStartTimeout;

  private loaderTransitionTimingStart: number;
  private loaderTransitionTimingEnd: number;

  constructor(
    options: {
      transitionTimingStart?: number;
      transitionTimingEnd?: number;
    } = {}
  ) {
    this.loading = false;
    this.loadingComplete = false;

    this.loaderTransitionTimingStart =
      options.transitionTimingStart || TransitionsTiming.slow;
    this.loaderTransitionTimingEnd =
      options.transitionTimingEnd || TransitionsTiming.show;
  }

  private StartLoader() {
    this.loaderStartTimeout = null;
    this.loadingComplete = false;
    this.loading = true;
  }

  public startLoader(delayed?: boolean): Promise<void> {
    if (!this.loading && delayed) {
      return new Promise<void>(resolve => {
        this.loaderStartTimeout = setTimeout(() => {
          this.StartLoader();
          resolve();
        }, this.loaderTransitionTimingStart);
      });
    } else {
      this.StartLoader();
      return Promise.resolve();
    }
  }

  public completeLoader(delayed?: boolean): void {
    if (this.loaderStartTimeout) {
      clearTimeout(this.loaderStartTimeout);
      this.loaderStartTimeout = null;
    }
    if (delayed) {
      this.loadingComplete = true;
      setTimeout(() => {
        this.loading = false;
        this.loadingComplete = false;
      }, this.loaderTransitionTimingEnd);
    } else {
      this.loading = false;
      this.loadingComplete = false;
    }
  }
}
