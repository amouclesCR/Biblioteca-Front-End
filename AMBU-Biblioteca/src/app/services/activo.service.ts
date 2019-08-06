import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Activo, Usuario } from '../interfaces/index';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DataStorageService } from './dataStorage.service';
@Injectable({
  providedIn: 'root'
})
export class ActivoService {
  // ATRIBUTOS
  private readonly ACTIVO = "activo/";
  private readonly ACTIVOBYUSUARIO = "activobyusuario/";
  private readonly ACTIVOBYNUMEROACTIVO = "activobynumeroactivo/";
  private readonly ACTIVOBYSECCION = "activobyseccion/";

  constructor(
    private httpactivo: HttpClient,
    private dataStorage: DataStorageService
  ) { }

  // FUNCIONES
  getActivosBySeccion(id: number): Observable<HttpResponse<Activo[]>> {
    return this.httpactivo.get<Activo[]>(environment.SERVERURL + this.ACTIVO + this.ACTIVOBYSECCION + id, { observe: 'response' });
  }

  getActivosByUsuario(id: number): Observable<HttpResponse<Activo[]>> {
    return this.httpactivo.get<Activo[]>(environment.SERVERURL + this.ACTIVO + this.ACTIVOBYUSUARIO + id, { observe: 'response' });
  }

  getActivosByNumeroActivo(numeroActivo: string): Observable<HttpResponse<Activo>> {
    return this.httpactivo.get<Activo>(environment.SERVERURL + this.ACTIVO + this.ACTIVOBYNUMEROACTIVO + numeroActivo, { observe: 'response' });
  }

  getActivos() {
    return this.httpactivo.get<Activo[]>(environment.SERVERURL + this.ACTIVO, { observe: 'response'});
  }

  getActivo(id: number) {
    return this.httpactivo.get<Activo>(environment.SERVERURL + this.ACTIVO + id, { observe: 'response' });
  }

  updateActivo(activo: Activo): Observable<HttpResponse<Activo>> {
    return this.httpactivo.put<Activo>(environment.SERVERURL + this.ACTIVO + activo.id, activo, { observe: 'response' });
  }

  postActivo(activo: Activo): Observable<HttpResponse<Activo>> {
    return this.httpactivo.post<Activo>(environment.SERVERURL + this.ACTIVO, activo, { observe: 'response' });
  }
}
