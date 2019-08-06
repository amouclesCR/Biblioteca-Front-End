import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Seccion } from '../interfaces/index';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SeccionService {

  // ATRIBUTOS
  private readonly SECCION = "seccion/";
  
  constructor(
    private httpSeccion: HttpClient
  ) { }

  // FUNCIONES
  getSecciones(): Observable<HttpResponse<Seccion[]>>{
    return this.httpSeccion.get<Seccion[]>(environment.SERVERURL + this.SECCION, {observe: 'response'});
  }

  getSeccion(id: number): Observable<HttpResponse<Seccion>>{
    return this.httpSeccion.get<Seccion>(environment.SERVERURL + this.SECCION + id, {observe: 'response'});
  }

  updateSeccion(seccion: Seccion): Observable<HttpResponse<Seccion>>{
    return this.httpSeccion.put<Seccion>(environment.SERVERURL + this.SECCION + seccion.id, seccion, {observe: 'response'});
  }

  postSeccion(seccion: Seccion): Observable<HttpResponse<Seccion>>{
    return this.httpSeccion.post<Seccion>(environment.SERVERURL + this.SECCION, seccion, {observe: 'response'});
  }
}