import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';
import { Turno } from '../clases/turno';
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  horariosTodos:string[] = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30','19:00'];
  horariosManiana:string[] = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30'];
  horariosTarde:string[] = ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30','19:00'];

  referenciaColeccion:AngularFirestoreCollection;

  constructor(private router:Router, private spinner:NgxSpinnerService, private firestore:FirestoreService, private authSvc:AuthService, private afs:AngularFirestore) {
    this.referenciaColeccion = this.afs.collection('turnos', ref => ref.orderBy('fechaCreacion', 'desc'));
  }

  crearTurno(paciente:string, especialista:string, especialidad:string, fecha:any, hora:string)
  {
    let turno:Turno = {id:this.afs.createId(),
      idPaciente:paciente,
      idEspecialista:especialista,
      especialidad:especialidad,
      fecha:fecha.getTime(),
      hora:hora,
      estado:'pendiente',
      duracion:30,
      fechaCreacion:new Date().getTime(),
      resenia:false,
      comentarioPaciente:'',
      comentarioEspecialista:'',
      comentarioAdmin:'',
      diagnostico:'',
      tieneCalificacion:false,
      calificacion:0,
      encuestaRealizada:false};

      // agregar spinner
      this.spinner.show();
    this.firestore.actualizar('turnos', turno.id, turno).then(()=>{
      // terminar spinner
      this.spinner.hide();
      Swal.fire({
        title:'Turno Creado',
        icon:'success',
        text:'Turno creado exitosamente',
        cancelButtonText:'Cerrar',
      });
    this.router.navigateByUrl('/bienvenida');
    });
  }

  traerTodos()
  {
    return this.referenciaColeccion.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Turno))
    )
  }

  traerEntreFechas(desde:number, hasta:number)
  {
    let reference = this.afs.collection('turnos', ref => ref.where('fecha', '>=', desde).where('fecha', '<=', hasta));
    return reference.snapshotChanges().pipe(
      map(actions =>  actions.map(a => a.payload.doc.data() as Turno))
    )
  }

  traerFechaDesde(desde:number)
  {
    let reference = this.afs.collection('turnos', ref => ref.where('fecha', '>=', desde));
    return reference.snapshotChanges().pipe(
      map(actions =>  actions.map(a => a.payload.doc.data() as Turno))
    )
  }

  traerFechaHasta(hasta:number)
  {
    let reference = this.afs.collection('turnos', ref => ref.where('fecha', '<=', hasta));
    return reference.snapshotChanges().pipe(
      map(actions =>  actions.map(a => a.payload.doc.data() as Turno))
    )
  }

  traerTodosByEspecialista(idEspecialista:string)
  {
    return this.traerTodos().pipe(
      map(turnos => turnos.filter(
        turno => turno.idEspecialista == idEspecialista))
    );
  }

  traerTodosByPaciente(idPaciente:string)
  {
    return this.traerTodos().pipe(
      map(turnos => turnos.filter(
        turno => turno.idPaciente == idPaciente))
    );
  }
}
