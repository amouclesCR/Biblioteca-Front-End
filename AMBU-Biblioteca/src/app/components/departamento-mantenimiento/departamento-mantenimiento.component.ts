import { Component, OnInit } from '@angular/core';
import { Departamento } from '../../interfaces/index';
import { DepartamentoService } from '../../services/index';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-departamento-mantenimiento',
  templateUrl: './departamento-mantenimiento.component.html',
  styleUrls: ['./departamento-mantenimiento.component.css']
})
export class DepartamentoMantenimientoComponent implements OnInit {

  // ATRIBUTOS
  private departemento: Departamento;
  private formGroupDepartamento: FormGroup;
  private id: number;
  private btnMensaje = 'Agregar';
  private isSubmit = false;
  constructor(
    private departamentoServicio: DepartamentoService,
    private formBuilderDepartamento: FormBuilder,
    private location: Location,
    private activetedRoute: ActivatedRoute
  ) { }

  //  FUNCIONES
  iniciarFormulario() {
    this.formGroupDepartamento = this.formBuilderDepartamento.group({
      nombre: ['', Validators.required]
    });
  }

  cargarFormulario() {
    this.formGroupDepartamento.patchValue({
      nombre: this.departemento.dep_nombre
    });
  }

  submit() {
    if (!this.isSubmit) {
      this.isSubmit = true;
      this.departemento = {
        id: 0,
        dep_nombre: this.fgControls.nombre.value
      }
      this.departamentoServicio.postdepartamento(this.departemento).subscribe(
        res => {
          this.location.back();
          this.isSubmit = false;
        }
      );
    }
   
  }

  obtenerId() {
    this.id = +this.activetedRoute.snapshot.params['id'];
  }

  cargarComponente() {
    this.obtenerId();
    this.iniciarFormulario();
    if (this.id > 0) {
      this.btnMensaje = "Actualizar";
      this.getDepartamento();
    }
  }

  getDepartamento() {
    this.departamentoServicio.getdepartamento(this.id).subscribe(
      res => {
        this.departemento = res.body;
        this.cargarFormulario();
      }
    );
  }
  get fgControls() {
    return this.formGroupDepartamento.controls;
  }

  ngOnInit() {
    this.cargarComponente();
  }

}
