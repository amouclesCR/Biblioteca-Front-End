import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SeccionListComponent } from './components/seccion-list/seccion-list.component';
import { SeccionMantenimientoComponent } from './components/seccion-mantenimiento/seccion-mantenimiento.component';
import { SeccionDetallesComponent } from './components/seccion-detalles/seccion-detalles.component';
import { ActivoListComponent } from './components/activo-list/activo-list.component';
import { ActivoMantenimientoComponent } from './components/activo-mantenimiento/activo-mantenimiento.component';
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';
import { SolicitudBajaComponent } from './components/solicitud-baja/solicitud-baja.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PerfilMantenimientoComponent } from './components/perfil-mantenimiento/perfil-mantenimiento.component';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { DepartamentoMantenimientoComponent } from './components/departamento-mantenimiento/departamento-mantenimiento.component';
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'seccion-list', component: SeccionListComponent},
    {path: 'seccion-actualizar/:id', component: SeccionMantenimientoComponent},
    {path: 'seccion-crear', component: SeccionMantenimientoComponent},
    {path: 'seccion-detalles/:id', component: SeccionDetallesComponent},
    {path: 'activo-list', component: ActivoListComponent},
    {path: 'activo-actualizar/:id', component: ActivoMantenimientoComponent}, 
    {path: 'activo-crear', component: ActivoMantenimientoComponent},
    {path: 'usuario-list', component: UsuarioListComponent},
    {path: 'solicitud-baja', component: SolicitudBajaComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'perfil-editar', component: PerfilMantenimientoComponent},
    {path: 'departamento-list', component: DepartamentoComponent},
    {path: 'departamento-crear', component: DepartamentoMantenimientoComponent},
    {path: 'departamento-mantenimiento/:id', component: DepartamentoMantenimientoComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'seccion-list'}
  ]},
  {path: '**', pathMatch: 'full', redirectTo: 'dashboard/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
