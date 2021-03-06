import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/common/modules/auth/auth.service';
import { Animations } from 'src/app/common/style/variables/animations';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'adata-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.scss'],
  animations: [Animations.ngIfWidth]
})
export class NavigationPanelComponent implements OnInit, OnDestroy {
  public sidenavOpen: boolean;
  public dropdownActive: boolean;

  private routerSubscription: Subscription;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (window) {
      this.routerSubscription = this.router.events.subscribe(ev => {
        if (ev instanceof NavigationEnd) {
          if (this.sidenavOpen) {
            this.setSidenavOpen(false);
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

  public setSidenavOpen(b: boolean) {
    this.sidenavOpen = b;
  }

  async signOut() {
    this.sidenavOpen = false;
    this.authService.signOut();
  }
}
