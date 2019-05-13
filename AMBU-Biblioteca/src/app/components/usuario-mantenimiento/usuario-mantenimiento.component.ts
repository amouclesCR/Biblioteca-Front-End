import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario, Rol } from 'src/app/interfaces/index';
import { UsuarioService } from 'src/app/services/index';
import { RolService } from 'src/app/services/rol.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
@Component({
  selector: 'app-usuario-mantenimiento',
  templateUrl: './usuario-mantenimiento.component.html',
  styleUrls: ['./usuario-mantenimiento.component.css']
})
export class UsuarioMantenimientoComponent implements OnInit {

  //  ATRIBUTOS
  private id: number;
  private usuario: Usuario;
  private listaRol: Rol[];
  private formGroupUsuario: FormGroup;

  constructor(
    private activeRoute: ActivatedRoute,
    private location: Location, 
    private usuarioServicio: UsuarioService,
    private rolServicio: RolService, 
    private formBuilderUsuario: FormBuilder
  ) { }

  //  FUNCIONES
  obtenerId() {
    this.id = +this.activeRoute.snapshot.params['id'];
  }

  obtenerRoles() {
    this.rolServicio.getRol().subscribe(
      res => {
        this.listaRol = res.body;
      }
    );
  }

  obtenerUsuario() {
    if (this.id) {
      this.usuarioServicio.GetUsuario(this.id).subscribe(
        res => {
          this.usuario = res.body;
          this.cargarFormulario();
        }
      );
    }
  }

  cargarFormulario() {
    this.formGroupUsuario.patchValue({
      identificacion: this.usuario.usu_identificacion,
      correo: this.usuario.usu_correo,
      roles: this.usuario.usu_rol
    });
  }

  inicializarFormulario() {
    this.formGroupUsuario = this.formBuilderUsuario.group({
      identificacion: ['', Validators.required],
      correo: ['', Validators.required],
      roles: ['', Validators.required]
    });
  }

  submit() {
    this.usuario.usu_rol = this.fGControls.roles.value;
    this.usuarioServicio.UpdateUsuario(this.usuario).subscribe(
      res => {
        this.location.back();
      }
    );
  }

  get fGControls() {
    return this.formGroupUsuario.controls;
  }

  ngOnInit() {
    this.obtenerId();
    this.inicializarFormulario();
    this.obtenerRoles();
    this.obtenerUsuario();
  }

}
