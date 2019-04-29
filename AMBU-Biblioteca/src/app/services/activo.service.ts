import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Activo } from '../interfaces/activo';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ActivoService {
 // ATRIBUTOS
 private readonly url = "http://localhost:8000/api/"
  
 constructor(
   private httpSeccion: HttpClient
 ) { }

 // FUNCIONES
 GetActivosBySeccion(id: number): Observable<HttpResponse<Activo[]>>{
   return this.httpSeccion.get<Activo[]>(this.url+'activobyseccion/'+id, {observe: 'response'});
 }

 GetActivos() {
  return this.httpSeccion.get<Activo[]>(this.url+'activo/', {observe: 'response'});
 }

 GetActivo(id: number) {
  return this.httpSeccion.get<Activo>(this.url+'activo/'+id, {observe: 'response'});
 }
}
