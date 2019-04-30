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

  constructor(
    private activoServicio: ActivoService,
    private usuarioServicio: UsuarioService,
    private router: Router
  ) { }

  // FUNCIONES
  Agregar() {
    this.router.navigate(['dashboard/activo-crear']);
  }

  Editar(id: number) {
    this.router.navigate(['dashboard/activo-actualizar', id]);
  }

  GetActivos() {
    this.activoServicio.GetActivos().subscribe(
      res => {
        this.listaActivos = res.body;
        this.listaActivosTabla = res.body;
      }
    );
  }

  GetUsuarios() {
    this.usuarioServicio.GetUsuarios().subscribe(
      res => {
        this.listUsuario = res.body;
      }
    );
  }

  Filtrar() {
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

    if (!this.term && !this.usuairoResponsable){
      this.listaActivosTabla = this.listaActivos;
    }
  }


  ngOnInit() {console.log(this.usuairoResponsable);
    this.GetActivos();
    this.GetUsuarios();
  }
}
