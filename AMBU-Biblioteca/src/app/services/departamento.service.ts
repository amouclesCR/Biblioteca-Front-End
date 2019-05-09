import { Injectable } from '@angular/core';
import { Departamento } from '../interfaces/index';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  //  ATRIBUTOS
  private readonly url = "http://localhost:8000/api/"
  private readonly DEPARTAMENTO = "departamento/";

  constructor(
    private httpdepartamento: HttpClient
  ) { }

  // FUNCIONES

  Getdepartamentos() {
    return this.httpdepartamento.get<Departamento[]>(this.url + this.DEPARTAMENTO, { observe: 'response' });
  }

  Getdepartamento(id: number) {
    return this.httpdepartamento.get<Departamento>(this.url + this.DEPARTAMENTO + id, { observe: 'response' });
  }

  Updatedepartamento(departamento: Departamento): Observable<HttpResponse<Departamento>> {
    return this.httpdepartamento.put<Departamento>(this.url + this.DEPARTAMENTO + departamento.id, departamento, { observe: 'response' });
  }

  Postdepartamento(departamento: Departamento): Observable<HttpResponse<Departamento>> {
    return this.httpdepartamento.post<Departamento>(this.url + this.DEPARTAMENTO, departamento, { observe: 'response' });
  }
}
