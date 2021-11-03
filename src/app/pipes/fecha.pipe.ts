import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(value: any, ...args: any[]): unknown {

    let retorno = '';
    console.info('argumentos', args)
    if(!(args[1] == 1))
    {
      switch(args[0])
      {
        case 'dia':
          switch(value.getDay())
          {
            case 1:
              retorno+='Lunes';
              break;
            case 2:
              retorno+='Martes';
              break;
            case 3:
              retorno+='Miercoles';
              break;
            case 4:
              retorno+='Jueves';
              break;
            case 5:
              retorno+='Viernes';
              break;
            case 6:
              retorno+='Sabado';
              break;
          }
          break;
        case 'fecha':
          retorno = value.getDate();
          break;
        case 'mes':
          switch(value.getMonth()+1)
          {
            case 1:
              retorno+='Enero';
              break;
            case 2:
              retorno+='Febrero';
              break;
            case 3:
              retorno+='Marzo';
              break;
            case 4:
              retorno+='Abril';
              break;
            case 5:
              retorno+='Mayo';
              break;
            case 6:
              retorno+='Junio';
              break;
            case 7:
              retorno+='Julio';
              break;
            case 8:
              retorno+='Agosto';
              break;
            case 9:
              retorno+='Septiembre';
              break;
            case 10:
              retorno+='Octubre';
              break;
            case 11:
              retorno+='Noviembre';
              break;
            case 12:
              retorno+='Diciembre';
              break;
          }
          break;
      }
    }
    else
    {
      switch(args[0])
      {
        case 'dia':
          retorno = value.getDay();
          break;
        case 'fecha':
          retorno = value.getDate();
          break;
        case 'mes':
          retorno = value.getMonth()+1;
          break;
      }
    }

    return retorno;
  }

}
