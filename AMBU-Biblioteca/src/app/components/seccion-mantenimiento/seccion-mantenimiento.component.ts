import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Seccion, Departamento } from '../../interfaces/index';
import {SeccionService, AlertasService, DepartamentoService, MensajesAlertasService} from '../../services/index';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
@Component({
  selector: 'app-seccion-mantenimiento',
  templateUrl: './seccion-mantenimiento.component.html',
  styleUrls: ['./seccion-mantenimiento.component.css']
})
export class SeccionMantenimientoComponent implements OnInit {

  // ATRIBUTOS
  public formGroupSeccion: FormGroup;
  public seccion: Seccion;
  public id: number;
  public btnMensaje: string;
  public isSubmit = false;
  public listaDepartamento: Departamento[];

  constructor(
    public formBuilderSeccion: FormBuilder,
    private seccionService: SeccionService,
    private activetedRouter: ActivatedRoute,
    private alertas: AlertasService, 
    private location: Location, 
    private ngxService: NgxUiLoaderService,
    private mensajeAlertas: MensajesAlertasService
  ) { }

  // FUNCIONES
  obtenerId() {
    this.id = +this.activetedRouter.snapshot.params['id'];
  }

  iniciarFormulario() {
    this.formGroupSeccion = this.formBuilderSeccion.group({
      nombre: ['', Validators.required]
    });
  }

  cargarValores() {
    this.fGControls['nombre'].setValue(this.seccion.sec_nombre);
  }

  obtenerSeccion() {
    this.seccionService.getSeccion(this.id).subscribe(
      res => {
        this.seccion = res.body;
        this.cargarValores();
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

  cargarComponente() {
    this.obtenerId();
    this.btnMensaje = this.id > 0 ? "Actualizar" : "Agregar";
    this.iniciarFormulario();
    if (this.id > 0) {
      this.obtenerSeccion();
    } else {
      this.ngxService.stopLoader('load');
    }
  }

  actualizarSeccion() {
    this.seccionService.updateSeccion(this.seccion).subscribe(
      res => {
        this.alertas.successInfoAlert("Sección actualizada correctamente");
        this.location.back();
      },
      err => {
        this.alertas.errorAlert("Ha ocurrido un problema durante la actualización de la sección. <br/>" +
        this.mensajeAlertas.mensajeError(err.error.sec_nombre)+
        this.mensajeAlertas.mensajeStatusCode(err.status));
      }
    );
  }

  crearSeccion() {
    this.seccionService.postSeccion(this.seccion).subscribe(
      res => {
        this.alertas.successInfoAlert("Sección creada correctamente");
        this.location.back();
      },
      err => {
        this.alertas.errorAlert("Ha ocurrido un problema durante la creación de la sección. <br/>" +
        this.mensajeAlertas.mensajeError(err.error.sec_nombre)+
        this.mensajeAlertas.mensajeStatusCode(err.status));
      }
    );
  }

  submit() {
    if (this.formGroupSeccion.valid) {
      if (!this.isSubmit) {
        this.isSubmit = true;
        this.seccion = {
          id: this.id,
          sec_nombre: this.fGControls['nombre'].value,
          sec_departamento_modelo: null
        }
        if (this.id > 0) {
          this.actualizarSeccion();
        } else {
          this.crearSeccion();
        }
      }
    }
  }

  get fGControls() {
    return this.formGroupSeccion.controls;
  }

  ngOnInit() {
    this.ngxService.startLoader('load');
    this.cargarComponente();
  }

}
