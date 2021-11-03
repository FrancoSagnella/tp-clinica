import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombrePaciente'
})
export class NombrePacientePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let retorno:any;

    args[0].forEach((element:any) => {
      if(value == element.id)
      {
        retorno = element.apellido+', '+element.nombre;
      }
    });
    return retorno;
  }

}
