import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ActivosComponent } from './components/activos/activos.component';
import { SeccionListComponent } from './components/seccion-list/seccion-list.component';
import { SeccionMantenimientoComponent } from './components/seccion-mantenimiento/seccion-mantenimiento.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SeccionDetallesComponent } from './components/seccion-detalles/seccion-detalles.component';
import { ActivoMantenimientoComponent } from './components/activo-mantenimiento/activo-mantenimiento.component';
import { ActivoListComponent } from './components/activo-list/activo-list.component';
import { ActivoService, AlertasService, LoginService, SeccionService, UsuarioService, DepartamentoService, SolicitudService } from './services/index';
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';
import { UsuarioMantenimientoComponent } from './components/usuario-mantenimiento/usuario-mantenimiento.component';
import { DataStorageService } from './services/dataStorage.service';
import { SolicitudBajaComponent } from './components/solicitud-baja/solicitud-baja.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PerfilMantenimientoComponent } from './components/perfil-mantenimiento/perfil-mantenimiento.component';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { DepartamentoMantenimientoComponent } from './components/departamento-mantenimiento/departamento-mantenimiento.component';
import { SolicitudBajaListaComponent } from './components/solicitud-baja-lista/solicitud-baja-lista.component';
import { PdfGeneradorComponent } from './components/pdf-generador/pdf-generador.component';
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
    ActivoListComponent,
    UsuarioListComponent,
    UsuarioMantenimientoComponent,
    SolicitudBajaComponent,
    SidebarComponent,
    PerfilComponent,
    PerfilMantenimientoComponent,
    DepartamentoComponent,
    DepartamentoMantenimientoComponent,
    SolicitudBajaListaComponent,
    PdfGeneradorComponent
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
    AlertasService,
    ActivoService,
    UsuarioService,
    DataStorageService,
    DepartamentoService,
    SolicitudService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
