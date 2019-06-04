import { Component, OnInit } from '@angular/core';
import { SeccionService, PermisosService } from '../../services/index';
import { Seccion } from 'src/app/interfaces/index';
import { faEdit, faBook, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
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
  private pageSize = 10;
  private page = 1;

  constructor(
    private seccionService: SeccionService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private permisos: PermisosService
  ) { }

  // FUNCIONES
  getSecciones() {
    this.seccionService.getSecciones().subscribe(
      res => {
        this.listaSeccion = res.body;
        this.ngxService.stopLoader('load');
      },  
      err => {
        this.ngxService.stopLoader('load');
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
    this.ngxService.startLoader('load');
    this.listaSeccion = [];
    this.getSecciones();
  }

}
