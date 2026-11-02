import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { MovimentacaoFinanceira } from './movimentacao-financeira';

describe('MovimentacaoFinanceira', () => {
  let component: MovimentacaoFinanceira;
  let fixture: ComponentFixture<MovimentacaoFinanceira>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimentacaoFinanceira],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(MovimentacaoFinanceira);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTestingController.expectOne('https://finx-2f0m.onrender.com/categoria').flush([]);
    await fixture.whenStable();
  });

  afterEach(() => httpTestingController.verify());

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
