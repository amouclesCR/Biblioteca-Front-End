import { Component, OnInit, Input } from '@angular/core';
import { Usuario, Activo, Solicitud } from 'src/app/interfaces';
import { ActivatedRoute } from '@angular/router';
import { SolicitudService } from 'src/app/services/index';

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
  private date: Date;
  private solicitud: Solicitud;
  constructor(
    private activeRoute: ActivatedRoute,
    private solicitudServicio: SolicitudService
  ) { 
    this.usuario = null;
    this.listaActivosSolicitud = [];
    this.isTraspaso = false;
    this.nuevoUsuario = "";
  }

  ngOnInit() {
    let id = +this.activeRoute.snapshot.params['id']; 
    if (id > 0) {
      this.solicitudServicio.getSolicitud(id).subscribe(
        res => {
          this.solicitud = res.body;
          this.listaActivosSolicitud = this.solicitud.sbja_activos_modelos;
          this.usuario = this.solicitud.sbja_usuario_modelo;
          this.nuevoUsuario = this.solicitud.sbja_nuevoUsuario_modelo.usu_identificacion;
          this.isTraspaso = this.solicitud.sbja_solicitud_traspaso;
        }
      );
    }
  }

}
