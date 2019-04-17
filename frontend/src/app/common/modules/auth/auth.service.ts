import { Injectable } from '@angular/core';

import { LocalStorageService } from 'src/app/core/local-storage/local.storage.service';
import { ConfigService } from 'src/app/core/config/config.service';
import { LocalStorageKey } from 'src/app/core/local-storage/local.storage.key';
import { IJwtUserDTO } from 'src/shared/modules/auth/jwt.user.dto';
import { JwtService } from './jwt/jwt.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user: IJwtUserDTO = null;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {
    this.setUserFromJwtToken();
  }

  public signInAttempt(): void {
    this.localStorageService.setItem(
      LocalStorageKey.LOGIN_REDIRECT,
      window.location.pathname
    );
    window.location.href =
      this.configService.config.backendUrl + '/auth/google';
  }

  public signIn(): void {
    if (!this.jwtService.getJwtDecodedToken) {
      throw new Error('JWT Token not provided');
    }
    this.setUserFromJwtToken();
  }

  private setUserFromJwtToken(): void {
    const jwtToken: any = this.jwtService.getJwtDecodedToken;
    if (jwtToken && jwtToken.user) {
      this.user = jwtToken.user;
    }
  }

  public get getUser(): any {
    if (
      this.jwtService.jwtHelperService.isTokenExpired(
        this.jwtService.getJwtToken
      )
    ) {
      this.signOut();
    } else {
      return this.user;
    }
  }

  public signOut() {
    this.jwtService.destroyJwtTokens();
    this.user = null;
  }
}
