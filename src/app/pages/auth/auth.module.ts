import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxCaptchaModule } from 'ngx-captcha';
import { PacienteComponent } from './registro/paciente/paciente.component';
import { EspecialistaComponent } from './registro/especialista/especialista.component';
import { AdministradorComponent } from './registro/administrador/administrador.component';
import { RegisterComponent } from './registro/register/register.component';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FechaPipe } from 'src/app/pipes/fecha.pipe';
import { TurnoExistentePipe } from 'src/app/pipes/turno-existente.pipe';


@NgModule({
  declarations: [
    PacienteComponent,
    EspecialistaComponent,
    AdministradorComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    // BrowserModule,
    // BrowserAnimationsModule,

    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    NgxSpinnerModule,
    NgxCaptchaModule,
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AuthModule { }
