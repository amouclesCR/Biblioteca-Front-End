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
  iniciarFormulario() {
    this.formGroupLogin = this.formBuilderLogin.group({
      identificacion: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  submit() {
    if (this.formGroupLogin.valid) {
      
      this.login = {
        usu_identificacion: this.fGLogin['identificacion'].value,
        usu_clave: this.fGLogin['clave'].value
      }
      
      this.loginService.login(this.login).subscribe(
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

  get fGLogin() {
    return this.formGroupLogin.controls;
  }

  ngOnInit() {
    this.usuarioNoEncontrado = false;
    this.iniciarFormulario();
  }

}
