import { Component, OnInit } from '@angular/core';
import { SeccionService } from '../../services/seccion.service';
import { Seccion } from 'src/app/interfaces/seccion';
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
  GetSecciones() {
    this.seccionService.GetSecciones().subscribe(
      res => {
        this.listaSeccion = res.body;
      });
  }

  Detalle(id: number) {
    this.router.navigate(['dashboard/seccion-detalles', id]);
  }
  Agregar(id: number) {
    this.router.navigate(['dashboard/seccion-crear']);
  }

  Editar(id: number) {
    this.router.navigate(['dashboard/seccion-actualizar', id]);
  }
  ngOnInit() {
    this.GetSecciones();
  }

}
