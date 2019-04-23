import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/core/local-storage/local.storage.service';
import { LocalStorageKey } from 'src/app/core/local-storage/local.storage.key';
import { JwtService } from '../jwt/jwt.service';
import { AuthService } from '../auth.service';
import { HeaderService } from '../../../../pages/header/header.service';

@Component({
  selector: 'adata-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit, OnDestroy {
  private paramSubscription: Subscription;

  constructor(
    private readonly activetedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly jwtService: JwtService,
    private readonly localStorageService: LocalStorageService,
    private readonly authService: AuthService,
    private readonly header: HeaderService
  ) {
    this.header.hide();
  }

  ngOnInit() {
    this.paramSubscription = this.activetedRoute.paramMap.subscribe(params => {
      const jwt = params.get('jwt');
      this.jwtService.setJwtToken(jwt);
      const redirect = this.localStorageService.getItem(
        LocalStorageKey.LOGIN_REDIRECT
      );
      this.localStorageService.removeItem(LocalStorageKey.LOGIN_REDIRECT);
      this.authService.signIn();
      this.router.navigate([redirect || '/']);
    });
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }
}
