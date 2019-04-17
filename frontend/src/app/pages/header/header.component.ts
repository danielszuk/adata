import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Animations } from 'src/app/common/style/variables/animations';
import { AuthService } from 'src/app/common/modules/auth/auth.service';
import { HeaderService } from './header.service';

@Component({
  selector: 'adata-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [Animations.ngIfWidth, Animations.ngIfHeight]
})
export class HeaderComponent implements OnInit {
  public navigationActive: boolean;
  public searchActive;
  public sideNavActive;

  constructor(
    public headerService: HeaderService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (this.navigationActive && event instanceof NavigationEnd) {
        this.closeNavigation();
      }
    });
  }

  public toggleNavigation() {
    this.navigationActive = !this.navigationActive;
  }

  public closeNavigation() {
    this.navigationActive = false;
  }

  public toggleSearch(b: boolean) {
    this.searchActive = b;
  }

  public toggleSideNav(b: boolean) {
    this.sideNavActive = b;
  }

  public signInAttempt() {
    this.authService.signInAttempt();
  }
}
