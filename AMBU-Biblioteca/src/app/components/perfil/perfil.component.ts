import { Component, OnInit } from '@angular/core';
import { DataStorageService, ActivoService } from 'src/app/services/index';
import { Usuario, Activo } from 'src/app/interfaces/index';
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
  constructor(
    private dataSoterage: DataStorageService,
    private activoServicio: ActivoService, 
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

  ngOnInit() {
    this.usuario = this.dataSoterage.getObjectValue("USUARIO");
    this.getActivos();
  }

}
