import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/services/admin.guard';
import { ReportesComponent } from './reportes/reportes.component';
import { TurnosComponent } from './turnos/turnos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {path:'usuarios', component:UsuariosComponent, canActivate: [AdminGuard]},
  {path:'turnos', component:TurnosComponent, canActivate: [AdminGuard]},
  {path:'reportes', component:ReportesComponent, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
