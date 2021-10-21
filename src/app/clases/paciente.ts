import { Usuario } from "./usuario";

export interface Paciente extends Usuario{
  obraSocial:string,
  foto2:string,
  verificado:boolean,
}
