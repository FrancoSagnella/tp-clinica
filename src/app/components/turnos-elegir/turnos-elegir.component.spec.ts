import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosElegirComponent } from './turnos-elegir.component';

describe('TurnosElegirComponent', () => {
  let component: TurnosElegirComponent;
  let fixture: ComponentFixture<TurnosElegirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosElegirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosElegirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
