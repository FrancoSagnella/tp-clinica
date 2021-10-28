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
import { MisTurnosComponent } from './pages/users/mis-turnos/mis-turnos.component';
import { SolicitarTurnoComponent } from './pages/users/solicitar-turno/solicitar-turno.component';
import { MiPerfilComponent } from './pages/users/mi-perfil/mi-perfil.component';
import { TurnosComponent } from './pages/admin/turnos/turnos.component';
// import { SpinnersAngularModule } from 'spinners-angular';
@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    LoginComponent,
    UsuariosComponent,
    NavComponent,
    PacienteComponent,
    EspecialistaComponent,
    AdministradorComponent,
    ListaAdminsComponent,
    ListaEspecialistasComponent,
    ListaPacientesComponent,
    MisTurnosComponent,
    SolicitarTurnoComponent,
    MiPerfilComponent,
    TurnosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    // SpinnersAngularModule
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgxCaptchaModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
