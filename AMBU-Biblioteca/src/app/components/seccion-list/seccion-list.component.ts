import { Component, OnInit } from '@angular/core';
import { SeccionService } from '../../services/seccion.service';
import { Seccion } from 'src/app/interfaces/seccion';
@Component({
  selector: 'app-seccion-list',
  templateUrl: './seccion-list.component.html',
  styleUrls: ['./seccion-list.component.css']
})
export class SeccionListComponent implements OnInit {

  // ATRIBUTOS
  private listaSeccion: Seccion[];

  constructor(
    private seccionService: SeccionService
  ) { }

  // FUNCIONES
  GetSecciones() {
    this.seccionService.GetSecciones().subscribe(
      res => {
        this.listaSeccion = res.body;
      });
  }

  ngOnInit() {
    this.GetSecciones();
  }

}
