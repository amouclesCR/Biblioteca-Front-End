import { Component, OnInit } from '@angular/core';
import { RecoveryService, MensajesAlertasService, AlertasService } from 'src/app/services/index';
import { Usuario } from 'src/app/interfaces/index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

  //  ATRIBUTOS
  private usuario: Usuario;
  private formGroupRecovery: FormGroup;


  constructor(
    private recoveryServicio: RecoveryService,
    private formBuilderRecovery: FormBuilder,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private mensajeAlertas: MensajesAlertasService,
    private alertas: AlertasService,
  ) { }

  //  FUNCIONES
  submit() {
    this.ngxService.startLoader('load');
    this.usuario = {
      cus_identificacion: this.fGRecovery.identificacion.value,
      cus_rol: null,
      cus_rol_modelo: null,
      date_joined: null,
      email: this.fGRecovery.correo.value,
      first_name: null,
      id: null,
      password: this.fGRecovery.clave.value,
      username: null
    }
    this.recoveryServicio.cambiarContraseña(this.usuario).subscribe(
      res => {
        this.ngxService.stopLoader('load');
        this.router.navigate(['login']);
      },
      err => {
        this.ngxService.stopLoader('load');
        this.alertas.errorAlert(
          this.mensajeAlertas.mensajeStatusCode(err.status)
        );
      }
    );
  }

  iniciarFormulario() {
    this.formGroupRecovery= this.formBuilderRecovery.group({
      identificacion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      clave: ['', Validators.required],
    });
  }

  get fGRecovery() {
    return this.formGroupRecovery.controls;
  }
  ngOnInit() {
    this.iniciarFormulario();
  }

}
