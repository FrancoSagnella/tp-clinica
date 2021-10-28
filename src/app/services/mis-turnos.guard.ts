import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MisTurnosGuard implements CanActivate {

  constructor(
    private router: Router,
    private authSvc: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.authSvc.currentUser)
    {
      if(this.authSvc.currentUser.perfil == 'administrador')
      {
        Swal.fire({
          title:'Error',
          text:'Solo Pacientes y Especialistas tienen acceso',
          icon:'error',
          cancelButtonText:'Cerrar',
        });
        return false;
      }
      else
      {
        return true;
      }
    }
    else
    {
      Swal.fire({
        title:'Error',
        text:'Inice sesión',
        icon:'error',
        cancelButtonText:'Cerrar',
      });
      return false;
    }
  }

}
