import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.scss']
})
export class EspecialidadesComponent implements OnInit {

  @Output() especialidadElegida:EventEmitter<any> = new EventEmitter<any>();

  listadoEspecialidades:any[] = [];

  constructor(private firestore:FirestoreService) { }

  ngOnInit(): void {
    this.firestore.obtenerTodos('especialidades').subscribe((usuariosSnapshot) => {
      this.listadoEspecialidades = [];
      usuariosSnapshot.forEach((usuarioData: any) => {
        let data = usuarioData.payload.doc.data();
          this.listadoEspecialidades.push({
            nombre:data.nombre,
            foto:data.foto,
          });
      });
    });
  }

  elegirEspecialidad(especialidad:string)
  {
    this.especialidadElegida.emit(especialidad);
  }
}
