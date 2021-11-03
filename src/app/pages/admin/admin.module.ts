import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TurnosComponent } from './turnos/turnos.component';
import { ListaAdminsComponent } from 'src/app/components/lista-admins/lista-admins.component';
import { ListaEspecialistasComponent } from 'src/app/components/lista-especialistas/lista-especialistas.component';
import { ListaPacientesComponent } from 'src/app/components/lista-pacientes/lista-pacientes.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ListaTurnosAdminComponent } from 'src/app/components/lista-turnos-admin/lista-turnos-admin.component';
import { FechaPipe } from 'src/app/pipes/fecha.pipe';
import { TurnoExistentePipe } from 'src/app/pipes/turno-existente.pipe';
import { NombreUsuarioPipe } from 'src/app/pipes/nombre-especialista.pipe';
import { FechaProgramadaPipe } from 'src/app/pipes/fecha-programada.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [
    UsuariosComponent,
    TurnosComponent,
    ListaAdminsComponent,
    ListaEspecialistasComponent,
    ListaPacientesComponent,
    ListaTurnosAdminComponent,

    // FechaPipe,
    // TurnoExistentePipe,
    // NombreUsuarioPipe,
    // FechaProgramadaPipe,
  ],
  imports: [
    CommonModule,
    // BrowserModule,
    // BrowserAnimationsModule,

    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    NgxCaptchaModule,
    NgxSpinnerModule,

    PipesModule
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AdminModule { }
