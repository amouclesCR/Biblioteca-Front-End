import { Component, OnInit } from '@angular/core';
import { ActivoService, UsuarioService } from '../../services/index';
import { Activo, Usuario } from '../../interfaces/index';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-activo-list',
  templateUrl: './activo-list.component.html',
  styleUrls: ['./activo-list.component.css']
})
export class ActivoListComponent implements OnInit {

  // ATRIBUTOS
  private listaActivos: Activo[];
  private listaActivosTabla: Activo[];
  private listUsuario: Usuario[];
  private faEdit = faEdit;
  private faPlus = faPlus;
  private term = '';
  private usuairoResponsable = '';
  private date: Date; 
  private orden: number;
  page = 1;
  pageSize = 5;

  constructor(
    private activoServicio: ActivoService,
    private usuarioServicio: UsuarioService,
    private router: Router
  ) { }

  // FUNCIONES
  agregar() {
    this.router.navigate(['dashboard/activo-crear']);
  }

  editar(id: number) {
    this.router.navigate(['dashboard/activo-actualizar', id]);
  }

  getActivos() {
    this.activoServicio.getActivos().subscribe(
      res => {
        this.listaActivos = res.body;
        this.listaActivosTabla = res.body;
      }
    );
  }

  getUsuarios() {
    this.usuarioServicio.getUsuarios().subscribe(
      res => {
        this.listUsuario = res.body;
      }
    );
  }

  cargarListaPaginator(page: number) {
    this.listaActivosTabla = this.listaActivos.slice(0,page);
  }

  filtrar() {
    this.listaActivosTabla = this.listaActivos;
    if (this.term) {
      let listTemporal = this.listaActivos.filter(item => 
        item.act_numero_activo.includes(this.term));
      this.listaActivosTabla = listTemporal;
    }
    if (this.usuairoResponsable) {
      let listTemporal = this.listaActivosTabla.filter(item => 
        item.act_usuario_responsabe == +this.usuairoResponsable);
      this.listaActivosTabla = listTemporal;
    }

    if (!(+this.orden==0)) {
        this.listaActivosTabla = this.listaActivosTabla.sort(item => (item.act_estatus == (+this.orden==1)?-1:1));
    }

    if (!this.term && !this.usuairoResponsable && +this.orden==0){
      this.listaActivosTabla = this.listaActivos;
    }

  }

  loadPage(page: number) {

    console.log(page);
  }
  ngOnInit() {
    this.orden = 0;
    this.getActivos();
    this.getUsuarios();
  }
}
