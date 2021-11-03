import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiasElegirComponent } from './dias-elegir.component';

describe('DiasElegirComponent', () => {
  let component: DiasElegirComponent;
  let fixture: ComponentFixture<DiasElegirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiasElegirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiasElegirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
