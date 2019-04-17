import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeviceService } from './common/services/device.service';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { HeaderService } from './pages/header/header.service';

@Component({
  selector: 'adata-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private routerSubscription: Subscription;

  constructor(
    public readonly deviceService: DeviceService,
    public readonly header: HeaderService,
    private readonly router: Router,
    private readonly location: Location
  ) {}

  ngOnInit() {
    if (window) {
      let lastPath = this.location.path();
      this.routerSubscription = this.router.events.subscribe(ev => {
        if (ev instanceof NavigationEnd) {
          // Scroll to top if path changed
          const currentPath = this.location.path();
          if (currentPath !== lastPath) {
            window.scrollTo(0, 0);
            lastPath = currentPath;
          }
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
