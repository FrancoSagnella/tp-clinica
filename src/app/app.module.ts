import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { UsuariosComponent } from './pages/admin/usuarios/usuarios.component';
import { NavComponent } from './nav/nav.component';
import { PacienteComponent } from './pages/auth/registro/paciente/paciente.component';
import { EspecialistaComponent } from './pages/auth/registro/especialista/especialista.component';
import { AdministradorComponent } from './pages/auth/registro/administrador/administrador.component';
import { ListaAdminsComponent } from './components/lista-admins/lista-admins.component';
import { ListaEspecialistasComponent } from './components/lista-especialistas/lista-especialistas.component';
import { ListaPacientesComponent } from './components/lista-pacientes/lista-pacientes.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxCaptchaModule } from 'ngx-captcha';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TurnosComponent } from './pages/admin/turnos/turnos.component';
import { RegisterComponent } from './pages/auth/registro/register/register.component';
import { EspecialidadesComponent } from './components/especialidades/especialidades.component';
import { EspecialistasElegirComponent } from './components/especialistas-elegir/especialistas-elegir.component';
import { DiasElegirComponent } from './components/dias-elegir/dias-elegir.component';
import { TurnosElegirComponent } from './components/turnos-elegir/turnos-elegir.component';
import { FechaPipe } from './pipes/fecha.pipe';
import { TurnoExistentePipe } from './pipes/turno-existente.pipe';
import { PacienteElegirComponent } from './components/paciente-elegir/paciente-elegir.component';
import { NombreUsuarioPipe } from './pipes/nombre-especialista.pipe';
import { FechaProgramadaPipe } from './pipes/fecha-programada.pipe';
import { CommonModule } from '@angular/common';
import { ListaTurnosEspecialistaComponent } from './components/lista-turnos-especialista/lista-turnos-especialista.component';
import { ListaTurnosPacienteComponent } from './components/lista-turnos-paciente/lista-turnos-paciente.component';
import { VerReseniaComponent } from './components/ver-resenia/ver-resenia.component';
import { ListaTurnosAdminComponent } from './components/lista-turnos-admin/lista-turnos-admin.component';
import { MiPerfilComponent } from './pages/users/mi-perfil/mi-perfil.component';
import { MisTurnosComponent } from './pages/users/mis-turnos/mis-turnos.component';
import { SolicitarTurnoComponent } from './pages/users/solicitar-turno/solicitar-turno.component';
import { UsersModule } from './pages/users/users.module';
import { AdminModule } from './pages/admin/admin.module';
import { AuthModule } from './pages/auth/auth.module';
import { HistoriaClinicaComponent } from './components/historia-clinica/historia-clinica.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { PacienteHistoriaComponent } from './pages/paciente-historia/paciente-historia.component';
import { PipesModule } from './pipes/pipes.module';
import { ReporteIngresosComponent } from './components/reportes/reporte-ingresos/reporte-ingresos.component';
import { ReporteTurnosEspecialidadComponent } from './components/reportes/reporte-turnos-especialidad/reporte-turnos-especialidad.component';
import { ReporteTurnosDiasComponent } from './components/reportes/reporte-turnos-dias/reporte-turnos-dias.component';
import { ReporteTurnosSeleccionadosComponent } from './components/reportes/reporte-turnos-seleccionados/reporte-turnos-seleccionados.component';
import { ReporteTurnosFinalizadosComponent } from './components/reportes/reporte-turnos-finalizados/reporte-turnos-finalizados.component';
import { SoloNumerosDirective } from './directivas/solo-numeros.directive';
import { LargoMaximoDirective } from './directivas/largo-maximo.directive';

@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    NavComponent,
    PacientesComponent,
    PacienteHistoriaComponent,
    // HistoriaClinicaComponent,
    // HistoriaClinicaAdministradorComponent,

    // Componentes de Users
    // MiPerfilComponent,
    // MisTurnosComponent,
    // SolicitarTurnoComponent,

    // ListaTurnosEspecialistaComponent,
    // ListaTurnosPacienteComponent,
    // VerReseniaComponent,
    // PacienteElegirComponent,
    // EspecialidadesComponent,
    // EspecialistasElegirComponent,
    // DiasElegirComponent,
    // TurnosElegirComponent,

    // Componentes de Admin
    // UsuariosComponent,
    // TurnosComponent,

    // ListaAdminsComponent,
    // ListaEspecialistasComponent,
    // ListaPacientesComponent,
    // ListaTurnosAdminComponent,

    // Componentes de Auth
    // PacienteComponent,
    // EspecialistaComponent,
    // AdministradorComponent,
    // RegisterComponent,
    // LoginComponent,

    // FechaPipe,
    // TurnoExistentePipe,
    // NombreUsuarioPipe,
    // FechaProgramadaPipe,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,

    NgxSpinnerModule,
    NgxCaptchaModule,

    UsersModule,
    AdminModule,
    AuthModule,
    PipesModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
