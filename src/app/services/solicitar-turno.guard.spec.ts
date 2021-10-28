import { TestBed } from '@angular/core/testing';

import { SolicitarTurnoGuard } from './solicitar-turno.guard';

describe('SolicitarTurnoGuard', () => {
  let guard: SolicitarTurnoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SolicitarTurnoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
