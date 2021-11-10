import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent implements OnInit {

  listaPacientes:any[] = [];

  constructor(private firestore:FirestoreService, private router:Router) { }

  ngOnInit(): void {
    this.firestore.obtenerTodos('usuarios').subscribe((usuariosSnapshot) => {
      this.listaPacientes = [];
      usuariosSnapshot.forEach((usuarioData: any) => {
        let data = usuarioData.payload.doc.data();
        if(data.perfil == 'paciente')
        {
          this.listaPacientes.push({
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

  verHistoriasClinicas()
  {
    this.router.navigateByUrl('/pacientes');
  }
}
