import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SeccionListComponent } from './components/seccion-list/seccion-list.component';
import { SeccionMantenimientoComponent } from './components/seccion-mantenimiento/seccion-mantenimiento.component';
import { SeccionDetallesComponent } from './components/seccion-detalles/seccion-detalles.component';
import { ActivoListComponent } from './components/activo-list/activo-list.component';
import { ActivoMantenimientoComponent } from './components/activo-mantenimiento/activo-mantenimiento.component';
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'seccion-list', component: SeccionListComponent},
    {path: 'seccion-actualizar/:id', component: SeccionMantenimientoComponent},
    {path: 'seccion-crear', component: SeccionMantenimientoComponent},
    {path: 'seccion-detalles/:id', component: SeccionDetallesComponent},
    {path: 'activo-list', component: ActivoListComponent},
    {path: 'activo-actualizar/:id', component: ActivoMantenimientoComponent}, 
    {path: 'activo-crear', component: ActivoMantenimientoComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
