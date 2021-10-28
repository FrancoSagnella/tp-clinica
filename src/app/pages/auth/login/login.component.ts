import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email:new FormControl(''),
    password:new FormControl(''),
  });
  public users:any[] = [];

  constructor(private spinner:NgxSpinnerService, private router:Router, private authSvc:AuthService,private firestore:FirestoreService) { }

  ngOnInit(): void {
    this.firestore.obtenerTodos('usuarios').subscribe((usersSnapshot) => {
      this.users = [];
      usersSnapshot.forEach((userData: any) => {
        let data = userData.payload.doc.data();

        this.users.push({
          mail:data.mail,
          contrasenia:data.contrasenia,
          perfil:data.perfil,
          // perfil:data.perfil
        });
      })
    });
  }

  async iniciarSesion(){
    const {email, password} = this.loginForm.value;
    try{

      this.spinner.show();

      const user:any = await this.authSvc.login(email, password);
      if(typeof(user) !== 'string'){

        // despues de iniciarle sesion, lo traigo de la bd
        this.firestore.obtenerById('usuarios', user.user.uid).toPromise().then(async (snapshot)=>{
          let data:any = snapshot.data();
          console.log(data);

          // dependiendo el perfil, me fijo si el mail esta verificado o no
          // Si es paciente o especialista
          if(data.perfil == 'paciente' || data.perfil == 'especialista')
          {
            if(user.user.emailVerified)
            {
              // dependiendo el perfil lo instancio con sus datos
              if(data.perfil == 'paciente')
              {
                this.authSvc.currentUser = {DNI:data.DNI, apellido:data.apellido, contrasenia:data.contrasenia, edad:data.edad, foto:data.foto, foto2:data.foto2, id:data.id, mail:data.mail, nombre:data.nombre, obraSocial:data.obraSocial, perfil:data.perfil, verificado:data.verificado};
                this.router.navigateByUrl('/bienvenida');
                this.spinner.hide();
                Swal.fire({
                  title:'¡Bien!',
                  text:'¡Iniciaste sesión correctamente¡',
                  icon:'success',
                  confirmButtonText:'Cerrar'
                });
              }
              else if(data.perfil == 'especialista')
              {
                if(data.aprobado)
                {
                  this.authSvc.currentUser = {DNI:data.DNI, apellido:data.apellido, aprobado:data.aprobado, contrasenia:data.contrasenia, edad:data.edad, especialidad:data.especialidad, foto:data.foto, id:data.id, mail:data.mail, nombre:data.nombre, perfil:data.perfil, verificado:data.verificado, diasLaborables:data.diasLaborables, horario:data.horario};
                  this.router.navigateByUrl('/bienvenida');
                  this.spinner.hide();
                  Swal.fire({
                    title:'¡Bien!',
                    text:'¡Iniciaste sesión correctamente¡',
                    icon:'success',
                    confirmButtonText:'Cerrar'
                  });
                }
                else
                {
                  this.spinner.hide();
                  Swal.fire({
                    title:'¡Error!',
                    text:'¡El usuario no fue aprobado por el administrador!',
                    icon:'error',
                    confirmButtonText:'Cerrar'
                  });
                  console.log('email no verificado');
                  await this.authSvc.logout();
                }
              }
            }
            else
            {
              this.spinner.hide();
              Swal.fire({
                title:'¡Error!',
                text:'¡El email que se uso para iniciar sesión no está verificado!',
                icon:'error',
                confirmButtonText:'Cerrar'
              });
              console.log('email no verificado');
              await this.authSvc.logout();
            }
          }
          // Si es admin
          else
          {
            this.authSvc.currentUser = {DNI:data.DNI, apellido:data.apellido, contrasenia:data.contrasenia, edad:data.edad, foto:data.foto, id:data.id, mail:data.mail, nombre:data.nombre, perfil:data.perfil};

            this.router.navigateByUrl('/bienvenida');
            this.spinner.hide();
            Swal.fire({
              title:'¡Bien!',
              text:'¡Iniciaste sesión correctamente¡',
              icon:'success',
              confirmButtonText:'Cerrar'
            });
          }
        });
      }
    }
    catch(e:any)
    {
      this.spinner.hide();
      Swal.fire({
        title:'¡Error!',
        text: e,
        icon:'error',
        confirmButtonText:'Cerrar',
      });
    }

  }
  seleccionarUsuario(email:string, password:string){
    this.loginForm.setValue({email:email, password:password});
  }
  instanciarUsuario()
  {

  }
}
