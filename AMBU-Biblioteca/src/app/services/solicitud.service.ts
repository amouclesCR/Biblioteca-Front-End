import { Injectable } from '@angular/core';
import { Solicitud } from '../interfaces/index';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  // ATRIBUTOS
  private readonly url = "http://localhost:8000/api/solicitud/"
  constructor(
    private httpsolicitud: HttpClient
  ) { }

  postsolicitud(solicitud: Solicitud): Observable<HttpResponse<Solicitud>>{
    return this.httpsolicitud.post<Solicitud>(this.url, solicitud, {observe: 'response'});
  }
}
