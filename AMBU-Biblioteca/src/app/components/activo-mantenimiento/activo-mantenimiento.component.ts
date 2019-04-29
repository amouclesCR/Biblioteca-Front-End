import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertasService } from '../../services/alertas.service';
import { Activo } from '../../interfaces/activo';
import { ActivoService } from '../../services/activo.service';
import { SeccionService } from '../../services/seccion.service';
import { ActivatedRoute } from '@angular/router';
import { Seccion } from 'src/app/interfaces/seccion';
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
  private id: number;

  constructor(
    private activoService: ActivoService,
    private alerta: AlertasService,
    private activetedRouter: ActivatedRoute,
    private seccionService: SeccionService,
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
      estatus: ['', Validators.required],
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

  CargarComponente() {
    this.ObtenerId();
    // this.btnMensaje = this.id > 0 ? "Actualizar" : "Agregar";
    this.GetSecciones();
    this.IniciarFormulario();
    if (this.id > 0) {
      this.ObtenerActivo();
    }
  }

  get FGControls() {
    return this.formGroupActivo.controls;
  }
  ngOnInit() {
    this.CargarComponente();
  }

}
