import { Component, OnInit } from '@angular/core';
import { ActivoService } from '../../services/index';
import { Activo } from '../../interfaces/index';
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
  private faEdit = faEdit;
  private faPlus = faPlus;

  constructor(
    private activoServicio: ActivoService,
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
      }
    );
  }
  ngOnInit() {
    this.GetActivos();
  }

}
