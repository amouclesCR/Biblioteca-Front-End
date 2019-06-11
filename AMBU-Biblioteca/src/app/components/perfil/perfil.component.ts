import { Component, OnInit } from '@angular/core';
import { DataStorageService, ActivoService, SolicitudService, MensajesAlertasService, AlertasService } from 'src/app/services/index';
import { Usuario, Activo, Solicitud } from 'src/app/interfaces/index';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  // ATRIBUTOS
  private usuario: Usuario
  private listaActivos: Activo[];
  private listaSolicitudes: Solicitud[];
  private pageActivos = 1;
  private pageSolicitudes = 1;
  private pageSize = 10;
  constructor(
    private dataSoterage: DataStorageService,
    private activoServicio: ActivoService, 
    private solicitudServicio: SolicitudService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private mensajeAlertas: MensajesAlertasService,
    private alertas: AlertasService,
  ) { }

  // FUNCIONES
  getActivos(){
    this.activoServicio.getActivosByUsuario(this.usuario.id).subscribe(
      res => {
        this.listaActivos = res.body.filter(item => item.act_estatus);
        this.ngxService.stopLoader('load');
      },
      err => {
        this.ngxService.stopLoader('load');
        this.alertas.errorAlert(
          this.mensajeAlertas.mensajeStatusCode(err.status)
        );
      }
    );
  }

  editarPerfil() {
    this.router.navigate(['dashboard/perfil-editar']);
  }

  obtenerSolicitudes() {
    this.solicitudServicio.getSolicitudByUsuario(this.usuario.id).subscribe(
      res => {
        this.listaSolicitudes = res.body;
        this.getActivos();
      },
      err => {
        this.ngxService.stopLoader('load');
        this.alertas.errorAlert(
          this.mensajeAlertas.mensajeStatusCode(err.status)
        );
      }
    );
  }

  verSolicitud(id: number) {
    this.router.navigate(['dashboard/visualizar-pdf', id]);
  }

  get solicitudes() {
    return this.listaSolicitudes.length > 0;
  }

  get activos() {
    return this.listaActivos.length > 0;
  }

  ngOnInit() {
    this.listaActivos = [];
    this.listaSolicitudes = [];
    this.ngxService.startLoader('load');
    this.usuario = this.dataSoterage.getObjectValue("USUARIO");
    this.obtenerSolicitudes();
  }

}
