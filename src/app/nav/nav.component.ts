import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnChanges {

  public user:any = this.authSvc.currentUser;

  constructor(private authSvc:AuthService, private router:Router) { }

  ngOnInit(): void {
    console.log('carga');
    this.authSvc.afAuth.user.subscribe(()=>{
      if(!this.user)
      {
        setTimeout(()=>{
          this.user = this.authSvc.currentUser;
          console.log('se cambia el usuario', this.user);
        }, 1500);
      }
      else
      {
        this.user = null;
      }
    });
  }

  ngOnChanges()
  {
    console.log('usuario', this.user);
  }

  onLogout() {
    try{
      this.authSvc.logout().then(()=>{
        this.router.navigateByUrl('/auth/login');
      });
    }
    catch(e:any){
      console.log(e)
    }
  }
}
