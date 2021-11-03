import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-especialistas-elegir',
  templateUrl: './especialistas-elegir.component.html',
  styleUrls: ['./especialistas-elegir.component.scss']
})
export class EspecialistasElegirComponent implements OnInit {

  @Input() especialidadElegida:any;
  @Output() seleccionarEspecialista:EventEmitter<any> = new EventEmitter<any>();
  listaEspecialistas:any[] = [];
  especialistasFiltrados:any[] = [];
  constructor(private firestore:FirestoreService) { }

  ngOnInit(): void {
    this.firestore.obtenerTodos('usuarios').subscribe((usuariosSnapshot) => {
      this.listaEspecialistas = [];
      usuariosSnapshot.forEach((usuarioData: any) => {
        let data = usuarioData.payload.doc.data();
        if(data.perfil == 'especialista' && data.aprobado)
        {
          this.listaEspecialistas.push({
            DNI:data.DNI,
            apellido:data.apellido,
            aprobado:data.aprobado,
            contrasenia:data.contrasenia,
            edad:data.edad,
            especialidad:data.especialidad,
            foto:data.foto,
            id:data.id,
            mail:data.mail,
            nombre:data.nombre,
            perfil:data.perfil,
            verificado:data.verificado,
            horario:data.horario,
            diasLaborables:data.diasLaborables});
        }
      });
      this.listaEspecialistas.forEach(element => {
        if(element.especialidad.includes(this.especialidadElegida))
        {
          this.especialistasFiltrados.push(element);
        }
      });
    });
  }

  elegirEspecialista(especialista:any)
  {
    this.seleccionarEspecialista.emit(especialista);
  }

}
