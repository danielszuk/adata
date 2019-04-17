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
  protected sidenavOpen: boolean;
  protected dropdownActive = false;

  private routerSubscription: Subscription;

  constructor(protected authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (window) {
      this.routerSubscription = this.router.events.subscribe(ev => {
        if (ev instanceof NavigationEnd) {
          this.setSidenavOpen(false);
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  protected setSidenavOpen(b: boolean) {
    this.sidenavOpen = b;
  }

  async signOut() {
    this.sidenavOpen = false;
    this.authService.signOut();
  }
}
