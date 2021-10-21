import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/clases/especialista';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-especialista',
  templateUrl: './especialista.component.html',
  styleUrls: ['./especialista.component.scss']
})
export class EspecialistaComponent implements OnInit {

  especialista:Especialista = {id:'',nombre:'',apellido:'',edad:0,DNI:0,mail:'',contrasenia:'',especialidad:'',foto:'',perfil:'especialista',verificado:false, aprobado:false}
  foto:any;
  formGroup!:FormGroup;

  constructor(private auth:AuthService, private fb:FormBuilder, private firestore:FirestoreService, private router:Router,private firestorage:AngularFireStorage, private afs:AngularFirestore) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      'nombre':['',Validators.required],
      'apellido':['',Validators.required],
      'edad':['',[Validators.required, Validators.min(18), Validators.max(150)]],
      'dni':['',[Validators.required, Validators.min(1000000), Validators.max(99999999)]],
      'mail':['', [Validators.required, Validators.email]],
      'contrasenia':[''],
      'foto':[null, Validators.required],
      'especialidad':['', Validators.required],
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
    this.especialista.especialidad = this.formGroup.controls.especialidad.value;

    // Agregar spinner
    let pathRef = `fotos/`+this.especialista.nombre+this.especialista.DNI+`/1`;
    const fileRef = this.firestorage.ref(pathRef);
    const task = this.firestorage.upload(pathRef, this.foto);

    task.snapshotChanges().toPromise().then(() => {
      fileRef.getDownloadURL().toPromise().then(response => {

            this.especialista.foto = response;
            this.especialista.id = this.afs.createId();

            this.firestore.actualizar('usuarios', this.especialista.id, this.especialista).then(()=>{
              // Agregar un SweetAlert
              this.auth.register(this.especialista.mail, this.especialista.contrasenia);
              this.router.navigate(['/bienvenida']);
            });
      });
    });
  }
}
