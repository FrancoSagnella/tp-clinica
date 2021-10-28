import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private authSvc: AuthService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAdmin();
  }

  async checkAdmin(): Promise<boolean>
  {
    const user = this.authSvc.currentUser;
    if(user){
      if(user.perfil == 'administrador')
      {
        return true;
      }
      else
      {
        Swal.fire({
          title:'¡Error!',
          text:'¡Solamente los usuarios administradores pueden entrar a esta sección!',
          icon:'error',
          cancelButtonText:'cerrar'
        });
        this.router.navigateByUrl('/bienvenida');
        return false;
      }
    }
    else{
      Swal.fire({
        title:'¡Error!',
        text:'¡Inice sesión como administrador!',
        icon:'error',
        cancelButtonText:'cerrar'
      });
      this.router.navigateByUrl('/bienvenida');
      return false;
    }
  }
}
