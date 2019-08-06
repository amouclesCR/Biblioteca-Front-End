import { Injectable } from '@angular/core';
import { Solicitud } from '../interfaces/index';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  // ATRIBUTOS
  private readonly url = "http://localhost:8000/api/"
  private readonly SOLICITUD = "solicitud/"
  private readonly SOLICITUDBYUSUARIO = "solicitudbyusuario/"
  private readonly SOLICITUDNOAPROBADAS = "solicitudnoaprobadas/"
  private readonly SOLICITUDAPROBAR = "solicitudaprobar/"
  private readonly SOLICITUDRECHAZAR = "solicitudrechazar/"
  constructor(
    private httpsolicitud: HttpClient
  ) { }

  postSolicitud(solicitud: Solicitud): Observable<HttpResponse<Solicitud>>{
    return this.httpsolicitud.post<Solicitud>(environment.SERVERURL+this.SOLICITUD, solicitud, {observe: 'response'});
  }

  getSolicitudByUsuario(id: number): Observable<HttpResponse<Solicitud[]>>{
    return this.httpsolicitud.get<Solicitud[]>(environment.SERVERURL+this.SOLICITUD+this.SOLICITUDBYUSUARIO+id, {observe: 'response'});
  }

  getSolicitud(id: number): Observable<HttpResponse<Solicitud>>{
    return this.httpsolicitud.get<Solicitud>(environment.SERVERURL+this.SOLICITUD+id, {observe: 'response'});
  }

  getSolicitudesNoAprodadas(): Observable<HttpResponse<Solicitud[]>>{
    return this.httpsolicitud.get<Solicitud[]>(environment.SERVERURL+this.SOLICITUD+this.SOLICITUDNOAPROBADAS, {observe: 'response'});
  }

  aprobarSolicitud(id: number) {
    return this.httpsolicitud.put<Solicitud>(environment.SERVERURL+this.SOLICITUD+this.SOLICITUDAPROBAR+id, {observe: 'response'});
  }

  rechazarSolicitud(id: number) {
    return this.httpsolicitud.put<Solicitud>(environment.SERVERURL+this.SOLICITUD+this.SOLICITUDRECHAZAR+id, {observe: 'response'});
  }
}
