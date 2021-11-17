import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GraficoService } from 'src/app/services/grafico.service';
import { PdfService } from 'src/app/services/pdf.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-reporte-turnos-dias',
  templateUrl: './reporte-turnos-dias.component.html',
  styleUrls: ['./reporte-turnos-dias.component.scss']
})
export class ReporteTurnosDiasComponent implements OnInit {

  listadoDias:any[] = [];

  @Output() cerrarTabla:EventEmitter<any> = new EventEmitter<any>();

  mostrarTabla:boolean = true;
  mostrarGrafico:boolean = false;
  chart:any;

  constructor(private turnos:TurnoService, private pdf:PdfService, private grafico:GraficoService) { }

  ngOnInit(): void {

    // Traigo los turnos y obtengo todos los dias que se labuaron
    this.turnos.traerTodos().subscribe(turnos=>{
      let diasLaburados:any[] = [];

      turnos.forEach(element => {

        if(diasLaburados.length == 0)
        {
          diasLaburados.push({fecha:this.formatDate(element.fecha), cant:1});
        }

        let aux = true;
        diasLaburados.forEach(dia => {
          if(dia.fecha == this.formatDate(element.fecha))
          {
            dia.cant++;
            aux = false;
          }
        });

        if(aux)
        {
          diasLaburados.push({fecha:this.formatDate(element.fecha), cant:1});
        }
      });

      this.listadoDias = diasLaburados;

      this.crearGrafico();

    });
  }

  formatDate(fecha:any)
  {
    let date = new Date(fecha);
    return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
  }

  volver()
  {
    this.cerrarTabla.emit('');
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
    let fechas:any[] = [];
    let cantidad:any[] = [];
    this.listadoDias.forEach(element => {
      fechas.push(element.fecha);
      cantidad.push(element.cant);
    });

    this.chart = this.grafico.crearGraficoBarras(fechas, cantidad, 'Turnos solicitados por fecha', 'Fechas', 'Cantidad de turnos', 'turnos');
  }

  Descargar()
  {
    this.pdf.descargarPdf('turnosXdia.pdf', 'htmlData');
  }
}
