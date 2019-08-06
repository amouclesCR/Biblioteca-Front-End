import { Component, OnInit } from '@angular/core';
import { Solicitud } from '../../interfaces/index';
import { SolicitudService, AlertasService, MensajesAlertasService } from '../../services/index';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { Router } from '@angular/router';
@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  //  ATRIBUTOS
  public listaSolicitudes: Solicitud[];
  public page = 1;
  public pageSize = 10;

  constructor(
    private solicitudServicio: SolicitudService,
    private alertas: AlertasService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private mensajeAlertas: MensajesAlertasService
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
        this.alertas.errorAlert("Ha ocurrido un error a la hora de cargar listas de solicitudes"+
        this.mensajeAlertas.mensajeStatusCode(err.status));
      }
    );
  }

  aprobarSolicitud(id: number) {
    this.solicitudServicio.aprobarSolicitud(id).subscribe(
      res => {
        this.removerSolicitud(id);
        this.ngxService.stopLoader('load');
        this.alertas.successInfoAlert("Solicitud aprobada exitosamente");
      },
      err => {
        this.ngxService.stopLoader('load');
        this.alertas.errorAlert("Ha ocurrido un error a la hora de aprobar la sulicitud" + "<br/>" + 
        this.mensajeAlertas.mensajeStatusCode(err.status));
      }
    );
  }

  rechazarSolicitud(id: number) {
    this.solicitudServicio.rechazarSolicitud(id).subscribe(
      res => {
        this.removerSolicitud(id);
        this.ngxService.stopLoader('load');
        this.alertas.successInfoAlert("Solicitud rechazada exitosamente");
      },
      err => {
        this.alertas.errorAlert("Ha ocurrido un error a la hora de aprobar la sulicitud" + "<br/>" + 
        this.mensajeAlertas.mensajeStatusCode(err.status));
      }
    );
  }

  verSolicitud(id: number) {
    this.router.navigate(['dashboard/visualizar-pdf', id]);
  }

  removerSolicitud(id: number) {
    let index = this.listaSolicitudes.findIndex(item => item.id == id);
    this.listaSolicitudes.splice(index, 1);
  }
  get solicitudes() {
    return this.listaSolicitudes.length > 0;
  }

  ngOnInit() {
    this.ngxService.startLoader('load');
    this.listaSolicitudes = [];
    this.obtenerSolicitudes();
  }

}
