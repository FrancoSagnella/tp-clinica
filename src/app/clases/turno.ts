export interface Turno {
  id:string,
  idPaciente:string,
  idEspecialista:string,
  fecha:string;
  estado:string, // pendiente, finalizado, cancelado, aceptado, rechazado
  duracion:number, // en minutos
  fechaCreacion:string,
  reseña:string, // comentario que deja el paciente (al finalizar el turno)
  calificacion:number, // calificacion que deja el paciente (al finalizar el turno)
  encuestaRealizada:boolean,
}
