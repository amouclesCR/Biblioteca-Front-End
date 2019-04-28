import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/services/login-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // ATRIBUTOS
  private formGroupLogin: FormGroup;

  constructor(
    private formBuilderLogin: FormBuilder,
    private loginService: LoginServiceService
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
      
      let nombreUsuario = this.FGLogin['nombreUsuario'].value;
      let clave = this.FGLogin['clave'].value;

      this.loginService.Login(nombreUsuario, clave).subscribe(
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
