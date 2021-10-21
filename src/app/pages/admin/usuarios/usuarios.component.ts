import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  listaUsuarios:any[] = [];

  constructor(private firestore:FirestoreService) { }

  ngOnInit(): void {
    this.firestore.obtenerTodos('usuarios').subscribe((usuariosSnapshot) => {
      this.listaUsuarios = [];
      usuariosSnapshot.forEach((usuarioData: any) => {
        let data = usuarioData.payload.doc.data();
        this.listaUsuarios.push({
          id:data.id,
          nombre:data.nombre,
          apellido:data.apellido,
          edad:data.edad,
          dni:data.dni,
          perfil:data.perfil});
      });
    });
  }

  aprobarEspecialista(item:any)
  {

  }

}
