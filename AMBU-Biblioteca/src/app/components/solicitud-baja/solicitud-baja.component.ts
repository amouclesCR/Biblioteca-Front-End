import { Component, OnInit } from '@angular/core';
import { DataStorageService, ActivoService } from '../../services/index';
import { Usuario, Activo } from 'src/app/interfaces/index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-solicitud-baja',
  templateUrl: './solicitud-baja.component.html',
  styleUrls: ['./solicitud-baja.component.css']
})
export class SolicitudBajaComponent implements OnInit {

  // ATRIBUTOS
  private date: Date = new Date();
  private usuario: Usuario;
  private formGroupSolicitud: FormGroup;
  private listaActivos: Activo[];
  private listaActivosSolicitud: Activo[]; 

  constructor(
    private dataStorageService: DataStorageService,
    private formBuilderSolicitud: FormBuilder,
    private activoServicio: ActivoService 
  ) { }

  // FUNCIONES
  IniciarFormulario() {
    this.formGroupSolicitud = this.formBuilderSolicitud.group({
     numeroFormulario: ['', Validators.required]
    });
  }

  getActivos() {
    this.activoServicio.GetActivosByUsuario(this.usuario.id).subscribe(
      res => {
        this.listaActivos = res.body;
      }
    );
  }

  agregarActivoSolicitud(id :number) {
    let index = this.listaActivosSolicitud.findIndex(item => item.id == id);
    if (index > -1) {
      this.listaActivosSolicitud.splice(index, 1);
    } else {
      let activo = this.listaActivos.find(item => item.id == id);
      this.listaActivosSolicitud.push(activo);
    }
  }

  get fGSolicitud() {
    return this.formGroupSolicitud.controls;
  }

  ngOnInit() {
    this.usuario = this.dataStorageService.getObjectValue("USUARIO");
    this.IniciarFormulario();
    this.getActivos();
    this.listaActivosSolicitud = [];
  }
}
