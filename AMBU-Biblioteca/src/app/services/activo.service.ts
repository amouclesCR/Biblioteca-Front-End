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
  getActivosBySeccion(id: number): Observable<HttpResponse<Activo[]>> {
    return this.httpactivo.get<Activo[]>(this.url + 'activobyseccion/' + id, { observe: 'response' });
  }

  getActivosByUsuario(id: number): Observable<HttpResponse<Activo[]>> {
    return this.httpactivo.get<Activo[]>(this.url + 'activobyusuario/' + id, { observe: 'response' });
  }

  getActivosByNumeroActivo(numeroActivo: string): Observable<HttpResponse<Activo>> {
    return this.httpactivo.get<Activo>(this.url + 'activobynumeroactivo/' + numeroActivo, { observe: 'response' });
  }

  getActivos() {
    return this.httpactivo.get<Activo[]>(this.url + this.ACTIVO, { observe: 'response' });
  }

  getActivo(id: number) {
    return this.httpactivo.get<Activo>(this.url + this.ACTIVO + id, { observe: 'response' });
  }

  updateActivo(activo: Activo): Observable<HttpResponse<Activo>> {
    return this.httpactivo.put<Activo>(this.url + this.ACTIVO + activo.id, activo, { observe: 'response' });
  }

  postActivo(activo: Activo): Observable<HttpResponse<Activo>> {
    return this.httpactivo.post<Activo>(this.url + this.ACTIVO, activo, { observe: 'response' });
  }
}
