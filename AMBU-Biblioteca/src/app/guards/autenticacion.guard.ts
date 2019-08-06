import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { LoginService } from '../services/index';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate{
  path: ActivatedRouteSnapshot[];  route: ActivatedRouteSnapshot;

  constructor(
    private loginService: LoginService,
    private router: Router
    ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loginService.usuarioLogeado()) {
      return true;
      //return this.loginService.tieneRol(route.data.role)
    }
    this.router.navigate(['account/login']);
    return false;
  } 
  
}
