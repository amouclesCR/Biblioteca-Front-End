import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService, DataStorageService, AlertasService, MensajesAlertasService } from 'src/app/services/index';
import { Usuario } from 'src/app/interfaces/index';
import { Location } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { environment } from 'src/environments/environment';
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
    private ngxService: NgxUiLoaderService,
    private mensajeAlertas: MensajesAlertasService
  ) { }

  // FUNCIONES
  IniciarFormulario() {
    this.formGroupPerfil = this.formBuilderPerfil.group({
      identificacion: [this.usuario.cus_identificacion, Validators.required],
      nombre: [this.usuario.username, Validators.required], 
      correo: [this.usuario.email, Validators.required]
    });
    this.ngxService.stopLoader('load');
  }

  submit() {
    this.usuario.username = this.fGPerfil['nombre'].value;
    this.usuario.email = this.fGPerfil['correo'].value;
    this.usuario.cus_identificacion = this.fGPerfil['identificacion'].value;
    this.usuarioServicio.updateUsuario(this.usuario).subscribe(
      res => {
        this.dataStoreServicio.setObjectValue(environment.USUARIO, this.usuario);
        this.alertas.successInfoAlert("Perfil actualizado correctamente");
        this.location.back();
      },
      err => {
        this.alertas.errorAlert("Ha ocurrido un problema durante la actualización del perfil." +
        this.mensajeAlertas.mensajeError(err.error.username) +
        this.mensajeAlertas.mensajeError(err.error.email) +
        this.mensajeAlertas.mensajeError(err.error.cus_identificacion) +
        this.mensajeAlertas.mensajeStatusCode(err.status));
      }
    );
  }

  getUsuario() {
    this.usuario = this.dataStoreServicio.getObjectValue(environment.USUARIO);
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
