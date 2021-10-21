import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/clases/administrador';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {

  administrador:Admin = {id:'',nombre:'',apellido:'',edad:0,DNI:0,mail:'',contrasenia:'',foto:'',perfil:'administrador'}
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
    });
  }

  onSelecFoto(e:any){
    if(e.target.files && e.target.files[0])
    {
      this.foto = e.target.files[0];
    }
  }

  enviar(){

    this.administrador.nombre = this.formGroup.controls.nombre.value;
    this.administrador.apellido = this.formGroup.controls.apellido.value;
    this.administrador.edad = this.formGroup.controls.edad.value;
    this.administrador.DNI = this.formGroup.controls.dni.value;
    this.administrador.mail = this.formGroup.controls.mail.value;
    this.administrador.contrasenia = this.formGroup.controls.contrasenia.value;

    // Agregar spinner
    let pathRef = `fotos/`+this.administrador.nombre+this.administrador.DNI+`/1`;
    const fileRef = this.firestorage.ref(pathRef);
    const task = this.firestorage.upload(pathRef, this.foto);

    task.snapshotChanges().toPromise().then(() => {
      fileRef.getDownloadURL().toPromise().then(response => {

            this.administrador.foto = response;
            this.administrador.id = this.afs.createId();

            this.firestore.actualizar('usuarios', this.administrador.id, this.administrador).then(()=>{
              // Agregar un SweetAlert
              this.auth.register(this.administrador.mail, this.administrador.contrasenia);
              this.router.navigate(['/bienvenida']);
            });
      });
    });
  }
}
