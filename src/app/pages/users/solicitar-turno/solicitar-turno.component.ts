import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UsersService } from 'src/app/services/users.service';

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
  listadoPacientes:Paciente[] = [];
  listadoEspecialidades:any[] = [];

  constructor(private turno:TurnoService ,private router:Router, public authSvc:AuthService, private firestore:FirestoreService, private usuarios:UsersService) { }

  ngOnInit(): void {
    this.listadoEspecialistas = this.usuarios.listadoEspecialistas;
    this.listadoPacientes = this.usuarios.listadoPacientes;

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

    // Me fijo si tenia uno o mas especialistas de esa especialidad
    let auxArray:Especialista[] = [];
    this.listadoEspecialistas.forEach(element => {
      if(element.especialidad.includes(especialidad) )
      {
        auxArray.push(element);
      }
    });

    if(auxArray.length == 1)
    {
      this.especialistaSeleccionado = auxArray.pop();
      this.estadoAlta = this.estadoAlta+2;
    }
    else
    {
      this.estadoAlta++;
    }

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
