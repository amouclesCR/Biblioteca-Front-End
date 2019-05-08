import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataStorageService, ActivoService } from '../../services/index';
import { Usuario, Activo } from 'src/app/interfaces/index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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


  constructor(
    private dataStorageService: DataStorageService,
    private formBuilderSolicitud: FormBuilder,
    private activoServicio: ActivoService
  ) { }

  // FUNCIONES
  IniciarFormulario() {
    this.formGroupSolicitud = this.formBuilderSolicitud.group({
      numeroFormulario: ['', Validators.required]
    });
  }

  getActivos() {
    this.activoServicio.GetActivosByUsuario(this.usuario.id).subscribe(
      res => {
        this.listaActivos = res.body;
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
  this.listaActivosSolicitud = [];
}
}
