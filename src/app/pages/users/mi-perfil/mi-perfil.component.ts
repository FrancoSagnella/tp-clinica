import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {

  formGroup!:FormGroup;

  usuario:any = this.authSvc.currentUser;

  dias:any;
  horario:any;

  constructor(private authSvc:AuthService, private fb:FormBuilder, private firestore:FirestoreService, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    if(this.usuario.perfil == 'especialista')
    {
      console.info('usuario', this.usuario);
      let lunes:any = this.usuario.diasLaborables.lunes;
      let martes:any = this.usuario.diasLaborables.martes;
      let miercoles:any = this.usuario.diasLaborables.miercoles;
      let jueves:any = this.usuario.diasLaborables.jueves;
      let viernes:any = this.usuario.diasLaborables.viernes;
      let sabado:any = this.usuario.diasLaborables.sabado;

      this.dias = {lunes:lunes, martes:martes, miercoles:miercoles, jueves:jueves, viernes:viernes, sabado:sabado};
      console.info('dias', this.dias);


      if(this.usuario.horario.empieza == '8:00' && this.usuario.horario.termina == '19:00')
      {
        this.horario = 'todo';
      }
      else if(this.usuario.horario.empieza == '8:00')
      {
        this.horario = 'maniana';
      }
      else if(this.usuario.horario.empieza == '12:30')
      {
        this.horario = 'tarde';
      }
      else
      {
        this.horario = '';
      }

      this.formGroup = this.fb.group({
        'lunes':[this.dias.lunes],
        'martes':[this.dias.martes],
        'miercoles':[this.dias.miercoles],
        'jueves':[this.dias.jueves],
        'viernes':[this.dias.viernes],
        'sabado':[this.dias.sabado],
        'horario':[this.horario],
      });
    }
  }

  enviar()
  {
    this.spinner.show();

    this.usuario.diasLaborables.lunes = this.formGroup.controls.lunes.value;
    this.usuario.diasLaborables.martes = this.formGroup.controls.martes.value;
    this.usuario.diasLaborables.miercoles = this.formGroup.controls.miercoles.value;
    this.usuario.diasLaborables.jueves = this.formGroup.controls.jueves.value;
    this.usuario.diasLaborables.viernes = this.formGroup.controls.viernes.value;
    this.usuario.diasLaborables.sabado = this.formGroup.controls.sabado.value;

    let horario = this.formGroup.controls.horario.value;

    if(horario == 'todo'){
      // horarios = {hora:'8:00', ocupado:false}, {hora:'8:30', ocupado:false}
      this.usuario.horario = {empieza:'8:00', termina:'19:00'};
    }
    else if(horario == 'maniana'){
      this.usuario.horario = {empieza:'8:00', termina:'13:30'};
    }
    else{
      this.usuario.horario = {empieza:'14:00', termina:'19:00'};
    }

    this.firestore.actualizar('usuarios', this.usuario.id, this.usuario).then(()=>{
      this.spinner.hide();
      Swal.fire({
        title:'¡Bien!',
        text:'¡Horarios asignados correctamente!',
        icon:'success',
        cancelButtonText:'Cerrar',
      });
    });
  }
}
