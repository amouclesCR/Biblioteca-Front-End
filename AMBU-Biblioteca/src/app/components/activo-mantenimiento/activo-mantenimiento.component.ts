import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertasService } from '../../services/alertas.service';
import { Activo } from '../../interfaces/activo';
import { ActivoService } from '../../services/activo.service';
import { SeccionService } from '../../services/seccion.service';
import { ActivatedRoute } from '@angular/router';
import { Seccion } from 'src/app/interfaces/seccion';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
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
    private formBuilderActivo: FormBuilder
  ) { }

  // FUNCIONES
  ObtenerId() {
    this.id = +this.activetedRouter.snapshot.params['id'];
  }

  IniciarFormulario() {
    this.formGroupActivo = this.formBuilderActivo.group({
      descripcion: ['', Validators.required],
      observacion: ['', Validators.required],
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

  CargarValores() {
    this.FGControls['color'].setValue(this.activo.act_color);
    this.FGControls['costo'].setValue(this.activo.act_costo);
    this.FGControls['descripcion'].setValue(this.activo.act_descripcion);
    this.FGControls['estatus'].setValue(this.activo.act_estatus);
    this.FGControls['marca'].setValue(this.activo.act_marca);
    this.FGControls['modelo'].setValue(this.activo.act_modelo);
    this.FGControls['numero_activo'].setValue(this.activo.act_numero_activo);
    this.FGControls['observacion'].setValue(this.activo.act_observacion);
    this.FGControls['seccion'].setValue(this.activo.act_seccion);
    this.FGControls['serie'].setValue(this.activo.act_serie);
    this.FGControls['usuario_responsabe'].setValue(this.activo.act_usuario_responsabe);
  }

  ObtenerActivo() {
    this.activoService.GetActivo(this.id).subscribe(
      res => {
        this.activo = res.body;
        this.CargarValores();
      }
    );
  }

  GetSecciones() {
    this.seccionService.GetSecciones().subscribe(
      res => {
        this.listaSeccion = res.body;
      });
  }

  GetUsuarios() {
    this.usuarioService.GetUsuarios().subscribe(
      res => {
        this.listaUsuario = res.body;
      });
  }

  CargarComponente() {
    this.ObtenerId();
    this.btnMensaje = this.id > 0 ? "Actualizar" : "Agregar";
    this.GetSecciones();
    this.GetUsuarios();
    this.IniciarFormulario();
    if (this.id > 0) {
      this.ObtenerActivo();
    }
  }

  ActualizarActivo() {
    this.activoService.UpdateActivo(this.activo).subscribe(
      res => {
        this.alertas.successInfoAlert("Activo actualizada correctamente");
      },
      err => {
        this.alertas.errorAlert("Ha ocurrido un problema durante la actualización del activo." +
          " Por favor, contacte con el administrador. Status Code: " + err.status);
      }
    );
  }

  CrearActivo() {
    this.activoService.PostActivo(this.activo).subscribe(
      res => {
        this.alertas.successInfoAlert("Activo creada correctamente");
      },
      err => {
        this.alertas.errorAlert("Ha ocurrido un problema durante la creación del activo." +
          " Por favor, contacte con el administrador. Status Code: " + err.status);
      }
    );
  }

  Submit() {
    if (this.formGroupActivo.valid) {
      if (!this.isSubmit) {
        this.isSubmit = true;
        this.activo = {
          id: this.id,
          act_color: this.FGControls['color'].value,
          act_descripcion: this.FGControls['descripcion'].value,
          act_costo : this.FGControls['costo'].value,
          act_estatus: this.FGControls['estatus'].value,
          act_marca: this.FGControls['marca'].value,
          act_modelo: this.FGControls['modelo'].value,
          act_numero_activo: this.FGControls['numero_activo'].value,
          act_observacion: this.FGControls['observacion'].value,
          act_seccion: this.FGControls['seccion'].value,
          act_serie: this.FGControls['serie'].value,
          act_usuario_responsabe: this.FGControls['usuario_responsabe'].value,
          act_seccion_modelo: null,
          act_usuario: null
        }
        if (this.id > 0) {
          this.ActualizarActivo();
        } else {
          this.CrearActivo();
        }
      }
    }
  }

  get FGControls() {
    return this.formGroupActivo.controls;
  }
  ngOnInit() {
    this.CargarComponente();
  }

}
