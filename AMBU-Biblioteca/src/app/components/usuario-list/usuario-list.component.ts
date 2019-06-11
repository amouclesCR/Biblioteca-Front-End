import { Component, OnInit } from '@angular/core';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { UsuarioService, PermisosService, AlertasService, MensajesAlertasService } from '../../services/index';
import { Usuario } from 'src/app/interfaces/index';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  // ATRIBUTOS
  private faPlus = faPlus;
  private faEdit = faEdit;
  private listaUsuarios: Usuario[];
  private page = 1;
  private pageSize = 10;

  constructor(
    private usuarioServicio: UsuarioService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private permisos: PermisosService,
    private mensajeAlertas: MensajesAlertasService,
    private alertas: AlertasService
  ) { }

  // FUNCIONES
  getUsuarios() {
    this.usuarioServicio.getUsuarios().subscribe(
      res => {
        this.listaUsuarios = res.body;
        this.ngxService.stopLoader('load');
      },
      err => {
        this.ngxService.stopLoader('load');
        this.alertas.errorAlert(this.mensajeAlertas.mensajeStatusCode(err.status));
      }
    );
  }

  editarUsuario(id: number) {
    this.router.navigate(['dashboard/usuario-mantenimiento', id]);
  }
  
  ngOnInit() {
    this.listaUsuarios = [];
    this.ngxService.startLoader('load');
    this.getUsuarios();
  }

}
