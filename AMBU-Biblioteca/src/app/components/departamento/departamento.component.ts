import { Component, OnInit } from '@angular/core';
import { Departamento } from 'src/app/interfaces/departamento';
import { DepartamentoService } from 'src/app/services/index';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {

  //  ATRIBUTOS
  private listaDepartamento: Departamento[];
  private faEdit = faEdit;
  private faPlus = faPlus;

  constructor(
    private departementoServicio: DepartamentoService,
    private router: Router
  ) { }

  //  FUNCIONES
  getDepartamentos() {
    this.departementoServicio.Getdepartamentos().subscribe(
      res => {
        this.listaDepartamento = res.body;
      }
    );
  }

  editar(id: number) {
    this.router.navigate(['dashboard/departamento-mantenimiento', id]);
  }

  crear() {
    this.router.navigate(['dashboard/departamento-crear']);
  }

  ngOnInit() {
    this.getDepartamentos();
  }

}
