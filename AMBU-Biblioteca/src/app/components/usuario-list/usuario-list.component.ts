import { Component, OnInit } from '@angular/core';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
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
  public faPlus = faPlus;
  public faEdit = faEdit;
  public faTrash = faTrash;
  public listaUsuarios: Usuario[];
  public page = 1;
  public pageSize = 10;

  constructor(
    private usuarioServicio: UsuarioService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    public permisos: PermisosService,
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

  eliminarUsuario(id: number) {
    this.ngxService.startLoader('load');
    this.usuarioServicio.eliminarUsuario(id).subscribe(
      res => {
        this.ngxService.stopLoader('load');
        let index = this.listaUsuarios.findIndex(item => item.id == id);
        this.listaUsuarios.splice(index, 1);
        this.alertas.successInfoAlert("Usuario elimnado correctamente");
      },
      err => {
        this.ngxService.stopLoader('load');
        this.alertas.errorAlert(this.mensajeAlertas.mensajeStatusCode(err.status));
      }
    );
  }

  get usuarios() {
    return this.listaUsuarios.length > 0;
  }

  ngOnInit() {
    this.listaUsuarios = [];
    this.ngxService.startLoader('load');
    this.getUsuarios();
  }

}
