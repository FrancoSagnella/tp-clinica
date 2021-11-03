import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';
import { MisTurnosGuard } from 'src/app/services/mis-turnos.guard';
import { SolicitarTurnoGuard } from 'src/app/services/solicitar-turno.guard';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';

const routes: Routes = [
  {path:'misTurnos',component:MisTurnosComponent, canActivate:[MisTurnosGuard]},
{path:'solicitarTurno',component:SolicitarTurnoComponent, canActivate:[SolicitarTurnoGuard]},
{path:'miPerfil',component:MiPerfilComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
