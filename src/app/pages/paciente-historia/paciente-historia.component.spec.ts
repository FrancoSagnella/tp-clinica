import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteHistoriaComponent } from './paciente-historia.component';

describe('PacienteHistoriaComponent', () => {
  let component: PacienteHistoriaComponent;
  let fixture: ComponentFixture<PacienteHistoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteHistoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteHistoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
