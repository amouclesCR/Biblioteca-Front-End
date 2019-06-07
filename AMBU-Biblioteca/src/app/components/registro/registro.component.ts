import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService, AlertasService, MensajesAlertasService } from 'src/app/services/index';
import { Usuario } from 'src/app/interfaces/index';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  //  ATRIBUTOS
  private formGroupRegistro: FormGroup;

  constructor( 
    private formBuilderRegistro: FormBuilder,
    private router: Router,
    private usuarioServicio: UsuarioService,
    private location: Location,
    private alertas: AlertasService,
    private mensajeAlertas: MensajesAlertasService,
    ) { }

  // FUNCIONES
  iniciarFormulario() {
    this.formGroupRegistro = this.formBuilderRegistro.group({
      identificacion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      clave: ['', Validators.required],
      username: ['', Validators.required],
      confirmacion: ['', Validators.required],
      nombrecompleto: ['', Validators.required]
    });
  }

  submit() {
    if (this.formGroupRegistro.valid) {
      let usuario: Usuario;
      usuario = {
        id: 0,
        password: this.fGRegistro.clave.value,
        email: this.fGRegistro.correo.value,
        cus_identificacion: this.fGRegistro.identificacion.value,
        username: this.fGRegistro.username.value,
        cus_rol: null,
        cus_rol_modelo: null,
        first_name: this.fGRegistro.nombrecompleto.value
      }
      this.usuarioServicio.postUsuario(usuario).subscribe(
        res => {
          this.alertas.successInfoAlert("Usuario creado exitosamente");
          this.location.back();
        },
        err => {
          this.alertas.errorAlert("Error a la hora de registrar al usuario <br>"+
          this.mensajeAlertas.mensajeError(err.error.username)+
          this.mensajeAlertas.mensajeError(err.error.email)+
          this.mensajeAlertas.mensajeError(err.error.cus_identificacion));
        }
      );
    }
  }

  get confirmacionClave() {
    let clave = this.fGRegistro.clave.value;
    let confirm = this.fGRegistro.confirmacion.value;
    return clave == confirm;
  }

  get fGRegistro() {
    return this.formGroupRegistro.controls;
  }

  get fGRegistroValidado() {
    return this.formGroupRegistro.valid && this.confirmacionClave;
  }

  ngOnInit() {
    this.iniciarFormulario();
  }

}
