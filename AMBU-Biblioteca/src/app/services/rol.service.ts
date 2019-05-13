import { Injectable } from '@angular/core';
import { Rol } from '../interfaces/index';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  //  ATRIBUTOS
  private readonly url = "http://localhost:8000/api/"
  private readonly ROL = "rol/";

  constructor(
    private httprol: HttpClient
  ) { }

  // FUNCIONES

  getRol() {
    return this.httprol.get<Rol[]>(this.url + this.ROL, { observe: 'response' });
  }
}
