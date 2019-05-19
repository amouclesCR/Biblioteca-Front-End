import { Component, OnInit } from '@angular/core';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { UsuarioService } from '../../services/index';
import { Usuario } from 'src/app/interfaces/index';
import { Router } from '@angular/router';
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

  constructor(
    private usuarioServicio: UsuarioService,
    private router: Router
  ) { }

  // FUNCIONES
  getUsuarios() {
    this.usuarioServicio.getUsuarios().subscribe(
      res => {
        this.listaUsuarios = res.body;
      }
    );
  }

  agregarUsuario() {
    this.router.navigate(['dashboard/usuario-mantenimiento']);
  }

  editarUsuario(id: number) {
    this.router.navigate(['dashboard/usuario-mantenimiento', id]);
  }
  
  ngOnInit() {
    this.getUsuarios();
  }

}
