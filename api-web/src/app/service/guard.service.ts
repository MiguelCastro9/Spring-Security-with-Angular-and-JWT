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
    const roles = this.tokenService.getAuthorities();

    roles.forEach(dados => {
      if (dados == 'ROLE_ADMIN') {
        this.realRole = 'admin';
      }
      if (dados == 'ROLE_GESTOR') {
        this.realRole = 'gestor';
      }
      if (dados == 'ROLE_CRIADOR') {
        this.realRole = 'criador';
      }
      if (dados == 'ROLE_EDITOR') {
        this.realRole = 'editor';
      }
    });

    //Throws - não achou o token
    if (!this.tokenService.getToken() || expectedRole.indexOf(this.realRole) === -1) {

      this.router.navigate(['/login']);
    }

    return true;
  }
}
