import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajesAlertasService {

  constructor() { }

  mensajeError(msj: String) {
    return msj == undefined ? "" : msj + " <br/>";
  }
  mensajeStatusCode(status: number, solicitud?: string) {
    let mensajeStatus: string;
    switch (status) {
      case 0: mensajeStatus = "No se puede conectar con el servidor";
        break;
      case 400: mensajeStatus = "La solicitud ha sido incorrecta";
        break;
      case 401: mensajeStatus = "No se cuenta con autorización";
        break;
      case 403: mensajeStatus = "El acceso esta prohibido";
        break;
      case 404: mensajeStatus = "No se pudo encontrar la solicitud";
        break;
      case 409: mensajeStatus = "Ha ocurrido un conflicto";
        break;
      case 500: mensajeStatus = "Ha ocurrido un error del lado del servidor";
        break;
      default: mensajeStatus = "Ha ocurrido un error, contacte con el administrador para más información. Código de error: " + status;
        break;
    }
    return mensajeStatus;
  }

}
