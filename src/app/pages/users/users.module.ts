import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaTurnosEspecialistaComponent } from 'src/app/components/lista-turnos-especialista/lista-turnos-especialista.component';
import { ListaTurnosPacienteComponent } from 'src/app/components/lista-turnos-paciente/lista-turnos-paciente.component';
import { VerReseniaComponent } from 'src/app/components/ver-resenia/ver-resenia.component';
import { PacienteElegirComponent } from 'src/app/components/paciente-elegir/paciente-elegir.component';
import { EspecialidadesComponent } from 'src/app/components/especialidades/especialidades.component';
import { DiasElegirComponent } from 'src/app/components/dias-elegir/dias-elegir.component';
import { TurnosElegirComponent } from 'src/app/components/turnos-elegir/turnos-elegir.component';
import { FechaPipe } from 'src/app/pipes/fecha.pipe';
import { TurnoExistentePipe } from 'src/app/pipes/turno-existente.pipe';
import { NombreUsuarioPipe } from 'src/app/pipes/nombre-especialista.pipe';
import { FechaProgramadaPipe } from 'src/app/pipes/fecha-programada.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxCaptchaModule } from 'ngx-captcha';
import { EspecialistasElegirComponent } from 'src/app/components/especialistas-elegir/especialistas-elegir.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { HistoriaClinicaComponent } from 'src/app/components/historia-clinica/historia-clinica.component';

@NgModule({
  declarations: [
    MiPerfilComponent,
    MisTurnosComponent,
    SolicitarTurnoComponent,
    ListaTurnosEspecialistaComponent,
    ListaTurnosPacienteComponent,
    VerReseniaComponent,
    PacienteElegirComponent,
    EspecialidadesComponent,
    EspecialistasElegirComponent,
    DiasElegirComponent,
    TurnosElegirComponent,
    HistoriaClinicaComponent,

    // FechaPipe,
    // TurnoExistentePipe,
    // NombreUsuarioPipe,
    // FechaProgramadaPipe,
  ],
  imports: [
    CommonModule,
    // BrowserModule,
    // BrowserAnimationsModule,

    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    NgxSpinnerModule,
    NgxCaptchaModule,

    PipesModule
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UsersModule { }
