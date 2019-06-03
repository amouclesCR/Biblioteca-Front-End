import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService, DataStorageService, AlertasService } from 'src/app/services/index';
import { Usuario } from 'src/app/interfaces/index';
import { Location } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
@Component({
  selector: 'app-perfil-mantenimiento',
  templateUrl: './perfil-mantenimiento.component.html',
  styleUrls: ['./perfil-mantenimiento.component.css']
})
export class PerfilMantenimientoComponent implements OnInit {

  // ATRIBUTOS
  private formGroupPerfil: FormGroup;
  private usuario: Usuario;
  constructor(
    private formBuilderPerfil: FormBuilder, 
    private usuarioServicio: UsuarioService, 
    private dataStoreServicio: DataStorageService,
    private location: Location, 
    private alertas: AlertasService,
    private ngxService: NgxUiLoaderService
  ) { }

  // FUNCIONES
  IniciarFormulario() {
    this.formGroupPerfil = this.formBuilderPerfil.group({
      identificacion: [this.usuario.usu_identificacion, Validators.required],
      nombre: [this.usuario.usu_nombre, Validators.required], 
      correo: [this.usuario.usu_correo, Validators.required]
    });
    this.ngxService.stopLoader('load');
  }

  submit() {
    this.usuario.usu_nombre = this.fGPerfil['nombre'].value;
    this.usuario.usu_correo = this.fGPerfil['correo'].value;
    this.usuario.usu_identificacion = this.fGPerfil['identificacion'].value;
    this.usuarioServicio.updateUsuario(this.usuario).subscribe(
      res => {
        this.dataStoreServicio.setObjectValue('USUARIO', this.usuario);
        this.alertas.successInfoAlert("Perfil actualizado correctamente");
        this.location.back();
      },
      err => {
        this.alertas.errorAlert("Ha ocurrido un problema durante la actualización del perfil." +
          " Por favor, contacte con el administrador. Status Code: " + err.status);
      }
    );
  }

  getUsuario() {
    this.usuario = this.dataStoreServicio.getObjectValue("USUARIO");
  }

  get fGPerfil() {
    return this.formGroupPerfil.controls;
  }
  
  ngOnInit() {
    this.ngxService.startLoader('load');
    this.getUsuario();
    this.IniciarFormulario();
  }

}
