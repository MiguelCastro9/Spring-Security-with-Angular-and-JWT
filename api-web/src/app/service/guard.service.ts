import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  realRole!: string;

  constructor(private tokenService: TokenService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const expectedRole = route.data['expectedRole'];

    if (this.tokenService.isAdmin()) {
      this.realRole = 'admin';
    }
    if (this.tokenService.isRead()) {
      this.realRole = 'read';
    }

    //Throws - não achou o token
    if (!this.tokenService.isLogged() || expectedRole.indexOf(this.realRole) < 0) {

      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
