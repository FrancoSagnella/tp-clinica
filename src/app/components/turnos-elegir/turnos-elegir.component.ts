import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { FirestoreService } from 'src/app/services/firestore.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-turnos-elegir',
  templateUrl: './turnos-elegir.component.html',
  styleUrls: ['./turnos-elegir.component.scss']
})
export class TurnosElegirComponent implements OnInit {

  @Input() especialista:any;
  @Input() dia:any;

  @Output() seleccionarHorario:EventEmitter<any> = new EventEmitter<any>();

  horasAMostrar:any;
  turnosExistentes:any;

  constructor(private turno:TurnoService) { }

  async ngOnInit() {

    // Obtengo todos los turnos del especialista seleccionado
    this.turno.traerTodosByEspecialista(this.especialista.id).subscribe(turnos => {
      this.turnosExistentes = turnos;
      console.info('turnos', this.turnosExistentes);
    });

    if(this.especialista.horario.empieza == '8:00' && this.especialista.horario.termina == '19:00')
    {
      this.horasAMostrar = ['8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14;00','14;30','15:00','15:30','16:00','16;30','17:00','17:30','18:00','18:30','19:00'];
    }
    else if(this.especialista.horario.empieza == '8:00' && this.especialista.horario.termina == '13:30')
    {
      this.horasAMostrar = ['8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30'];
    }
    else
    {
      this.horasAMostrar = ['14;00','14;30','15:00','15:30','16:00','16;30','17:00','17:30','18:00','18:30','19:00'];
    }
  }

  elegirHorario(hora:any)
  {
    this.seleccionarHorario.emit(hora);
  }

}
