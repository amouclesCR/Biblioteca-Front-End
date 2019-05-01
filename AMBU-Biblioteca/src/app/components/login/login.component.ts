import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../interfaces/index';
import { LoginService, DataStorageService } from '../../services/index';
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
    private loginService: LoginService, 
    private dataStorageService: DataStorageService
  ) { }

  // FUNCIONES
  IniciarFormulario() {
    this.formGroupLogin = this.formBuilderLogin.group({
      identificacion: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  Submit() {
    if (this.formGroupLogin.valid) {
      
      this.login = {
        usu_identificacion: this.FGLogin['identificacion'].value,
        usu_clave: this.FGLogin['clave'].value
      }
      
      this.loginService.Login(this.login).subscribe(
        res => {
          if (res.body == 0) {
            this.usuarioNoEncontrado = true;
          } else {
            this.dataStorageService.setObjectValue("USUARIO", res.body);
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
