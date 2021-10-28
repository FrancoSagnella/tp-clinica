import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/clases/especialista';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-especialista',
  templateUrl: './especialista.component.html',
  styleUrls: ['./especialista.component.scss']
})
export class EspecialistaComponent implements OnInit {

  especialista:Especialista = {id:'',nombre:'',apellido:'',edad:0,DNI:0,mail:'',contrasenia:'',especialidad:[],foto:'',perfil:'especialista',verificado:false, aprobado:false, horario:{empieza:'',termina:''},diasLaborables:[]};
  foto:any;
  formGroup!:FormGroup;

  // para el captcha
  siteKey: string = '6LfXtPocAAAAAItVEVHGCmaeDIyjPpFMBm5fcl-Y';

  especialidades:any;
  especialidadNueva:any;
  especialidadesParaAgregar:any[] = [];

  constructor(private spinner:NgxSpinnerService, private auth:AuthService, private fb:FormBuilder, private firestore:FirestoreService, private router:Router,private firestorage:AngularFireStorage, private afs:AngularFirestore) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      'nombre':['',Validators.required],
      'apellido':['',Validators.required],
      'edad':['',[Validators.required, Validators.min(18), Validators.max(150)]],
      'dni':['',[Validators.required, Validators.min(1000000), Validators.max(99999999)]],
      'mail':['', [Validators.required, Validators.email]],
      'contrasenia':[''],
      'foto':[null, Validators.required],
      // 'especialidad':['', Validators.required],
      // 'horario':['', Validators.required],
      // 'recaptcha':['', Validators.required],
      // 'lunes':[false],
      // 'martes':[false],
      // 'miercoles':[false],
      // 'jueves':[false],
      // 'viernes':[false],
      // 'sabado':[false],

      // 'dias':['', Validators.required],
    });
    this.firestore.obtenerTodos('especialidades').subscribe((usersSnapshot) => {
      this.especialidades = [];
      usersSnapshot.forEach((userData: any) => {
        let data = userData.payload.doc.data();

        this.especialidades.push({
          nombre:data.nombre,
        });
      })
    });
  }

  onSelecFoto(e:any){
    if(e.target.files && e.target.files[0])
    {
      this.foto = e.target.files[0];
    }
  }

  enviar(){

    this.especialista.nombre = this.formGroup.controls.nombre.value;
    this.especialista.apellido = this.formGroup.controls.apellido.value;
    this.especialista.edad = this.formGroup.controls.edad.value;
    this.especialista.DNI = this.formGroup.controls.dni.value;
    this.especialista.mail = this.formGroup.controls.mail.value;
    this.especialista.contrasenia = this.formGroup.controls.contrasenia.value;

    this.especialista.especialidad = this.especialidadesParaAgregar;
    // this.especialista.especialidad = this.formGroup.controls.especialidad.value;

    // let horario = this.formGroup.controls.horario.value;
    // if(horario == 'todo'){
    //   this.especialista.horario.empieza = '8:00';
    //   this.especialista.horario.termina = '19:00';
    // }
    // else if(horario == 'maniana'){
    //   this.especialista.horario.empieza = '8:00';
    //   this.especialista.horario.termina = '12:30';
    // }
    // else{
    //   this.especialista.horario.empieza = '12:30';
    //   this.especialista.horario.termina = '19:00';
    // }

    // if(this.formGroup.controls.lunes.value)
    // {
    //   this.especialista.diasLaborables.push('lunes');
    // }
    // if(this.formGroup.controls.martes.value)
    // {
    //   this.especialista.diasLaborables.push('martes');
    // }
    // if(this.formGroup.controls.miercoles.value)
    // {
    //   this.especialista.diasLaborables.push('miercoles');
    // }
    // if(this.formGroup.controls.jueves.value)
    // {
    //   this.especialista.diasLaborables.push('jueves');
    // }
    // if(this.formGroup.controls.viernes.value)
    // {
    //   this.especialista.diasLaborables.push('viernes');
    // }
    // if(this.formGroup.controls.sabado.value)
    // {
    //   this.especialista.diasLaborables.push('sabado');
    // }

    this.spinner.show();

    this.auth.register(this.especialista.mail, this.especialista.contrasenia).then(user=>{
      let pathRef = `fotos/`+this.especialista.nombre+this.especialista.DNI+`/1`;
      const fileRef = this.firestorage.ref(pathRef);
      const task = this.firestorage.upload(pathRef, this.foto);

      task.snapshotChanges().toPromise().then(() => {
        fileRef.getDownloadURL().toPromise().then(response => {

              this.especialista.foto = response;
              this.especialista.id = user.user.uid;

              this.firestore.actualizar('usuarios', this.especialista.id, this.especialista).then(()=>{
                this.spinner.hide();
                Swal.fire({
                  title:'¡Bien!',
                  text:'¡Usuario registrado exitosamente!',
                  icon:'success',
                  cancelButtonText:'Cerrar',
                });
                this.router.navigate(['/bienvenida']);
              });
        });
      });
    });

  }

  agregarEspecialidad()
  {
    console.log(this.especialidadNueva);
    if(this.especialidadNueva != '')
    {
      let data = {nombre:this.especialidadNueva};
      this.spinner.show();
      this.firestore.crear('especialidades', data).then(()=>{
        this.spinner.hide();
        this.especialidadNueva = '';
      });
    }
    else
    {
      Swal.fire({
        title:'¡Error!',
        text:'¡No deje el campo vacío!',
        icon:'error',
        cancelButtonText:'Cerrar',
      });
    }
  }

  asignarEspecialidad(esp:any)
  {
    let bool = false;

    if(this.especialidadesParaAgregar.length > 0)
    {
      for(let i = 0; i < this.especialidadesParaAgregar.length; i++){
        if(this.especialidadesParaAgregar[i] == esp)
        {
          bool = true;
        }
      }
    }

    if(!bool)
    {
      this.especialidadesParaAgregar.push(esp);
    }
    // else swal
  }
  quitarEspecialidad(esp:any)
  {
    for(let i = 0; i < this.especialidadesParaAgregar.length; i++)
    {
      if(this.especialidadesParaAgregar[i] == esp)
      {
        console.log('entro');
        this.especialidadesParaAgregar.splice(i, 1);
      }
    }
  }
}
