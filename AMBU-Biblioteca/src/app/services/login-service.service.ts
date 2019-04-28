import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  // ATRIBUTOS
  private readonly url = "http://localhost:8000/api/login/"
 
  constructor(private httpLogin: HttpClient) { }

  // FUNCIONES
  Login(usname: string, cla: string): Observable<HttpResponse<any>> {
    return this.httpLogin.post(this.url, {'usu_nombre_usuario': usname, 'usu_clave': cla}, {observe: 'response'});
  }
}
