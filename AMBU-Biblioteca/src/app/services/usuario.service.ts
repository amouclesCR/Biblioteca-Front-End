import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Usuario } from '../interfaces/index';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: 'root'
  })

  export class UsuarioService {

    // ATRIBUTOS
    private readonly url = "http://localhost:8000/api/usuario/"
    private readonly USUARIO = "usuario/";
    private readonly REGISTER = "register/";
    
    constructor(
      private httpUsuario: HttpClient
    ) { }
  
    // FUNCIONES
    getUsuarios(): Observable<HttpResponse<Usuario[]>>{
      return this.httpUsuario.get<Usuario[]>(environment.SERVERURL+this.USUARIO, {observe: 'response'});
    }
  
    getUsuario(id: number): Observable<HttpResponse<Usuario>>{
      return this.httpUsuario.get<Usuario>(environment.SERVERURL+this.USUARIO+id, {observe: 'response'});
    }
  
    updateUsuario(usuario: Usuario): Observable<HttpResponse<Usuario>>{
      return this.httpUsuario.put<Usuario>(environment.SERVERURL+this.USUARIO+usuario.id, usuario, {observe: 'response'});
    }
  
    postUsuario(usuario: Usuario): Observable<HttpResponse<Usuario>>{
      return this.httpUsuario.post<Usuario>(environment.SERVERURL+this.REGISTER, usuario, {observe: 'response'});
    }
  }