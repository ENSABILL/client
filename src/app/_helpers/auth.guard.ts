import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { UserType } from '../auth/models/user.model';
import { AlertService } from '../shared/services/alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      if (this.authService.isTokenExpired()) {
        this.authService.logout();
        this.router.navigate(['/', 'auth', 'login']);
        return false;
      }
      if (currentUser.userType !== UserType.CLIENT) {
        console.log('not client');
        this.authService.logout();
        this.router.navigate(['/', 'auth', 'login']);
        this.alertService.error('you are not a client !', {
          keepAfterRouteChange: true,
          autoClose: true,
        });
        return false;
      }
      if (currentUser.firstLogin) {
        this.router.navigate(['/', 'auth', 'otp']);
        return false;
      }
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/', 'auth', 'login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
