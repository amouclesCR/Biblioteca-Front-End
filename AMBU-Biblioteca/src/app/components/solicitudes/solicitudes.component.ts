import { Component, OnInit } from '@angular/core';
import { Solicitud } from '../../interfaces/index';
import { SolicitudService, AlertasService } from '../../services/index';
@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  //  ATRIBUTOS
  private listaSolicitudes: Solicitud[];

  constructor(
    private solicitudServicio: SolicitudService,
    private alertas: AlertasService
  ) { }

  //  FUNCIONES
  obtenerSolicitudes() {
    this.solicitudServicio.getSolicitudesNoAprodadas().subscribe(
      res => {
        this.listaSolicitudes = res.body;
      },
      err => {
        this.alertas.errorInfoAlert("Ha ocurrido un error a la hora de cargar listas de solicitudes");
      }
    );
  }

  aprobarSolicitud(id: number) {
    this.solicitudServicio.aprobarSolicitud(id).subscribe(
      res => {
        this.removerSolicitud(id);
        this.alertas.successInfoAlert("Solicitud aprobada exitosamente");
      },
      err => {
        this.alertas.errorInfoAlert("Ha ocurrido un error a la hora de aprobar la sulicitud");
      }
    );
  }

  removerSolicitud(id: number) {
    let index = this.listaSolicitudes.findIndex(item => item.id == id);
    this.listaSolicitudes.splice(index, 1);
  }

  ngOnInit() {
    this.obtenerSolicitudes();
  }

}
