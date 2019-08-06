import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login, Usuario } from '../interfaces/index';
import { DataStorageService } from './dataStorage.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable()
export class LoginService {

    // ATRIBUTOS
    private readonly LOGIN = "login/"
 
    constructor(
      private httpLogin: HttpClient,
      private dataStorage: DataStorageService,
      private router: Router
      ) { }
  
    // FUNCIONES
    login(login: Login): Observable<HttpResponse<any>> {
      return this.httpLogin.post(environment.SERVERURL + this.LOGIN, login, {observe: 'response'});
    }

    logout() {
      this.dataStorage.setObjectValue(environment.USUARIO, null);
      this.router.navigate(["account/login"]);
    }

    usuarioLogeado() {
      let usuario = this.dataStorage.getObjectValue(environment.USUARIO);
      return usuario==null? false : true;
    }

    tieneRol(roles: string[]) {
      let isRol = false;
      let usuario = this.dataStorage.getObjectValue(environment.USUARIO) as Usuario;
      if (usuario == null || usuario == undefined) {
        return false;
      }
      roles.forEach(item => {
        if (usuario.cus_rol_modelo.rol_rol == item) {
          isRol = true;
        }  
      });
      return isRol;
    }
}
