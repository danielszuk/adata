import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  constructor() {}

  public scrollToTop() {
    if (window) {
      window.scrollTo(0, 0);
    }
  }

  public scrollTo(x: number, y: number) {
    if (window) {
      window.scrollTo(x, y);
    }
  }
}
