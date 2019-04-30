import { Component, OnInit } from '@angular/core';
import { ActivoService, SeccionService } from 'src/app/services/index';
import { Activo, Seccion } from '../../interfaces/index';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
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
    this.router.navigate(['dashboard/activo-crear']);
  }

  Editar(id: number) {
    this.router.navigate(['dashboard/activo-actualizar', id]);
  }

  GetActivosBySeccion() {
    this.activoServicio.GetActivosBySeccion(this.id).subscribe(
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
