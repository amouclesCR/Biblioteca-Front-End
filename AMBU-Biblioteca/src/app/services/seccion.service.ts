import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Seccion } from '../interfaces/seccion';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SeccionService {

  // ATRIBUTOS
  private readonly url = "http://localhost:8000/api/seccion/"
  
  constructor(
    private httpSeccion: HttpClient
  ) { }

  // FUNCIONES
  GetSecciones(): Observable<HttpResponse<Seccion[]>>{
    return this.httpSeccion.get<Seccion[]>(this.url, {observe: 'response'});
  }

  GetSeccion(id: number): Observable<HttpResponse<Seccion>>{
    return this.httpSeccion.get<Seccion>(this.url+id, {observe: 'response'});
  }

  UpdateSeccion(seccion: Seccion): Observable<HttpResponse<Seccion>>{
    return this.httpSeccion.put<Seccion>(this.url+seccion.id, seccion, {observe: 'response'});
  }

  PostSeccion(seccion: Seccion): Observable<HttpResponse<Seccion>>{
    return this.httpSeccion.post<Seccion>(this.url, seccion, {observe: 'response'});
  }
}
