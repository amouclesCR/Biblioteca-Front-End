import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/interfaces/login';
@Injectable()
export class LoginService {

    // ATRIBUTOS
    private readonly url = "http://localhost:8000/api/login/"
 
    constructor(private httpLogin: HttpClient) { }
  
    // FUNCIONES
    Login(login: Login): Observable<HttpResponse<any>> {
      return this.httpLogin.post(this.url, login, {observe: 'response'});
    }
}
