import { Component, Input, OnInit } from '@angular/core';
import { Especialista } from 'src/app/clases/especialista';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-lista-especialistas',
  templateUrl: './lista-especialistas.component.html',
  styleUrls: ['./lista-especialistas.component.scss']
})
export class ListaEspecialistasComponent implements OnInit {

  listaEspecialistas:Especialista[] = [];
  @Input() admin:boolean = true;

  constructor(private firestore:FirestoreService) { }

  ngOnInit(): void {
    this.firestore.obtenerTodos('usuarios').subscribe((usuariosSnapshot) => {
      this.listaEspecialistas = [];
      usuariosSnapshot.forEach((usuarioData: any) => {
        let data = usuarioData.payload.doc.data();
        if(data.perfil == 'especialista')
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
    });
  }

  async manejarActivacion(accion:string, item:any)
  {
    console.info('item', item);
    if(accion == 'activar')
    {
      item.aprobado = true;
    }
    else
    {
      item.aprobado = false;
    }


    await this.firestore.actualizar('usuarios', item.id, item);
  }
}
