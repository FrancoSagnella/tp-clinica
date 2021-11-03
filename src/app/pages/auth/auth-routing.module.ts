import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/services/admin.guard';
import { LoginComponent } from './login/login.component';
import { AdministradorComponent } from './registro/administrador/administrador.component';
import { EspecialistaComponent } from './registro/especialista/especialista.component';
import { PacienteComponent } from './registro/paciente/paciente.component';
import { RegisterComponent } from './registro/register/register.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
{path:'registro', component:RegisterComponent},
{path:'registro/paciente',component:PacienteComponent},
{path:'registro/especialista',component:EspecialistaComponent},
{path:'registro/administrador',component:AdministradorComponent, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
