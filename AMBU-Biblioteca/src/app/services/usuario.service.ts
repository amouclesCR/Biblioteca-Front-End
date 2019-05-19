import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Usuario } from '../interfaces/index';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

  export class UsuarioService {

    // ATRIBUTOS
    private readonly url = "http://localhost:8000/api/usuario/"
    
    constructor(
      private httpUsuario: HttpClient
    ) { }
  
    // FUNCIONES
    getUsuarios(): Observable<HttpResponse<Usuario[]>>{
      return this.httpUsuario.get<Usuario[]>(this.url, {observe: 'response'});
    }
  
    getUsuario(id: number): Observable<HttpResponse<Usuario>>{
      return this.httpUsuario.get<Usuario>(this.url+id, {observe: 'response'});
    }
  
    updateUsuario(usuario: Usuario): Observable<HttpResponse<Usuario>>{
      return this.httpUsuario.put<Usuario>(this.url+usuario.id, usuario, {observe: 'response'});
    }
  
    postUsuario(usuario: Usuario): Observable<HttpResponse<Usuario>>{
      return this.httpUsuario.post<Usuario>(this.url, usuario, {observe: 'response'});
    }
  }