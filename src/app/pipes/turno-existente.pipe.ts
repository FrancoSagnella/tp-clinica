import { Pipe, PipeTransform } from '@angular/core';
import { Turno } from '../clases/turno';
import { FechaPipe } from './fecha.pipe';

@Pipe({
  name: 'turnoExistente'
})
export class TurnoExistentePipe implements PipeTransform {

  transform(value: any, ...args: any[]): boolean {

    let ret = true;
    let BreakExcepion = {};

    try
    {
      value.forEach((element:Turno) => {
        let fecha = new Date(element.fecha);
        if(element.hora == args[0] && fecha.getDay() == args[1] && fecha.getDate() == args[2] && fecha.getMonth()+1 == args[3] && (element.estado == 'pendiente' || element.estado == 'aceptado'))
        {
          ret = false;
          throw BreakExcepion;
        }
      });
    }
    catch(e){}
    return ret;
  }

}
