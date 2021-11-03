import { NombrePacientePipe } from './nombre-paciente.pipe';

describe('NombrePacientePipe', () => {
  it('create an instance', () => {
    const pipe = new NombrePacientePipe();
    expect(pipe).toBeTruthy();
  });
});
