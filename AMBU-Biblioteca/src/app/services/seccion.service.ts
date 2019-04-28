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
}
