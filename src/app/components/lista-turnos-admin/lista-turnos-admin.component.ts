import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-turnos-admin',
  templateUrl: './lista-turnos-admin.component.html',
  styleUrls: ['./lista-turnos-admin.component.scss']
})
export class ListaTurnosAdminComponent implements OnInit {

  turnosExistentes:any[] = [];

  listadoPacientes:any[] = [];
  listadoEspecialistas:any[] = [];
  constructor(private turno:TurnoService, private authSvc:AuthService, private users:UsersService, private firestore:FirestoreService) { }

  ngOnInit(): void {
    this.listadoPacientes = this.users.listadoPacientes;
    this.listadoEspecialistas = this.users.listadoEspecialistas;

    // Obtengo todos los turnos del especialista seleccionado
    this.turno.traerTodos().subscribe(turnos => {
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
        turno.comentarioAdmin = result.value;
        this.firestore.actualizar('turnos', turno.id, turno);
      }
    })
  }
}
