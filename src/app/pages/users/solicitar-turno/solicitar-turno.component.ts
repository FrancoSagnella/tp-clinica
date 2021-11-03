import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/clases/especialista';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {

  estadoAlta:number = 1;

  pacienteSeleccionado:any;
  especialistaSeleccionado:any;
  especialidadSeleccionada:any;
  diaSeleccionado:any;
  horarioSeleccionado:any;

  listadoEspecialistas:Especialista[] = [];
  listadoEspecialidades:any[] = [];
  listadoDias:any[] = [];
  lsitadoHorarios:string[] = ['8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14;00','14;30','15:00','15:30','16:00','16;30','17:00','17:30','18:00','18:30','19:00'];

  constructor(private turno:TurnoService ,private router:Router, public authSvc:AuthService, private fb:FormBuilder, private firestore:FirestoreService) { }

  ngOnInit(): void {
    this.firestore.obtenerTodos('especialidades').subscribe((usuariosSnapshot) => {
      this.listadoEspecialidades = [];
      usuariosSnapshot.forEach((usuarioData: any) => {
        let data = usuarioData.payload.doc.data();
          this.listadoEspecialidades.push({
            nombre:data.nombre,
            id:usuarioData.payload.doc.id});
      });
    });

    if(this.authSvc.currentUser.perfil == 'paciente')
    {
      this.pacienteSeleccionado = this.authSvc.currentUser;
      this.estadoAlta++;
    }
  }

  elegirPaciente(paciente:any)
  {
    this.pacienteSeleccionado = paciente;
    this.estadoAlta++;
  }

  elegirEspecialidad(especialidad:any)
  {
    this.especialidadSeleccionada = especialidad;
    this.estadoAlta++;
  }

  elegirEspecialista(especialista:string)
  {
    this.especialistaSeleccionado = especialista;
    this.estadoAlta++;
  }

  elegirDia(dia:any)
  {
    this.diaSeleccionado = dia;
    this.estadoAlta++;
  }

  elegirHorario(hora:any)
  {
    this.horarioSeleccionado = hora;
    this.turno.crearTurno(this.pacienteSeleccionado.id, this.especialistaSeleccionado.id, this.especialidadSeleccionada, this.diaSeleccionado, this.horarioSeleccionado);

  }

  volverAtras()
  {
    this.estadoAlta--;
  }

  volverAHome()
  {
    this.router.navigateByUrl('/Bienvenida');
  }
}
