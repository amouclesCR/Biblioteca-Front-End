import { Injectable } from '@angular/core';
import { Solicitud } from '../interfaces/index';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  // ATRIBUTOS
  private readonly url = "http://localhost:8000/api/"
  private readonly SUBURL = "solicitud/"
  private readonly SUBURLBYUSUARIO = "solicitudbyusuario/"
  constructor(
    private httpsolicitud: HttpClient
  ) { }

  postSolicitud(solicitud: Solicitud): Observable<HttpResponse<Solicitud>>{
    return this.httpsolicitud.post<Solicitud>(this.url+this.SUBURL, solicitud, {observe: 'response'});
  }

  getSolicitudByUsuario(id: number): Observable<HttpResponse<Solicitud[]>>{
    return this.httpsolicitud.get<Solicitud[]>(this.url+this.SUBURLBYUSUARIO+id, {observe: 'response'});
  }

  getSolicitud(id: number): Observable<HttpResponse<Solicitud>>{
    return this.httpsolicitud.get<Solicitud>(this.url+this.SUBURL+id, {observe: 'response'});
  }

}
