import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTurnosSeleccionadosComponent } from './reporte-turnos-seleccionados.component';

describe('ReporteTurnosSeleccionadosComponent', () => {
  let component: ReporteTurnosSeleccionadosComponent;
  let fixture: ComponentFixture<ReporteTurnosSeleccionadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteTurnosSeleccionadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteTurnosSeleccionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
