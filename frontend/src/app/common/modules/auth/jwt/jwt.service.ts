import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { LocalStorageService } from 'src/app/core/local-storage/local.storage.service';
import { LocalStorageKey } from 'src/app/core/local-storage/local.storage.key';
import { IJwtDTO } from 'src/shared/modules/auth/jwt.dto';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private jwtTokenDecoded: IJwtDTO = null;

  constructor(
    private readonly localStorageService: LocalStorageService,
    public readonly jwtHelperService: JwtHelperService
  ) {}

  public setJwtToken(value: string) {
    this.localStorageService.setItem(LocalStorageKey.JWT, value);
    if (3 === value.split('.').length) {
      this.jwtTokenDecoded = this.jwtHelperService.decodeToken(value);
    }
  }

  public get getJwtToken(): string {
    return this.localStorageService.getItem(LocalStorageKey.JWT);
  }

  public get getJwtDecodedToken() {
    const jwtToken: string = this.localStorageService.getItem(
      LocalStorageKey.JWT
    );
    if (!this.jwtTokenDecoded && jwtToken) {
      this.jwtTokenDecoded = this.jwtHelperService.decodeToken(jwtToken);
    }
    return this.jwtTokenDecoded;
  }

  public destroyJwtTokens() {
    this.jwtTokenDecoded = null;
    this.localStorageService.removeItem(LocalStorageKey.JWT);
  }
}
