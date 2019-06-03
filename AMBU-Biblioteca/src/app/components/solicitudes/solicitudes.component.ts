import { Component, OnInit } from '@angular/core';
import { Solicitud } from '../../interfaces/index';
import { SolicitudService, AlertasService } from '../../services/index';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  //  ATRIBUTOS
  private listaSolicitudes: Solicitud[];
  private page = 1;
  private pageSize = 10;

  constructor(
    private solicitudServicio: SolicitudService,
    private alertas: AlertasService,
    private ngxService: NgxUiLoaderService
  ) { }

  //  FUNCIONES
  obtenerSolicitudes() {
    this.solicitudServicio.getSolicitudesNoAprodadas().subscribe(
      res => {
        this.listaSolicitudes = res.body;
        this.ngxService.stopLoader('load');
      },
      err => {
        this.ngxService.stopLoader('load');
        this.alertas.errorAlert("Ha ocurrido un error a la hora de cargar listas de solicitudes");
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
        this.alertas.errorAlert("Ha ocurrido un error a la hora de aprobar la sulicitud" + "\n" + err.error);
      }
    );
  }

  removerSolicitud(id: number) {
    let index = this.listaSolicitudes.findIndex(item => item.id == id);
    this.listaSolicitudes.splice(index, 1);
  }

  ngOnInit() {
    this.ngxService.startLoader('load');
    this.obtenerSolicitudes();
  }

}
