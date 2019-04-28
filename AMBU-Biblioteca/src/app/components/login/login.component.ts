import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Login } from '../../interfaces/interfaces/login';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // ATRIBUTOS
  private formGroupLogin: FormGroup;
  private login: Login;

  constructor(
    private formBuilderLogin: FormBuilder,
    private loginService: LoginService
  ) { }

  // FUNCIONES
  IniciarFormulario() {
    this.formGroupLogin = this.formBuilderLogin.group({
      nombreUsuario: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  Submit() {
    if (this.formGroupLogin.valid) {
      
      this.login = {
        usu_nombre_usuario: this.FGLogin['nombreUsuario'].value,
        usu_clave: this.FGLogin['clave'].value
      }
      
      this.loginService.Login(this.login).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err.status);
        }
      );
    }
  }

  get FGLogin() {
    return this.formGroupLogin.controls;
  }

  ngOnInit() {
    this.IniciarFormulario();
  }

}
