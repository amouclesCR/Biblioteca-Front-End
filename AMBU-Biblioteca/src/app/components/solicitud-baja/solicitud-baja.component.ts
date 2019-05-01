import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../services/index';
@Component({
  selector: 'app-solicitud-baja',
  templateUrl: './solicitud-baja.component.html',
  styleUrls: ['./solicitud-baja.component.css']
})
export class SolicitudBajaComponent implements OnInit {

  constructor(
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit() {
    console.log(this.dataStorageService.getObjectValue("USUARIO"));
  }
}
