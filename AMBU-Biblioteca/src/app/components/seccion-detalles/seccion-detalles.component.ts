import { Component, OnInit } from '@angular/core';
import { ActivoService, SeccionService, AlertasService, MensajesAlertasService } from 'src/app/services/index';
import { Activo, Seccion } from '../../interfaces/index';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
@Component({
  selector: 'app-seccion-detalles',
  templateUrl: './seccion-detalles.component.html',
  styleUrls: ['./seccion-detalles.component.css']
})
export class SeccionDetallesComponent implements OnInit {

  // ATRIBUTOS
  public listaActivo: Activo[];
  public seccion: Seccion;
  public faEdit = faEdit;
  public faPlus = faPlus;
  public id: number;
  public vacio: boolean;
  public pag = 1;
  public pageSize = 5;

  constructor(
    private activoServicio: ActivoService,
    private seccionServicio: SeccionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private alertas: AlertasService,
    private mensajeAlertas: MensajesAlertasService,
  ) { }

  // FUNCIONES
  obtenerId() {
    this.id = +this.activatedRoute.snapshot.params['id'];
  }

  getSeccion() {
    this.seccionServicio.getSeccion(this.id).subscribe(
      res => {
        this.seccion = res.body;
        this.getActivosBySeccion();
      }, 
      err => {
        this.ngxService.stopLoader('load');
        this.alertas.errorAlert(
          this.mensajeAlertas.mensajeStatusCode(err.status)
        );
      }
    );
  }

  agregar() {
    this.router.navigate(['dashboard/activo-crear']);
  }

  editar(id: number) {
    this.router.navigate(['dashboard/activo-actualizar', id]);
  }

  getActivosBySeccion() {
    this.activoServicio.getActivosBySeccion(this.id).subscribe(
      res => {
        this.listaActivo = res.body;
        this.vacio = !(this.listaActivo.length > 0);
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

  ngOnInit() {
    this.listaActivo = [];
    this.ngxService.startLoader('load');
    this.obtenerId();
    this.getSeccion();
  }

}
