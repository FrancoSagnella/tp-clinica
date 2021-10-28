import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss']
})
export class BienvenidaComponent implements OnInit {

  constructor(private router:Router, private authSvc:AuthService) { }

  ngOnInit(): void {
  }

  misTurnos()
  {
    this.router.navigateByUrl('/users/misTurnos');
  }

  turnos()
  {
    this.router.navigateByUrl('/admin/turnos');
  }

  solicitarTurno()
  {
    this.router.navigateByUrl('/users/solicitarTurno');
  }

  miPerfil()
  {
    this.router.navigateByUrl('/users/miPerfil');
  }
}
