import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login, Rol, Usuario } from '../interfaces/index';
import { DataStorageService } from './dataStorage.service';
import { Router } from '@angular/router';
@Injectable()
export class LoginService {

    // ATRIBUTOS
    private readonly url = "http://localhost:8000/api/login/"
 
    constructor(
      private httpLogin: HttpClient,
      private dataStorage: DataStorageService,
      private router: Router
      ) { }
  
    // FUNCIONES
    login(login: Login): Observable<HttpResponse<any>> {
      return this.httpLogin.post(this.url, login, {observe: 'response'});
    }

    logout() {
      this.dataStorage.setObjectValue("USUARIO", null);
      this.router.navigate(["account/login"]);
    }

    usuarioLogeado() {
      let usuario = this.dataStorage.getObjectValue("USUARIO");
      return usuario==null? false : true;
    }

    tieneRol(roles: string[]) {
      let isRol = false;
      let usuario = this.dataStorage.getObjectValue("USUARIO") as Usuario;
      roles.forEach(item => {
        if (usuario.cus_rol_modelo.rol_rol == item) {
          isRol = true;
        }  
      });
      return isRol;
    }
}
