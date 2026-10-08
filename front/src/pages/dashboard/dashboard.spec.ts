import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Dashboard } from './dashboard';

describe('Dashboard', () => {
  let fixture: ComponentFixture<Dashboard>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(Dashboard);
    fixture.detectChanges();
  });

  afterEach(() => httpTestingController.verify());

  it('should summarize movements by category and type', () => {
    httpTestingController.expectOne('http://localhost:8080/movimentacao-financeira').flush([
      { id: 1, descricao: 'Salário', data: '2026-10-01', valor: 2500, categoria: { id: 1, nome: 'Salário', tipo: 'Renda' } },
      { id: 2, descricao: 'Aluguel', data: '2026-10-02', valor: 900, categoria: { id: 2, nome: 'Moradia', tipo: 'Despesa' } },
    ]);
    fixture.detectChanges();

    expect(fixture.componentInstance.totalRendas).toBe(2500);
    expect(fixture.componentInstance.totalDespesas).toBe(900);
    expect(fixture.componentInstance.saldo).toBe(1600);
    expect(fixture.componentInstance.categorias).toHaveLength(2);
  });
});
