import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/index';

@Injectable({
  providedIn: 'root'
})
export class AutorizadoGuard implements CanActivate{
  path: ActivatedRouteSnapshot[];  route: ActivatedRouteSnapshot;

  constructor(
    private loginService: LoginService,
    private router: Router
    ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    return this.loginService.tieneRol(route.data.role)
    this.router.navigate(['account/login']);
    return false;
  } 
  
}
