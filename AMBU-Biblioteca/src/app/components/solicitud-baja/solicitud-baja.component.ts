import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataStorageService, ActivoService, UsuarioService, SolicitudService, AlertasService, MensajesAlertasService } from '../../services/index';
import { Usuario, Activo, Solicitud } from 'src/app/interfaces/index';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PdfGeneratorService } from 'src/app/services/index';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-solicitud-baja',
  templateUrl: './solicitud-baja.component.html',
  styleUrls: ['./solicitud-baja.component.css']
})
export class SolicitudBajaComponent implements OnInit {

  // ATRIBUTOS
  public usuario: Usuario;
  public solicitud: Solicitud;
  public formGroupSolicitud: FormGroup;
  public listaActivos: Activo[];
  public listaActivosSolicitud: Activo[];
  public listaUsuario: Usuario[];
  public isTraspaso: boolean;
  public nuevoUsuario: Usuario;
  public isSubmit: boolean;
  public listaActivosSubmit: number[];


  constructor(
    private dataStorageService: DataStorageService,
    private formBuilderSolicitud: FormBuilder,
    private activoServicio: ActivoService,
    private usuarioService: UsuarioService,
    private solicitudServicio: SolicitudService,
    private alertas: AlertasService, 
    private ngxService: NgxUiLoaderService,
    private generadorServicio: PdfGeneratorService,
    private mensajeAlertas: MensajesAlertasService
  ) { }

  // FUNCIONES
  IniciarFormulario() {
    this.formGroupSolicitud = this.formBuilderSolicitud.group({
      numeroFormulario: ['', Validators.required],
      tipoSolicitud: [this.isTraspaso]
    });
  }

  checkedChange() {
    this.isTraspaso = !this.isTraspaso;
    if (this.isTraspaso) {
      this.agregarNuevoCampo();
    } else {
      this.eliminarNuevoCampo();
    }
  }

  agregarNuevoCampo() {
    this.formGroupSolicitud.addControl(
      'usuario', new FormControl('', Validators.required)
    );
  }

  eliminarNuevoCampo() {
    this.formGroupSolicitud.removeControl('usuario');
  }

  getActivos() {
    this.activoServicio.getActivosByUsuario(this.usuario.id).subscribe(
      res => {
        this.listaActivos = res.body.filter(item => item.act_estatus = true);
        this.getUsuarios();
      },
      err => {
        this.ngxService.stopLoader('load');
        this.alertas.errorAlert(
          this.mensajeAlertas.mensajeStatusCode(err.status)
        );
      }
    );
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      res => {
        let index = res.body.findIndex(item => item.id == this.usuario.id);
        this.listaUsuario = res.body;
        this.listaUsuario.splice(index, 1);
        this.ngxService.stopLoader('load');
      },
      err => {
        this.ngxService.stopLoader('load');
        this.alertas.errorAlert(
          this.mensajeAlertas.mensajeStatusCode(err.status)
        );
      }
      );
  }

  agregarActivoSolicitud(id: number) {
    let index = this.listaActivosSolicitud.findIndex(item => item.id == id);
    if (index > -1) {
      this.listaActivosSolicitud.splice(index, 1);
    } else {
      let activo = this.listaActivos.find(item => item.id == id);
      this.listaActivosSolicitud.push(activo);
    }
  }

  guardarSolicitud() {
    this.ngxService.startLoader('load');
    this.solicitud = {
      id: 0,
      sbja_activos: this.obtenerActivosGuardar(),
      sbja_estado_solicitud: "E",
      sbja_fecha_solicitud: null,
      sbja_usuario: this.usuario.id,
      sbja_usuario_nuevo: this.isTraspaso ? this.formGroupSolicitud.controls.usuario.value : null,
      sbja_numero_formulario: this.formGroupSolicitud.controls.numeroFormulario.value,
      sbja_solicitud_traspaso: this.isTraspaso,
      sbja_activos_modelos: null,
      sbja_nuevoUsuario_modelo: null,
      sbja_usuario_modelo: null
    }
    this.solicitudServicio.postSolicitud(this.solicitud).subscribe(
      res => {
        this.ngxService.stopLoader('load');
        this.alertas.successInfoAlert("Solicitud registrada correctamente");
      },
      err => {
        this.ngxService.stopLoader('load');
        this.isSubmit = false;
        this.alertas.errorAlert("Ha ocurrido un problema durante el registro de la solicitud. <br/>" +
        this.mensajeAlertas.mensajeError(err.error.sbja_numero_formulario)+
        this.mensajeAlertas.mensajeStatusCode(err.status));
      }
    );
  }

  submit() {
    if (!this.isSubmit) {
      this.isSubmit = true;
      this.guardarSolicitud();
    }
  }

  usuarioSelecionado(id: number) {
    if (id) {
      this.nuevoUsuario = this.listaUsuario.find(item => item.id == id);
    }
  }

  obtenerActivosGuardar() {
    let listAct = [];
    this.listaActivosSolicitud.forEach(item => {
      listAct.push(item.id);
    });
    return listAct;
  }

  get isFormularioValido() {
    return this.formGroupSolicitud.invalid || this.listaActivosSolicitud.length == 0;
  }

  get fGSolicitud() {
    return this.formGroupSolicitud.controls;
  }

  get numeroFormulario() {
    return this.formGroupSolicitud.controls.numeroFormulario.value;
  }

  generarPdf() {
    this.generadorServicio.capturaScreen(document.getElementById('estructura-pdf'), this.numeroFormulario);
  }

  ngOnInit() {
    this.ngxService.startLoader('load');
    this.usuario = this.dataStorageService.getObjectValue(environment.USUARIO);
    this.IniciarFormulario();
    this.getActivos();
    this.listaActivosSolicitud = [];
  }
}
