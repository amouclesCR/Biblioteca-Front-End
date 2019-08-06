import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/index';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecoveryService {

  //ATRIBUTOS
  private readonly url = "http://localhost:8000/api/"
  private readonly RECOVERY = "recovery/";

  constructor(
    private httpRecovery: HttpClient
  ) { }

  //FUNCIONES
  cambiarContraseña(usuario: Usuario) {
    return this.httpRecovery.post<Usuario>(this.url+this.RECOVERY, usuario, {observe: 'response'})
  }

}
