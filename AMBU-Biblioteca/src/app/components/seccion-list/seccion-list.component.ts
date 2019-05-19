import { Component, OnInit } from '@angular/core';
import { SeccionService } from '../../services/index';
import { Seccion } from 'src/app/interfaces/index';
import { faEdit, faBook, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seccion-list',
  templateUrl: './seccion-list.component.html',
  styleUrls: ['./seccion-list.component.css']
})
export class SeccionListComponent implements OnInit {

  // ATRIBUTOS
  private listaSeccion: Seccion[];
  private faEdit = faEdit;
  private faBook= faBook;
  private faPlus = faPlus;

  constructor(
    private seccionService: SeccionService,
    private router: Router
  ) { }

  // FUNCIONES
  getSecciones() {
    this.seccionService.getSecciones().subscribe(
      res => {
        this.listaSeccion = res.body;
      });
  }

  detalle(id: number) {
    this.router.navigate(['dashboard/seccion-detalles', id]);
  }

  agregar(id: number) {
    this.router.navigate(['dashboard/seccion-crear']);
  }

  editar(id: number) {
    this.router.navigate(['dashboard/seccion-actualizar', id]);
  }
  ngOnInit() {
    this.getSecciones();
  }

}
