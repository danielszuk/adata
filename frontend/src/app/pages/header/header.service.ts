import { Injectable, OnDestroy } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService implements OnDestroy {
  private hidden;
  private routerSubscription: Subscription;

  constructor(private readonly router: Router) {
    // Make header visible defaultly for every route (if a route set hidden, the next route set back)
    let lastPath;
    this.routerSubscription = this.router.events.subscribe(ev => {
      if (ev instanceof RoutesRecognized) {
        const currentPath = ev.urlAfterRedirects;
        if (currentPath !== lastPath && this.hidden) {
          this.hidden = false;
        }

        lastPath = currentPath;
      }
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  public get visible() {
    return !this.hidden;
  }

  public async hide() {
    this.hidden = true;
  }
}
