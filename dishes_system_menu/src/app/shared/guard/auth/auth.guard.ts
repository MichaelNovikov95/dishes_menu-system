import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../../auth/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  public canActivate(): boolean {
    const isAuthorized = this.authService.isAuthorized();

    if (!isAuthorized) {
      this.router.navigate(['/auth/login']);
      return false;
    } else {
      return true;
    }
  }
}
