import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/index';
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
    Login(login: Login): Observable<HttpResponse<any>> {
      return this.httpLogin.post(this.url, login, {observe: 'response'});
    }

    logout() {
      this.dataStorage.setObjectValue("USUARIO", null);
      this.router.navigate(["login"]);
    }
}
