import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public listadoEspecialistas:any[] = [];
  public listadoPacientes:any[] = [];
  public listadoAdministradores:any[] = [];

  constructor(private firestore:FirestoreService) {

    this.firestore.obtenerTodos('usuarios').subscribe((usuariosSnapshot) => {
      usuariosSnapshot.forEach((usuarioData: any) => {
        let data = usuarioData.payload.doc.data();
        if(data.perfil == 'especialista')
        {
          this.listadoEspecialistas.push({
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
        if(data.perfil == 'paciente')
        {
          this.listadoPacientes.push({
            id:data.id,
            nombre:data.nombre,
            apellido:data.apellido,
            edad:data.edad,
            dni:data.DNI,
            perfil:data.perfil});
        }
        if(data.perfil == 'administrador')
        {
          this.listadoAdministradores.push({
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
