import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { HistoriaClinica } from '../clases/historiaClinica';
import { Turno } from '../clases/turno';
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class HistoriaMedicaService {

  referenciaColeccion:any;
  constructor(private router:Router, private spinner:NgxSpinnerService, private firestore:FirestoreService, private authSvc:AuthService, private afs:AngularFirestore) {
    this.referenciaColeccion = this.afs.collection('historiasMedicas', ref => ref.orderBy('fecha', 'desc'));
   }

   crearHistoriaMedica(turno:Turno, altura:number, peso:number, temperatura:number, presion:number, otros:any)
  {
    let historiaMedica:HistoriaClinica = {id:this.afs.createId(),
      idPaciente:turno.idPaciente,
      idEspecialista:turno.idEspecialista,
      altura:altura,
      fecha:new Date().getTime(),
      peso:peso,
      temepratura:temperatura,
      presion:presion,
      otros:otros};

      // agregar spinner
      this.spinner.show();
    this.firestore.actualizar('historiasMedicas', historiaMedica.id, historiaMedica).then(()=>{
      // terminar spinner
      this.spinner.hide();
      Swal.fire({
        title:'Historia Clinica Creado',
        icon:'success',
        text:'Historia Clinica creada exitosamente',
        cancelButtonText:'Cerrar',
      });
    this.router.navigateByUrl('/user/misTurnos');
    });
  }
}
