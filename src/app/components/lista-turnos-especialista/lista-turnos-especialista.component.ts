import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-turnos-especialista',
  templateUrl: './lista-turnos-especialista.component.html',
  styleUrls: ['./lista-turnos-especialista.component.scss']
})
export class ListaTurnosEspecialistaComponent implements OnInit {

  turnosExistentes:any[] = [];

  listadoPacientes:any[] = [];
  @Output() mostrarResenia:EventEmitter<any> = new EventEmitter<any>();
  constructor(private turno:TurnoService, private authSvc:AuthService, private users:UsersService, private firestore:FirestoreService) { }

  ngOnInit(): void {
    this.listadoPacientes = this.users.listadoPacientes;
    // Obtengo todos los turnos del especialista seleccionado
    this.turno.traerTodosByEspecialista(this.authSvc.currentUser.id).subscribe(turnos => {
      this.turnosExistentes = turnos;
      // console.info('turnos', this.turnosExistentes);
    });
  }

  cancelarTurno(turno:Turno)
  {
    Swal.fire({
      title: 'Dejá tu comentario',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        turno.estado = 'cancelado';
        turno.resenia = true;
        turno.comentarioEspecialista = result.value;
        this.firestore.actualizar('turnos', turno.id, turno);
      }
    })
  }
  rechazarTurno(turno:Turno)
  {
    Swal.fire({
      title: 'Dejá tu comentario',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        turno.estado = 'rechazado';
        turno.resenia = true;
        turno.comentarioEspecialista = result.value;
        this.firestore.actualizar('turnos', turno.id, turno);
      }
    })
  }
  aceptarTurno(turno:Turno)
  {
    turno.estado = 'aceptado';
    this.firestore.actualizar('turnos', turno.id, turno);
  }
  finalizarTurno(turno:Turno)
  {
    Swal.fire({
      title: 'Dejá tu reseña',
      html: `<input type="text" id="comentario" class="swal2-input" placeholder="Comentario">
      <input type="text" id="diagnostico" class="swal2-input" placeholder="Diagnostico">`,
      confirmButtonText: 'Enviar',
      focusConfirm: false,
      preConfirm: () => {
        let comentario!:any;
        let diagnostico!:any;
        comentario = (<HTMLInputElement>Swal.getPopup()!.querySelector('#comentario')).value;
        diagnostico = (<HTMLInputElement>Swal.getPopup()!.querySelector('#diagnostico')).value;
        if (!comentario || !diagnostico) {
          Swal.showValidationMessage(`Please enter login and password`)
        }
        return { comentario: comentario, diagnostico: diagnostico }
      }
    }).then((result) => {
      turno.estado = 'finalizado';
      turno.resenia = true;
      turno.comentarioEspecialista = result.value!.comentario;
      turno.diagnostico = result.value!.diagnostico;
      this.firestore.actualizar('turnos', turno.id, turno).then(()=>{
        Swal.fire(`
          Reseña cargada con exito
        `)
      })
      });
  }
  verResenia(turno:Turno)
  {
    this.mostrarResenia.emit(turno);
  }

}
