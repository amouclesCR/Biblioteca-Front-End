import { Component, OnInit, Input } from '@angular/core';
import { Usuario, Activo, Solicitud } from 'src/app/interfaces';
import { ActivatedRoute } from '@angular/router';
import { SolicitudService, PdfGeneratorService } from 'src/app/services/index';

@Component({
  selector: 'app-pdf-generador',
  templateUrl: './pdf-generador.component.html',
  styleUrls: ['./pdf-generador.component.css']
})
export class PdfGeneradorComponent implements OnInit {

  //  ATRIBUTOS
  @Input() usuario: Usuario;
  @Input() listaActivosSolicitud: Activo[];
  @Input() isTraspaso: boolean;
  @Input() nuevoUsuario: string;
  @Input() isVisualizar: boolean;
  @Input() numeroFormulario: string;
  private date: Date;
  private solicitud: Solicitud;

  constructor(
    private activeRoute: ActivatedRoute,
    private solicitudServicio: SolicitudService,
    private generadorServicio: PdfGeneratorService
  ) { 
    this.usuario = null;
    this.listaActivosSolicitud = [];
    this.isTraspaso = false;
    this.nuevoUsuario = "";
    this.isVisualizar = false;
  }

  generarPdf() {
    this.generadorServicio.capturaScreen(document.getElementById('estructura-pdf'), this.numeroFormulario);
  }

  ngOnInit() {
    let id = +this.activeRoute.snapshot.params['id']; 
    if (id > 0) {
      this.solicitudServicio.getSolicitud(id).subscribe(
        res => {debugger
          this.solicitud = res.body;
          this.listaActivosSolicitud = this.solicitud.sbja_activos_modelos;
          this.usuario = this.solicitud.sbja_usuario_modelo;
          this.nuevoUsuario = this.solicitud.sbja_nuevoUsuario_modelo.cus_identificacion;
          this.isTraspaso = this.solicitud.sbja_solicitud_traspaso;
          this.isVisualizar = true;
          this.numeroFormulario = this.solicitud.sbja_numero_formulario;
          this.date = this.solicitud.sbja_fecha_solicitud;
        }
      );
    } else {
      this.date = new Date();
    }
  }

}
