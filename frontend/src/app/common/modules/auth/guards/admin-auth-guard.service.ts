import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from '../auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authService.getUser) {
      this.router.navigate(['']);
      return false;
    } else if (!this.authService.getUser.admin) {
      return false;
    } else {
      return true;
    }
  }
}
