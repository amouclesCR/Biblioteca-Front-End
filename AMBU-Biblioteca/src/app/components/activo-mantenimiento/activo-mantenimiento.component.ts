import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService, SeccionService, ActivoService, AlertasService, MensajesAlertasService } from 'src/app/services/index';
import { Usuario, Activo, Seccion } from 'src/app/interfaces/index';
import { Location } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
@Component({
  selector: 'app-activo-mantenimiento',
  templateUrl: './activo-mantenimiento.component.html',
  styleUrls: ['./activo-mantenimiento.component.css']
})
export class ActivoMantenimientoComponent implements OnInit {

  // ATRIBUTOS
  private formGroupActivo: FormGroup;
  private activo: Activo;
  private listaSeccion: Seccion[];
  private listaUsuario: Usuario[];
  private id: number;
  private btnMensaje: string;
  private isSubmit = false;

  constructor(
    private activoService: ActivoService,
    private alertas: AlertasService,
    private activetedRouter: ActivatedRoute,
    private seccionService: SeccionService,
    private usuarioService: UsuarioService,
    private formBuilderActivo: FormBuilder,
    private location: Location,
    private ngxService: NgxUiLoaderService,
    private mensajeAlertas: MensajesAlertasService
  ) { }

  // FUNCIONES
  obtenerId() {
    this.id = +this.activetedRouter.snapshot.params['id'];
  }

  iniciarFormulario() {
    this.formGroupActivo = this.formBuilderActivo.group({
      descripcion: ['', Validators.required],
      observacion: [''],
      numero_activo: ['', Validators.required],
      color: ['', Validators.required],
      serie: ['', Validators.required],
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      estatus: [false],
      costo: ['', Validators.required],
      usuario_responsabe: ['', Validators.required],
      seccion: ['', Validators.required],
    });
  }

  cargarValores() {
    this.fGControls['color'].setValue(this.activo.act_color);
    this.fGControls['costo'].setValue(this.activo.act_costo);
    this.fGControls['descripcion'].setValue(this.activo.act_descripcion);
    this.fGControls['estatus'].setValue(this.activo.act_estatus);
    this.fGControls['marca'].setValue(this.activo.act_marca);
    this.fGControls['modelo'].setValue(this.activo.act_modelo);
    this.fGControls['numero_activo'].setValue(this.activo.act_numero_activo);
    this.fGControls['observacion'].setValue(this.activo.act_observacion);
    this.fGControls['seccion'].setValue(this.activo.act_seccion);
    this.fGControls['serie'].setValue(this.activo.act_serie);
    this.fGControls['usuario_responsabe'].setValue(this.activo.act_usuario_responsabe);
  }

  obtenerActivo() {
    this.activoService.getActivo(this.id).subscribe(
      res => {
        this.activo = res.body;
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

  getSecciones() {
    this.seccionService.getSecciones().subscribe(
      res => {
        this.listaSeccion = res.body;
        this.getUsuarios();
      },
      err => {
        this.ngxService.stopLoader('load');
        this.alertas.errorAlert(
          this.mensajeAlertas.mensajeStatusCode(err.status)
        );
      });
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      res => {
        this.listaUsuario = res.body;
        this.ngxService.stopLoader('load');
      },
      err => {
        this.ngxService.stopLoader('load');
        this.alertas.errorAlert(
          this.mensajeAlertas.mensajeStatusCode(err.status)
        );
      });
  }

  cargarComponente() {
    this.obtenerId();
    this.btnMensaje = this.id > 0 ? "Actualizar" : "Agregar";
    this.getSecciones();
    this.iniciarFormulario();
    if (this.id > 0) {
      this.obtenerActivo();
    }
  }

  actualizarActivo() {
    this.activoService.updateActivo(this.activo).subscribe(
      res => {
        this.alertas.successInfoAlert("Activo actualizada correctamente");
        this.location.back();
      },
      err => {
        this.alertas.errorAlert("Ha ocurrido un problema durante la actualización del activo. <br/>" +
        this.mensajeAlertas.mensajeError(err.error.act_numero_activo) +
        this.mensajeAlertas.mensajeStatusCode(err.status));
      }
    );
  }

  crearActivo() {
    this.activoService.postActivo(this.activo).subscribe(
      res => {
        this.alertas.successInfoAlert("Activo creada correctamente");
        this.location.back();
      },
      err => {
        this.alertas.errorAlert("Ha ocurrido un problema durante la creación del activo. <br/>" +
        this.mensajeAlertas.mensajeError(err.error.act_numero_activo) +
        this.mensajeAlertas.mensajeStatusCode(err.status));
      }
    );
  }

  submit() {
    if (this.formGroupActivo.valid) {
      if (!this.isSubmit) {
        this.isSubmit = true;
        this.activo = {
          id: this.id,
          act_color: this.fGControls['color'].value,
          act_descripcion: this.fGControls['descripcion'].value,
          act_costo : this.fGControls['costo'].value,
          act_estatus: this.fGControls['estatus'].value,
          act_marca: this.fGControls['marca'].value,
          act_modelo: this.fGControls['modelo'].value,
          act_numero_activo: this.fGControls['numero_activo'].value,
          act_observacion: this.fGControls['observacion'].value,
          act_seccion: this.fGControls['seccion'].value,
          act_serie: this.fGControls['serie'].value,
          act_usuario_responsabe: this.fGControls['usuario_responsabe'].value,
          act_seccion_modelo: null,
          act_usuario: null
        }
        if (this.id > 0) {
          this.actualizarActivo();
        } else {
          this.crearActivo();
        }
      }
    }
  }

  get fGControls() {
    return this.formGroupActivo.controls;
  }
  ngOnInit() {
    this.ngxService.startLoader('load');
    this.cargarComponente();
  }

}
