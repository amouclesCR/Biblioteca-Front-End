import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataStorageService, ActivoService, UsuarioService, SolicitudService, AlertasService } from '../../services/index';
import { Usuario, Activo, Solicitud } from 'src/app/interfaces/index';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PdfGeneratorService } from 'src/app/services/index';
@Component({
  selector: 'app-solicitud-baja',
  templateUrl: './solicitud-baja.component.html',
  styleUrls: ['./solicitud-baja.component.css']
})
export class SolicitudBajaComponent implements OnInit {

  // ATRIBUTOS
  private usuario: Usuario;
  private solicitud: Solicitud;
  private formGroupSolicitud: FormGroup;
  private listaActivos: Activo[];
  private listaActivosSolicitud: Activo[];
  private listaUsuario: Usuario[];
  private isTraspaso: boolean;
  private nuevoUsuario: string;
  private isSubmit: boolean;
  private listaActivosSubmit: number[];


  constructor(
    private dataStorageService: DataStorageService,
    private formBuilderSolicitud: FormBuilder,
    private activoServicio: ActivoService,
    private usuarioService: UsuarioService,
    private solicitudServicio: SolicitudService,
    private alertas: AlertasService, 
    private generadorServicio: PdfGeneratorService
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
        this.listaActivos = res.body;
      }
    );
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      res => {
        let index = res.body.findIndex(item => item.id == this.usuario.id);
        this.listaUsuario = res.body;
        this.listaUsuario.splice(index, 1);
      });
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
    this.solicitud = {
      id: 0,
      sbja_activos: this.obtenerActivosGuardar(),
      sbja_estado_solicitud: false,
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
        this.alertas.successInfoAlert("Solicitud registrada correctamente");
      },
      err => {
        this.alertas.errorAlert("Ha ocurrido un problema durante el registro de la solicitud." +
          " Por favor, contacte con el administrador. Status Code: " + err.status);
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
      this.nuevoUsuario = this.listaUsuario.find(item => item.id == id).cus_identificacion;
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
    this.usuario = this.dataStorageService.getObjectValue("USUARIO");
    this.IniciarFormulario();
    this.getActivos();
    this.getUsuarios();
    this.listaActivosSolicitud = [];
  }
}
