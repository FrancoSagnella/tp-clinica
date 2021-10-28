import { TestBed } from '@angular/core/testing';

import { MisTurnosGuard } from './mis-turnos.guard';

describe('MisTurnosGuard', () => {
  let guard: MisTurnosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MisTurnosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
