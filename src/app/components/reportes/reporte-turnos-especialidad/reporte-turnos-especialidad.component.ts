import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { TurnoService } from 'src/app/services/turno.service';
import { GraficoService } from 'src/app/services/grafico.service';
import { PdfService } from 'src/app/services/pdf.service';

@Component({
  selector: 'app-reporte-turnos-especialidad',
  templateUrl: './reporte-turnos-especialidad.component.html',
  styleUrls: ['./reporte-turnos-especialidad.component.scss']
})
export class ReporteTurnosEspecialidadComponent implements OnInit {

  listadoEspecialidades:any[] = [];

  @Output() cerrarTabla:EventEmitter<any> = new EventEmitter<any>();

  mostrarTabla:boolean = true;
  mostrarGrafico:boolean = false;
  chart:any;

  constructor(private turnos:TurnoService, private firestore:FirestoreService, private grafico:GraficoService, private pdf:PdfService) { }

  ngOnInit(): void {

    let especialidades:any[] = [];

    this.firestore.obtenerTodos('especialidades').subscribe(esp=>{

      esp.forEach(element => {
        let espData:any = element.payload.doc.data();
        especialidades.push({
          especialidad:espData.nombre,
          cant:0,
        });
      });

      this.turnos.traerTodos().subscribe(turnos=>{

        turnos.forEach(turno => {
          especialidades.forEach(esp=>{
            if(turno.especialidad == esp.especialidad)
            {
              esp.cant++;
            }
          });
        });

        this.listadoEspecialidades = especialidades;

        this.crearGrafico();
      });
    });


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
    let especialidades:any[] = [];
    let cantidad:any[] = [];
    this.listadoEspecialidades.forEach(element => {
      especialidades.push(element.especialidad);
      cantidad.push(element.cant);
    });

    this.chart = this.grafico.crearGraficoBarras(especialidades, cantidad, 'Turnos solicitados por especialidad', 'Especialidades', 'Cantidad de turnos', 'turnos');
  }

  Descargar()
  {
    this.pdf.descargarPdf('turnosXespecialidad.pdf', 'htmlData');
  }
}
