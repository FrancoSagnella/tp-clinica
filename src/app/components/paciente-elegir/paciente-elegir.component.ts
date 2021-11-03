import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-paciente-elegir',
  templateUrl: './paciente-elegir.component.html',
  styleUrls: ['./paciente-elegir.component.scss']
})
export class PacienteElegirComponent implements OnInit {

  @Output() seleccionarPaciente:EventEmitter<any> = new EventEmitter<any>();
  listaPacientes:any[] = [];
  pacientesFiltrados:any[] = [];


  constructor(private firestore:FirestoreService) { }

  ngOnInit(): void {
    this.firestore.obtenerTodos('usuarios').subscribe((usuariosSnapshot) => {
      this.listaPacientes = [];
      usuariosSnapshot.forEach((usuarioData: any) => {
        let data = usuarioData.payload.doc.data();
        if(data.perfil == 'paciente')
        {
          this.listaPacientes.push({
            DNI:data.DNI,
            apellido:data.apellido,
            contrasenia:data.contrasenia,
            edad:data.edad,
            foto:data.foto,
            foto2:data.foto2,
            id:data.id,
            mail:data.mail,
            nombre:data.nombre,
            obraSocial:data.obraSocial,
            perfil:data.perfil,
            verificado:data.verificado});
        }
      });
      this.listaPacientes.forEach(element => {
        if(element.verificado)
        {
          this.pacientesFiltrados.push(element);
        }
      });
    });
  }

  elegirPaciente(paciente:any)
  {
    this.seleccionarPaciente.emit(paciente);
  }
}
