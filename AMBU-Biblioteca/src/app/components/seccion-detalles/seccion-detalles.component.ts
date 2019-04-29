import { Component, OnInit } from '@angular/core';
import { ActivoService } from 'src/app/services/activo.service';
import { SeccionService } from 'src/app/services/seccion.service';
import { Activo } from '../../interfaces/activo';
import { Seccion } from '../../interfaces/seccion';
import { faEdit, faBook, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-seccion-detalles',
  templateUrl: './seccion-detalles.component.html',
  styleUrls: ['./seccion-detalles.component.css']
})
export class SeccionDetallesComponent implements OnInit {

  // ATRIBUTOS
  private listaActivo: Activo[];
  private seccion: Seccion;
  private faEdit = faEdit;
  private faBook= faBook;
  private faPlus = faPlus;
  private id: number;

  constructor(
    private activoServicio: ActivoService,
    private seccionServicio: SeccionService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  // FUNCIONES
  ObtenerId() {
    this.id = +this.activatedRoute.snapshot.params['id'];
  }

  GetSeccion() {
    this.seccionServicio.GetSeccion(this.id).subscribe(
      res => {
        this.seccion = res.body;
      }
    );
  }

  Agregar(id: number) {
    this.router.navigate(['dashboard/seccion-crear']);
  }

  Editar(id: number) {
    this.router.navigate(['dashboard/seccion-actualizar', id]);
  }

  GetActivosBySeccion() {
    this.activoServicio.GetActivos(this.id).subscribe(
      res => {
        this.listaActivo = res.body;
      }
    );
  }

  ngOnInit() {
    this.ObtenerId();
    this.GetSeccion();
    this.GetActivosBySeccion();
  }

}
