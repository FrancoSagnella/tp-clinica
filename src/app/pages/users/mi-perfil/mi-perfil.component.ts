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
      let lunes:any = false;
      let martes:any = false;
      let miercoles:any = false;
      let jueves:any = false;
      let viernes:any = false;
      let sabado:any = false;

      this.usuario.diasLaborables.forEach((element: any) => {
        switch(element)
        {
          case 'lunes':
            lunes = true;
            break;
            case 'martes':
            martes = true;
              break;
              case 'miercoles':
              miercoles = true;
                break;
                case 'jueves':
              jueves = true;
            break;
            case 'viernes':
            viernes = true;
            break;
            case 'sabado':
            sabado = true;
            break;
        }
      });
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
    let horario = this.formGroup.controls.horario.value;
    if(horario == 'todo'){
      this.usuario.horario.empieza = '8:00';
      this.usuario.horario.termina = '19:00';
    }
    else if(horario == 'maniana'){
      this.usuario.horario.empieza = '8:00';
      this.usuario.horario.termina = '12:30';
    }
    else{
      this.usuario.horario.empieza = '12:30';
      this.usuario.horario.termina = '19:00';
    }

    this.usuario.diasLaborables = [];

    if(this.formGroup.controls.lunes.value)
    {
      this.usuario.diasLaborables.push('lunes');
    }
    if(this.formGroup.controls.martes.value)
    {
      this.usuario.diasLaborables.push('martes');
    }
    if(this.formGroup.controls.miercoles.value)
    {
      this.usuario.diasLaborables.push('miercoles');
    }
    if(this.formGroup.controls.jueves.value)
    {
      this.usuario.diasLaborables.push('jueves');
    }
    if(this.formGroup.controls.viernes.value)
    {
      this.usuario.diasLaborables.push('viernes');
    }
    if(this.formGroup.controls.sabado.value)
    {
      this.usuario.diasLaborables.push('sabado');
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
