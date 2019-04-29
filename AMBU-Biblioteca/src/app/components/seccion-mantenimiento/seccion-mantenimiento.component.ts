import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Seccion } from '../../interfaces/seccion';
import { SeccionService } from '../../services/seccion.service';
import { AlertasService } from '../../services/alertas.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-seccion-mantenimiento',
  templateUrl: './seccion-mantenimiento.component.html',
  styleUrls: ['./seccion-mantenimiento.component.css']
})
export class SeccionMantenimientoComponent implements OnInit {

  // ATRIBUTOS
  private formGroupSeccion: FormGroup;
  private seccion: Seccion;
  private id: number;
  private btnMensaje: string;
  private isSubmit = false;

  constructor(
    private formBuilderSeccion: FormBuilder,
    private seccionService: SeccionService,
    private activetedRouter: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  // FUNCIONES
  ObtenerId() {
    this.id = +this.activetedRouter.snapshot.params['id'];
  }

  IniciarFormulario() {
    this.formGroupSeccion = this.formBuilderSeccion.group({
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required]
    });
  }

  CargarValores() {
    this.FGControls['nombre'].setValue(this.seccion.sec_nombre);
    this.FGControls['ubicacion'].setValue(this.seccion.sec_ubicacion);
  }

  ObtenerSeccion() {
    this.seccionService.GetSeccion(this.id).subscribe(
      res => {
        this.seccion = res.body;
        this.CargarValores();
      }
    );
  }

  CargarComponente() {
    this.ObtenerId();
    this.btnMensaje = this.id > 0 ? "Actualizar" : "Agregar";
    this.IniciarFormulario();
    if (this.id > 0) {
      this.ObtenerSeccion();
    }
  }

  ActualizarSeccion() {
    this.seccionService.UpdateSeccion(this.seccion).subscribe(
      res => {
        this.alertas.successInfoAlert("Sección actualizada correctamente");
      },
      err => {
        this.alertas.errorAlert("Ha ocurrido un problema durante la actualización de la sección." +
          " Por favor, contacte con el administrador. Status Code: " + err.status);
      }
    );
  }

  CrearSeccion() {
    this.seccionService.PostSeccion(this.seccion).subscribe(
      res => {
        this.alertas.successInfoAlert("Sección creada correctamente");
      },
      err => {
        this.alertas.errorAlert("Ha ocurrido un problema durante la creación de la sección." +
          " Por favor, contacte con el administrador. Status Code: " + err.status);
      }
    );
  }

  Submit() {
    if (this.formGroupSeccion.valid) {
      if (!this.isSubmit) {
        this.isSubmit = true;
        this.seccion = {
          id: this.id,
          sec_nombre: this.FGControls['nombre'].value,
          sec_ubicacion: this.FGControls['ubicacion'].value
        }
        if (this.id > 0) {
          this.ActualizarSeccion();
        } else {
          this.CrearSeccion();
        }
      }
    }
  }

  get FGControls() {
    return this.formGroupSeccion.controls;
  }

  ngOnInit() {
    this.CargarComponente();
  }

}
