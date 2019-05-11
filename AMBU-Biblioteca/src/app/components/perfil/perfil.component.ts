import { Component, OnInit } from '@angular/core';
import { DataStorageService, ActivoService, SolicitudService } from 'src/app/services/index';
import { Usuario, Activo, Solicitud } from 'src/app/interfaces/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  // ATRIBUTOS
  private usuario: Usuario
  private listaActivos: Activo[];
  private listaSolicitudes: Solicitud[];
  constructor(
    private dataSoterage: DataStorageService,
    private activoServicio: ActivoService, 
    private solicitudServicio: SolicitudService,
    private router: Router
  ) { }

  // FUNCIONES
  getActivos(){
    this.activoServicio.GetActivosByUsuario(this.usuario.id).subscribe(
      res => {
        this.listaActivos = res.body;
      }
    );
  }

  editarPerfil() {
    this.router.navigate(['dashboard/perfil-editar']);
  }

  obtenerSolicitudes() {
    this.solicitudServicio.getSolicitudByUsuario(this.usuario.id).subscribe(
      res => {
        this.listaSolicitudes = res.body;
      }
    );
  }

  verSolicitud(id: number) {
    this.router.navigate(['dashboard/visualizar-pdf', id]);
  }

  ngOnInit() {
    this.usuario = this.dataSoterage.getObjectValue("USUARIO");
    this.obtenerSolicitudes();
    this.getActivos();
  }

}
