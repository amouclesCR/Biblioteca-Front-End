import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Seccion, Departamento } from '../../interfaces/index';
import {SeccionService, AlertasService, DepartamentoService} from '../../services/index';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
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
  private listaDepartamento: Departamento[];

  constructor(
    private formBuilderSeccion: FormBuilder,
    private seccionService: SeccionService,
    private activetedRouter: ActivatedRoute,
    private alertas: AlertasService, 
    private location: Location, 
    private departamentoServicio: DepartamentoService
  ) { }

  // FUNCIONES
  obtenerId() {
    this.id = +this.activetedRouter.snapshot.params['id'];
  }

  iniciarFormulario() {
    this.formGroupSeccion = this.formBuilderSeccion.group({
      nombre: ['', Validators.required],
      departamento: ['', Validators.required]
    });
  }

  cargarValores() {
    this.fGControls['nombre'].setValue(this.seccion.sec_nombre);
    this.fGControls['departamento'].setValue(this.seccion.sec_departamento);
  }

  obtenerSeccion() {
    this.seccionService.getSeccion(this.id).subscribe(
      res => {
        this.seccion = res.body;
        this.cargarValores();
      }
    );
  }

  obtenerDepartamentos() {
    this.departamentoServicio.getdepartamentos().subscribe(
      res => {
        this.listaDepartamento = res.body;
      }
    );
  }

  cargarComponente() {
    this.obtenerId();
    this.btnMensaje = this.id > 0 ? "Actualizar" : "Agregar";
    this.iniciarFormulario();
    this.obtenerDepartamentos();
    if (this.id > 0) {
      this.obtenerSeccion();
    }
  }

  actualizarSeccion() {
    this.seccionService.updateSeccion(this.seccion).subscribe(
      res => {
        this.alertas.successInfoAlert("Sección actualizada correctamente");
        this.location.back();
      },
      err => {
        this.alertas.errorAlert("Ha ocurrido un problema durante la actualización de la sección." +
          " Por favor, contacte con el administrador. Status Code: " + err.status);
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
        this.alertas.errorAlert("Ha ocurrido un problema durante la creación de la sección." +
          " Por favor, contacte con el administrador. Status Code: " + err.status);
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
          sec_departamento: this.fGControls['departamento'].value,
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
    this.cargarComponente();
  }

}
