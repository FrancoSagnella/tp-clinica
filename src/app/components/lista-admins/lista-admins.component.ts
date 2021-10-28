import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-lista-admins',
  templateUrl: './lista-admins.component.html',
  styleUrls: ['./lista-admins.component.scss']
})
export class ListaAdminsComponent implements OnInit {

  listaAdmins:any[] = [];

  constructor(private firestore:FirestoreService) { }

  ngOnInit(): void {
    this.firestore.obtenerTodos('usuarios').subscribe((usuariosSnapshot) => {
      this.listaAdmins = [];
      usuariosSnapshot.forEach((usuarioData: any) => {
        let data = usuarioData.payload.doc.data();
        if(data.perfil == 'administrador')
        {
          this.listaAdmins.push({
            id:data.id,
            nombre:data.nombre,
            apellido:data.apellido,
            edad:data.edad,
            dni:data.DNI,
            perfil:data.perfil});
        }
      });
    });
  }

}
