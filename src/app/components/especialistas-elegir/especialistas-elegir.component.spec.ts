import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialistasElegirComponent } from './especialistas-elegir.component';

describe('EspecialistasElegirComponent', () => {
  let component: EspecialistasElegirComponent;
  let fixture: ComponentFixture<EspecialistasElegirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspecialistasElegirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialistasElegirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
