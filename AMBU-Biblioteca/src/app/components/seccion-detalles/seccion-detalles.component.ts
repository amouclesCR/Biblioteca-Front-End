import { Component, OnInit } from '@angular/core';
import { ActivoService, SeccionService } from 'src/app/services/index';
import { Activo, Seccion } from '../../interfaces/index';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
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
  private vacio: boolean;
  private pag = 1;
  private pageSize = 5;

  constructor(
    private activoServicio: ActivoService,
    private seccionServicio: SeccionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ngxService: NgxUiLoaderService
  ) { }

  // FUNCIONES
  obtenerId() {
    this.id = +this.activatedRoute.snapshot.params['id'];
  }

  getSeccion() {
    this.seccionServicio.getSeccion(this.id).subscribe(
      res => {
        this.seccion = res.body;
        this.getActivosBySeccion();
      }, 
      err => {
        this.ngxService.stopLoader('load');
      }
    );
  }

  agregar(id: number) {
    this.router.navigate(['dashboard/activo-crear']);
  }

  editar(id: number) {
    this.router.navigate(['dashboard/activo-actualizar', id]);
  }

  getActivosBySeccion() {
    this.activoServicio.getActivosBySeccion(this.id).subscribe(
      res => {
        this.listaActivo = res.body;
        this.vacio = !(this.listaActivo.length > 0);
        this.ngxService.stopLoader('load');
      },
      err => {
        this.ngxService.stopLoader('load');
      }
    );
  }

  ngOnInit() {
    this.ngxService.startLoader('load');
    this.obtenerId();
    this.getSeccion();
  }

}
