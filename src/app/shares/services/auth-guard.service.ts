import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    console.log('AuthGuardService');
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login'], { queryParams: { returnUrl: 'state.url' } });
      return false;
    }
    return true;
  }
}
