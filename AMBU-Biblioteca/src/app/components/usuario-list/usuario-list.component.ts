import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { UsuarioService } from '../../services/index';
import { Usuario } from 'src/app/interfaces/index';
@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  // ATRIBUTOS
  private faPlus = faPlus;
  private listaUsuarios: Usuario[];

  constructor(
    private usuarioServicio: UsuarioService
  ) { }

  // FUNCIONES
  GetUsuarios() {
    this.usuarioServicio.GetUsuarios().subscribe(
      res => {
        this.listaUsuarios = res.body;
      }
    );
  }
  ngOnInit() {
    this.GetUsuarios();
  }

}
