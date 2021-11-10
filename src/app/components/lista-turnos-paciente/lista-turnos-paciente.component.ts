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

  turnosExistentes:Turno[] = [];
  turnosFiltrados:Turno[] = [];

  listadoEspecialistas:any[] = [];
  @Output() mostrarResenia:EventEmitter<any> = new EventEmitter<any>();

  stringFiltro = '';

  constructor(private turno:TurnoService, private authSvc:AuthService, private users:UsersService, private firestore:FirestoreService) { }

  ngOnInit(): void {
    this.listadoEspecialistas = this.users.listadoEspecialistas;
    // Obtengo todos los turnos del especialista seleccionado
    this.turno.traerTodosByPaciente(this.authSvc.currentUser.id).subscribe(turnos => {
      this.turnosExistentes = turnos;
      this.turnosFiltrados = this.turnosExistentes.slice();
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

  filtrar()
  {
    if(this.stringFiltro != '')
    {
      let indiceEliminar:number[]=[];
      this.turnosFiltrados.forEach((element, index) => {
        // Filtro por especialistas
        let especialista=false;
        for(let i = 0;i < this.listadoEspecialistas.length; i++)
        {
          if(element.idEspecialista == this.listadoEspecialistas[i].id && (this.listadoEspecialistas[i].nombre.toLowerCase().includes(this.stringFiltro.toLowerCase()) || this.listadoEspecialistas[i].apellido.toLowerCase().includes(this.stringFiltro.toLowerCase())))
          {
            especialista = true;
            break;
          }
        }

        // Filtro por especialidad
        let especialidad=false;
        if(element.especialidad.toLowerCase().includes(this.stringFiltro.toLowerCase()))
        {
          especialidad=true;
        }

        // Filtro por fecha
        let fecha = new Date(element.fecha);
        let fechaProgramada = fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();
        let filtroFecha=false;
        if(fechaProgramada.toLowerCase().includes(this.stringFiltro.toLowerCase()))
        {
          filtroFecha=true;
        }

        // Filtro por horario
        let filtroHorario=false;
        if(element.hora.toLowerCase().includes(this.stringFiltro.toLowerCase())){
          filtroHorario=true;
        }

        // Filtro por estado
        let filtroEstado=false;
        if(element.estado.toLowerCase().includes(this.stringFiltro.toLowerCase())){
          filtroEstado=true;
        }

        if(!especialista && !especialidad && !filtroFecha && !filtroHorario && !filtroEstado)
        {
          indiceEliminar.push(index);
        }
      });

      let cont=0;
      indiceEliminar.forEach(element => {
        this.turnosFiltrados.splice((element-cont),1);
        cont++;
      });
    }
  }
  limpiarFiltro()
  {
    this.turnosFiltrados = this.turnosExistentes.slice();
  }
}
