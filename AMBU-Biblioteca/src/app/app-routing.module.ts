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
import { PdfGeneradorComponent } from './components/pdf-generador/pdf-generador.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { UsuarioMantenimientoComponent } from './components/usuario-mantenimiento/usuario-mantenimiento.component';
import { AccountComponent } from './components/account/account.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { AutenticacionGuard } from './guards/autenticacion.guard';
import { AutorizadoGuard } from './guards/autorizado.guard';
const routes: Routes = [
  {path: 'account', component: AccountComponent, children: [
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'recovery', component: RecoveryComponent},
  ]},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'seccion-list', component: SeccionListComponent},
    {path: 'seccion-actualizar/:id', component: SeccionMantenimientoComponent, canActivate: [AutorizadoGuard], data: {role: ['admin']} },
    {path: 'seccion-crear', component: SeccionMantenimientoComponent ,canActivate: [AutorizadoGuard], data: {role: ['admin']}},
    {path: 'seccion-detalles/:id', component: SeccionDetallesComponent},
    {path: 'activo-list', component: ActivoListComponent},
    {path: 'activo-actualizar/:id', component: ActivoMantenimientoComponent, canActivate: [AutorizadoGuard], data: {role: ['admin']}}, 
    {path: 'activo-crear', component: ActivoMantenimientoComponent, canActivate: [AutorizadoGuard], data: {role: ['admin']}},
    {path: 'usuario-list', component: UsuarioListComponent},
    {path: 'usuario-mantenimiento', component: UsuarioMantenimientoComponent},
    {path: 'usuario-mantenimiento/:id', component: UsuarioMantenimientoComponent, canActivate: [AutorizadoGuard], data: {role: ['admin']}},
    {path: 'solicitud-baja', component: SolicitudBajaComponent},
    {path: 'solicitudes', component: SolicitudesComponent, canActivate: [AutorizadoGuard], data: {role: ['admin']}},
    {path: 'perfil', component: PerfilComponent},
    {path: 'perfil-editar', component: PerfilMantenimientoComponent},
    {path: 'departamento-mantenimiento/:id', component: DepartamentoMantenimientoComponent},
    {path: 'visualizar-pdf/:id', component: PdfGeneradorComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'seccion-list'}
  ], canActivate: [AutenticacionGuard], data: {role: ['normal','admin']}},
  {path: '**', pathMatch: 'full', redirectTo: 'dashboard/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
