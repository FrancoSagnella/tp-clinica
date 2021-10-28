import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  listaUsuarios:any[] = [];

  constructor(private firestore:FirestoreService, private router:Router) { }

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

  altaAdmin()
  {
    this.router.navigateByUrl('auth/registro/administrador');
  }
  altaPaciente()
  {
    this.router.navigateByUrl('auth/registro/paciente');
  }
  altaEspecialista()
  {
    this.router.navigateByUrl('auth/registro/especialista');
  }
}
