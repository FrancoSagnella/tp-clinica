import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuarios/usuarios';
import { usuarios } from '../interfaces/usuarios/usuarios';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuarioLogueado?:Usuario;
  estaLogueado!: Observable<boolean>;
  constructor() { }

  iniciarSesion(usuario:Usuario){
    let ret:boolean = false;
    usuarios.forEach(element => {
      if(element.email == usuario.email && element.password == usuario.password)
      {
        this.usuarioLogueado = element;
        ret = true;
      }
    });
    return ret;
  }

  cerrarSesion(){
    this.usuarioLogueado = undefined;
  }
}
