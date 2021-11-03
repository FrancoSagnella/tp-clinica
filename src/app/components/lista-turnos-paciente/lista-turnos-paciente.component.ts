import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-turnos-paciente',
  templateUrl: './lista-turnos-paciente.component.html',
  styleUrls: ['./lista-turnos-paciente.component.scss']
})
export class ListaTurnosPacienteComponent implements OnInit {

  turnosExistentes:any[] = [];

  listadoEspecialistas:any[] = [];
  @Output() mostrarResenia:EventEmitter<any> = new EventEmitter<any>();

  constructor(private turno:TurnoService, private authSvc:AuthService, private users:UsersService, private firestore:FirestoreService) { }

  ngOnInit(): void {
    this.listadoEspecialistas = this.users.listadoEspecialistas;
    // Obtengo todos los turnos del especialista seleccionado
    this.turno.traerTodosByPaciente(this.authSvc.currentUser.id).subscribe(turnos => {
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
        turno.comentarioPaciente = result.value;
        this.firestore.actualizar('turnos', turno.id, turno);
      }
    })
  }

  verResenia(turno:Turno)
  {
    console.log('entra aca');
    this.mostrarResenia.emit(turno);
  }

  completarEncuesta(turno:Turno)
  {

  }

  calificarTurno(turno:Turno)
  {
    Swal.fire({
      title: 'Calificá el turno',
      input: 'number',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        turno.tieneCalificacion = true;
        turno.calificacion = result.value;
        this.firestore.actualizar('turnos', turno.id, turno);
      }
    })
  }
}
