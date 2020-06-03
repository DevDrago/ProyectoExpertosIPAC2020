import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';


@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const tipoUsuario = route.data.tipoUsuario;
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);

    if (!this.auth.isAuthenticated())
    {
      this.router.navigate(['login']);
      return false;
    }
    else {
      if(tokenPayload.type !== tipoUsuario) {
        this.router.navigate(['401']);
        return false;
      }
      return true;
    }
  }

}
