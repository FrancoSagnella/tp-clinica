import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './pages/admin/usuarios/usuarios.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { PacienteComponent } from './pages/auth/registro/paciente/paciente.component';
import { EspecialistaComponent } from './pages/auth/registro/especialista/especialista.component';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { AdministradorComponent } from './pages/auth/registro/administrador/administrador.component';

const routes: Routes = [{path:'bienvenida', component:BienvenidaComponent},
{path:'auth/login', component:LoginComponent},
{path:'auth/registro/paciente',component:PacienteComponent},
{path:'auth/registro/especialista',component:EspecialistaComponent},
{path:'auth/registro/administrador',component:AdministradorComponent},
{path:'admin/usuarios', component:UsuariosComponent},
{path:'**', redirectTo:'bienvenida', pathMatch:'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
