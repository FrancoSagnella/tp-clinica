import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './pages/admin/usuarios/usuarios.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { PacienteComponent } from './pages/auth/registro/paciente/paciente.component';
import { EspecialistaComponent } from './pages/auth/registro/especialista/especialista.component';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { AdministradorComponent } from './pages/auth/registro/administrador/administrador.component';
import { AdminGuard } from './services/admin.guard';
import { MisTurnosComponent } from './pages/users/mis-turnos/mis-turnos.component';
import { SolicitarTurnoComponent } from './pages/users/solicitar-turno/solicitar-turno.component';
import { MiPerfilComponent } from './pages/users/mi-perfil/mi-perfil.component';
import { TurnosComponent } from './pages/admin/turnos/turnos.component';
import { MisTurnosGuard } from './services/mis-turnos.guard';
import { SolicitarTurnoGuard } from './services/solicitar-turno.guard';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [{path:'bienvenida', component:BienvenidaComponent},
{path:'auth/login', component:LoginComponent},
{path:'auth/registro/paciente',component:PacienteComponent},
{path:'auth/registro/especialista',component:EspecialistaComponent},
{path:'auth/registro/administrador',component:AdministradorComponent, canActivate: [AdminGuard]},
{path:'admin/usuarios', component:UsuariosComponent, canActivate: [AdminGuard]},
{path:'admin/turnos', component:TurnosComponent, canActivate: [AdminGuard]},
{path:'users/misTurnos',component:MisTurnosComponent, canActivate:[MisTurnosGuard]},
{path:'users/solicitarTurno',component:SolicitarTurnoComponent, canActivate:[SolicitarTurnoGuard]},
{path:'users/miPerfil',component:MiPerfilComponent, canActivate:[AuthGuard]},
{path:'**', redirectTo:'bienvenida', pathMatch:'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
