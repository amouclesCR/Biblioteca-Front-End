import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertasService } from '../../services/alertas.service';
import {} from '../../interfaces/activo';
import { ActivoService } from '../../services/activo.service';
  import { from } from 'rxjs';
@Component({
  selector: 'app-activo-mantenimiento',
  templateUrl: './activo-mantenimiento.component.html',
  styleUrls: ['./activo-mantenimiento.component.css']
})
export class ActivoMantenimientoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
