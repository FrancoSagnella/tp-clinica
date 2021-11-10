import { refsToArray } from '@angular/compiler/src/render3/util';
import { Pipe, PipeTransform } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { UsersService } from '../services/users.service';

@Pipe({
  name: 'nombreUsuario'
})
export class NombreUsuarioPipe implements PipeTransform {

  constructor(){}

  transform(value: any, ...args: any[]): any {
    let retorno:any;

    console.log(value);
    console.log(args[0])
    args[0].forEach((element:any) => {
      if(value == element.id)
      {
        retorno = element.apellido+', '+element.nombre;
      }
    });
    return retorno;
  }

}
