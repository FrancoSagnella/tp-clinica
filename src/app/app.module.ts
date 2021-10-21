import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    LoginComponent,
    UsuariosComponent,
    NavComponent,
    PacienteComponent,
    EspecialistaComponent,
    AdministradorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
