import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajesAlertasService {

  constructor() { }

  mensajeError(msj: String) {
    return msj==undefined? "" : msj+" <br/>";
  }
  
}
