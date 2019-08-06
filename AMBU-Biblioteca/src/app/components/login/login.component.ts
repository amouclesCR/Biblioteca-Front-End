import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../interfaces/index';
import { LoginService, DataStorageService, MensajesAlertasService, AlertasService } from '../../services/index';
import { environment } from 'src/environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // ATRIBUTOS
  public formGroupLogin: FormGroup;
  private login: Login;
  public usuarioNoEncontrado: boolean;

  constructor(
    private formBuilderLogin: FormBuilder,
    private router: Router,
    private loginService: LoginService, 
    private dataStorageService: DataStorageService,
    private mensajeAlertas: MensajesAlertasService,
    private alertas: AlertasService,
    private ngxService: NgxUiLoaderService,
  ) { }

  // FUNCIONES
  iniciarFormulario() {
    this.formGroupLogin = this.formBuilderLogin.group({
      username: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  submit() {
    if (this.formGroupLogin.valid) {
      
      this.login = {
        username: this.fGLogin['username'].value,
        password: this.fGLogin['clave'].value
      }
      this.ngxService.startLoader('load');
      
      this.loginService.login(this.login).subscribe(
        res => {
          if (res.body == 0) {
            this.usuarioNoEncontrado = true;
          } else {
            this.ngxService.stopLoader('load');
            this.dataStorageService.setObjectValue(environment.USUARIO, res.body);
            this.router.navigate(['dashboard']);
          }
        },
        err => {
          this.ngxService.stopLoader('load');
          this.alertas.errorAlert(
            this.mensajeAlertas.mensajeStatusCode(err.status)
          );
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
