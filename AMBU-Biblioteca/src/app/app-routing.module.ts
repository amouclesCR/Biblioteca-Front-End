import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SeccionListComponent } from './components/seccion-list/seccion-list.component';
import { SeccionMantenimientoComponent } from './components/seccion-mantenimiento/seccion-mantenimiento.component';
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'seccion-list', component: SeccionListComponent},
    {path: 'seccion-actualizar', component: SeccionMantenimientoComponent},
    {path: 'seccion-crear', component: SeccionMantenimientoComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
