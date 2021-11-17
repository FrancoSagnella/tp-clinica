import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { GraficoService } from 'src/app/services/grafico.service';
import { PdfService } from 'src/app/services/pdf.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-reporte-turnos-seleccionados',
  templateUrl: './reporte-turnos-seleccionados.component.html',
  styleUrls: ['./reporte-turnos-seleccionados.component.scss']
})
export class ReporteTurnosSeleccionadosComponent implements OnInit {

  turnosEspecialistas:any[] = [];
  fechaDesde:string='';
  fechaHasta:string='';

  initSubscribe!:Subscription;
  filtradoSubscribe!:Subscription;

  @Output() cerrarTabla:EventEmitter<any> = new EventEmitter<any>();

  mostrarTabla:boolean = true;
  mostrarGrafico:boolean = false;
  chart:any;

  constructor(private turnos:TurnoService, private pdf:PdfService, private grafico:GraficoService, private users:UsersService) { }

  ngOnInit(): void {

    // Consigo todos los especialistas activos
    this.users.listadoEspecialistas.forEach(especialista => {
      if(especialista.aprobado && especialista.verificado)
      {
        this.turnosEspecialistas.push({especialista:especialista, turnos:0});
      }
    });

    this.initSubscribe = this.turnos.traerTodos().subscribe(turnos => {
      turnos.forEach(turno => {
        this.turnosEspecialistas.forEach(element => {
          if(turno.idEspecialista == element.especialista.id)
          {
            element.turnos++;
          }
        });
      });
      this.crearGrafico();
    });
  }

  volver()
  {
    this.cerrarTabla.emit('');
  }

  Filtrar()
  {
    let desdeArray = this.fechaDesde.split('/');
    let hastaArray = this.fechaHasta.split('/');

    let desde;
    let hasta;
    let desdebool = false;
    let hastabool = false;

    if(this.fechaDesde.length < 10)
    {
      desde = 1;
    }
    else
    {
      desde = new Date(parseInt(desdeArray[2]), (parseInt(desdeArray[1])-1), parseInt(desdeArray[0])).getTime();
      desdebool = true;
    }

    if(this.fechaHasta.length < 10)
    {
      hasta = new Date().getTime();
    }
    else
    {
      hasta = new Date(parseInt(hastaArray[2]), (parseInt(hastaArray[1])-1), parseInt(hastaArray[0])).getTime();
      hastabool = true;
    }

    if(!this.initSubscribe.closed)
    {
      this.initSubscribe.unsubscribe();
    }

    this.turnosEspecialistas = [];
    this.users.listadoEspecialistas.forEach(especialista => {
      if(especialista.aprobado && especialista.verificado)
      {
        this.turnosEspecialistas.push({especialista:especialista, turnos:0});
      }
    });

    if(desdebool && hastabool)
    {
      this.filtradoSubscribe = this.turnos.traerEntreFechas(desde, hasta).subscribe(turnos => {
        turnos.forEach(turno => {
          this.turnosEspecialistas.forEach(element => {
            if(turno.idEspecialista == element.especialista.id)
            {
              element.turnos++;
            }
          });
        });
        this.crearGrafico();
      });
    }
    else if(desdebool && !hastabool)
    {
      this.filtradoSubscribe = this.turnos.traerFechaDesde(desde).subscribe(turnos => {
        turnos.forEach(turno => {
          this.turnosEspecialistas.forEach(element => {
            if(turno.idEspecialista == element.especialista.id)
            {
              element.turnos++;
            }
          });
        });
        this.crearGrafico();
      });
    }
    else if(!desdebool && hastabool)
    {
      this.filtradoSubscribe = this.turnos.traerFechaHasta(hasta).subscribe(turnos => {
        turnos.forEach(turno => {
          this.turnosEspecialistas.forEach(element => {
            if(turno.idEspecialista == element.especialista.id)
            {
              element.turnos++;
            }
          });
        });
        this.crearGrafico();
      });
    }
    else
    {
      this.initSubscribe = this.turnos.traerTodos().subscribe(turnos => {
        turnos.forEach(turno => {
          this.turnosEspecialistas.forEach(element => {
            if(turno.idEspecialista == element.especialista.id)
            {
              element.turnos++;
            }
          });
        });
        this.crearGrafico();
      });
    }
  }

  MostrarTabla()
  {
    this.mostrarTabla = true;
    this.mostrarGrafico = false;
  }
  MostrarGrafico()
  {
    this.mostrarTabla = false;
    this.mostrarGrafico = true;
  }

  crearGrafico()
  {
    let especialistasNombre:any[] = [];
    let turnos:any[] = [];
    this.turnosEspecialistas.forEach(element => {
      especialistasNombre.push(element.especialista.apellido+', '+element.especialista.nombre);
      turnos.push(element.turnos);
    });

    this.chart = this.grafico.crearGraficoBarras(especialistasNombre, turnos, 'Turnos solicitados por especialista', 'Especialistas', 'Cantidad de turnos', 'turnos');
  }

  Descargar()
  {
    this.pdf.descargarPdf('turnosXespecialista.pdf', 'htmlData');
  }
}
