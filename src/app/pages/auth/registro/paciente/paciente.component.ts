import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/clases/paciente';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit {

  paciente:Paciente = {id:'',nombre:'',apellido:'',edad:0,DNI:0,mail:'',contrasenia:'',obraSocial:'',foto:'',foto2:'',perfil:'paciente',verificado:false}
  foto1:any;
  foto2:any;
  formGroup!:FormGroup;

  // para el captcha
  siteKey: string = '6LfXtPocAAAAAItVEVHGCmaeDIyjPpFMBm5fcl-Y';

  constructor(private spinner:NgxSpinnerService, private auth:AuthService, private fb:FormBuilder, private firestore:FirestoreService, private router:Router,private firestorage:AngularFireStorage, private afs:AngularFirestore) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      'nombre':['',Validators.required],
      'apellido':['',Validators.required],
      'edad':['',[Validators.required, Validators.min(18), Validators.max(150)]],
      'dni':['',[Validators.required, Validators.min(1000000), Validators.max(99999999)]],
      'mail':['', [Validators.required, Validators.email]],
      'contrasenia':[''],
      'foto1':[null, Validators.required],
      'foto2':[null, Validators.required],
      'obraSocial':['', Validators.required],
      'recaptcha' : ['', Validators.required],
    });
  }

  onSelecFoto(e:any, foto:string){
    if(e.target.files && e.target.files[0])
    {
      if(foto == 'foto1')
      {
        this.foto1 = e.target.files[0];
      }
      else
      {
        this.foto2 = e.target.files[0];
      }
    }
  }

  enviar(){

    this.paciente.nombre = this.formGroup.controls.nombre.value;
    this.paciente.apellido = this.formGroup.controls.apellido.value;
    this.paciente.edad = this.formGroup.controls.edad.value;
    this.paciente.DNI = this.formGroup.controls.dni.value;
    this.paciente.mail = this.formGroup.controls.mail.value;
    this.paciente.contrasenia = this.formGroup.controls.contrasenia.value;
    this.paciente.obraSocial = this.formGroup.controls.obraSocial.value;
    this.paciente.perfil = 'paciente';
    this.spinner.show();

    this.auth.register(this.paciente.mail, this.paciente.contrasenia).then(user => {
      console.log(user.user);


      let pathRef = `fotos/`+this.paciente.nombre+this.paciente.DNI+`/1`;
      const fileRef = this.firestorage.ref(pathRef);
      const task = this.firestorage.upload(pathRef, this.foto1);

      task.snapshotChanges().toPromise().then(() => {
        fileRef.getDownloadURL().toPromise().then(response => {


          let pathRef2 = `fotos/`+this.paciente.nombre+this.paciente.DNI+`/2`;
          const fileRef2 = this.firestorage.ref(pathRef2);
          const task2 = this.firestorage.upload(pathRef2, this.foto2);

          task2.snapshotChanges().toPromise().then(() => {
            fileRef2.getDownloadURL().toPromise().then(response2 => {

              this.paciente.foto = response;
              this.paciente.foto2 = response2;
              this.paciente.id = user.user.uid;

              this.firestore.actualizar('usuarios', this.paciente.id, this.paciente).then(()=>{
                // Agregar un SweetAlert
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
      });
    });

  }
}
