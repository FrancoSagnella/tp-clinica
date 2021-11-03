import { Usuario } from "./usuario";

export interface Especialista extends Usuario{
  especialidad:string[],
  aprobado:boolean,
  verificado:boolean,
  horario: {empieza:string, termina:string}, // inicio de la jornada, fin de la jornada
  // diasLaborables:string[], // de lunes a sabado..

  diasLaborables:any;
}
