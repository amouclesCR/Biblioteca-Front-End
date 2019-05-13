import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService, AlertasService } from 'src/app/services/index';
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
    private alertas: AlertasService
    ) { }

  // FUNCIONES
  IniciarFormulario() {
    this.formGroupRegistro = this.formBuilderRegistro.group({
      identificacion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      clave: ['', Validators.required],
      nombre: ['', Validators.required],
      confirmacion: ['', Validators.required]
    });
  }

  submit() {
    if (this.formGroupRegistro.valid) {
      let usuario: Usuario;
      usuario = {
        id: 0,
        usu_clave: this.fGRegistro.clave.value,
        usu_correo: this.fGRegistro.correo.value,
        usu_identificacion: this.fGRegistro.identificacion.value,
        usu_nombre: this.fGRegistro.nombre.value,
        usu_rol: null,
        usu_rol_modelo: null
      }
      this.usuarioServicio.PostUsuario(usuario).subscribe(
        res => {
          this.alertas.successInfoAlert("Usuario creado exitosamente");
          this.location.back();
        },
        err => {
          this.alertas.errorInfoAlert("Error a la hora de registrar al usuario");
        }
      );
    }
  }

  get confirmacionClave() {
    let clave = this.fGRegistro.clave.value;
    let confirm = this.fGRegistro.confirmacion.value;
    console.log(clave == confirm)
    return clave == confirm;
  }

  get fGRegistro() {
    return this.formGroupRegistro.controls;
  }

  get fGRegistroValidado() {
    return this.formGroupRegistro.valid && this.confirmacionClave;
  }

  ngOnInit() {
    this.IniciarFormulario();
  }

}
