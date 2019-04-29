import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ActivosComponent } from './components/activos/activos.component';
import { SeccionListComponent } from './components/seccion-list/seccion-list.component';
import { SeccionMantenimientoComponent } from './components/seccion-mantenimiento/seccion-mantenimiento.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SeccionDetallesComponent } from './components/seccion-detalles/seccion-detalles.component';
import { SeccionService } from './services/seccion.service';
import { AlertasService } from './services/alertas.service';
import { ActivoMantenimientoComponent } from './components/activo-mantenimiento/activo-mantenimiento.component';
import { ActivoListComponent } from './components/activo-list/activo-list.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    ActivosComponent,
    SeccionListComponent,
    SeccionMantenimientoComponent,
    SeccionDetallesComponent,
    ActivoMantenimientoComponent,
    ActivoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    LoginService,
    SeccionService, 
    AlertasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
