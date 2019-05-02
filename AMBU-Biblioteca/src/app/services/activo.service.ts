import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Activo } from '../interfaces/index';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ActivoService {
  // ATRIBUTOS
  private readonly url = "http://localhost:8000/api/"
  private readonly ACTIVO = "activo/";

  constructor(
    private httpactivo: HttpClient
  ) { }

  // FUNCIONES
  GetActivosBySeccion(id: number): Observable<HttpResponse<Activo[]>> {
    return this.httpactivo.get<Activo[]>(this.url + 'activobyseccion/' + id, { observe: 'response' });
  }

  GetActivosByUsuario(id: number): Observable<HttpResponse<Activo[]>> {
    return this.httpactivo.get<Activo[]>(this.url + 'activobyusuario/' + id, { observe: 'response' });
  }

  GetActivos() {
    return this.httpactivo.get<Activo[]>(this.url + this.ACTIVO, { observe: 'response' });
  }

  GetActivo(id: number) {
    return this.httpactivo.get<Activo>(this.url + this.ACTIVO + id, { observe: 'response' });
  }

  UpdateActivo(activo: Activo): Observable<HttpResponse<Activo>> {
    return this.httpactivo.put<Activo>(this.url + this.ACTIVO + activo.id, activo, { observe: 'response' });
  }

  PostActivo(activo: Activo): Observable<HttpResponse<Activo>> {
    return this.httpactivo.post<Activo>(this.url + this.ACTIVO, activo, { observe: 'response' });
  }
}
