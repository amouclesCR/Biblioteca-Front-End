import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Activo } from '../interfaces/activo';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ActivoService {
 // ATRIBUTOS
 private readonly url = "http://localhost:8000/api/activobyseccion/"
  
 constructor(
   private httpSeccion: HttpClient
 ) { }

 // FUNCIONES
 GetActivos(id: number): Observable<HttpResponse<Activo[]>>{
   return this.httpSeccion.get<Activo[]>(this.url+id, {observe: 'response'});
 }
}
