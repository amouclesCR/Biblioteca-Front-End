import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../interfaces/login';
import { LoginService } from '../../services/index';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // ATRIBUTOS
  private formGroupLogin: FormGroup;
  private login: Login;
  private usuarioNoEncontrado: boolean;

  constructor(
    private formBuilderLogin: FormBuilder,
    private router: Router,
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
          if (res.body == 0) {
            this.usuarioNoEncontrado = true;
          } else {
            this.router.navigate(['dashboard']);
          }
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
    this.usuarioNoEncontrado = false;
    this.IniciarFormulario();
  }

}
