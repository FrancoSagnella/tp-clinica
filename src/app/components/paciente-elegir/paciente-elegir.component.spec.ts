import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteElegirComponent } from './paciente-elegir.component';

describe('PacienteElegirComponent', () => {
  let component: PacienteElegirComponent;
  let fixture: ComponentFixture<PacienteElegirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteElegirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteElegirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
