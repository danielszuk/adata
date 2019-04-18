import { Injectable, OnDestroy } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService implements OnDestroy {
  private hidden;
  private routerSubscription: Subscription;

  constructor(
    private readonly router: Router,
    private readonly location: Location
  ) {
    // Make header visible defaultly for every route (if a route set hidden, the next route set back)
    const lastPath = this.location.path();
    this.routerSubscription = this.router.events.subscribe(ev => {
      if (ev instanceof RoutesRecognized) {
        const currentPath = this.location.path();
        if (currentPath !== lastPath) {
          if (this.hidden) {
            this.hidden = false;
          }
        }
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
