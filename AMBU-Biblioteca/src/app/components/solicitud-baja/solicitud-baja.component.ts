import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataStorageService, ActivoService, UsuarioService } from '../../services/index';
import { Usuario, Activo } from 'src/app/interfaces/index';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-solicitud-baja',
  templateUrl: './solicitud-baja.component.html',
  styleUrls: ['./solicitud-baja.component.css']
})
export class SolicitudBajaComponent implements OnInit {

  // ATRIBUTOS
  private date: Date = new Date();
  private usuario: Usuario;
  private formGroupSolicitud: FormGroup;
  private listaActivos: Activo[];
  private listaActivosSolicitud: Activo[];
  private listaUsuario: Usuario[];
  private isTraspaso: boolean;
  private nuevoUsuario: string;


  constructor(
    private dataStorageService: DataStorageService,
    private formBuilderSolicitud: FormBuilder,
    private activoServicio: ActivoService,
    private usuarioService: UsuarioService
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
    this.activoServicio.GetActivosByUsuario(this.usuario.id).subscribe(
      res => {
        this.listaActivos = res.body;
      }
    );
  }

  getUsuarios() {
    this.usuarioService.GetUsuarios().subscribe(
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

  submit() {
    this.captureScreen();
  }

  usuarioSelecionado(id: number){
    if (id) {
     this.nuevoUsuario = this.listaUsuario.find(item => item.id == id).usu_identificacion;
    }
  }

  get isFormularioValido() {
    return this.formGroupSolicitud.invalid || this.listaActivosSolicitud.length == 0;
  }

  get fGSolicitud() {
    return this.formGroupSolicitud.controls;
  }

  public captureScreen() {
    var data = document.getElementById('estructura-pdf');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }

ngOnInit() {
  this.usuario = this.dataStorageService.getObjectValue("USUARIO");
  this.IniciarFormulario();
  this.getActivos();
  this.getUsuarios();
  this.listaActivosSolicitud = [];
}
}
