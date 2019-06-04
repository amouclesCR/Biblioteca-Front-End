import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/index';
import {DataStorageService} from './dataStorage.service';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor(
      private dataStorage: DataStorageService
  ) { }

  //FUNCIONES
  get isAdmin() {
      let usuario = this.dataStorage.getObjectValue('USUARIO') as Usuario;
      return usuario.cus_rol_modelo.rol_rol == 'admin';
  }

}
