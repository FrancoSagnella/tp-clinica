export interface HistoriaClinica {
  id:string,
  idPaciente:string,
  idEspecialista:string,
  altura:number,
  peso:number,
  temepratura:number,
  presion:number,
  fecha:any,
  otros?: {clave:string, valor:any}[],
}
