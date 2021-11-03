import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-dias-elegir',
  templateUrl: './dias-elegir.component.html',
  styleUrls: ['./dias-elegir.component.scss']
})
export class DiasElegirComponent implements OnInit {

  @Input() especialista:any;
  @Output() seleccionarDia:EventEmitter<any> = new EventEmitter<any>();
  diasLaborables:any = [];
  diasAMostrar:any[] = [];

  constructor() { }

  ngOnInit(): void {
    let diaActual = new Date().getTime();


    if(this.especialista.diasLaborables.lunes)
    {
      this.diasLaborables.push('Lunes');
    }
    if(this.especialista.diasLaborables.martes)
    {
      this.diasLaborables.push('Martes');
    }if(this.especialista.diasLaborables.miercoles)
    {
      this.diasLaborables.push('Miercoles');
    }if(this.especialista.diasLaborables.jueves)
    {
      this.diasLaborables.push('Jueves');
    }if(this.especialista.diasLaborables.viernes)
    {
      this.diasLaborables.push('Viernes');
    }if(this.especialista.diasLaborables.sabado)
    {
      this.diasLaborables.push('Sabado');
    }


    for(let i = 1; i <= 15; i++)
    {
      this.diasAMostrar.push(new Date(diaActual+(86400000*i)));
    }
  }


  elegirDia(dias:any)
  {
    this.seleccionarDia.emit(dias);
  }
}
