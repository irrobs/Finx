import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentacaoFinanceira } from './movimentacao-financeira';

describe('MovimentacaoFinanceira', () => {
  let component: MovimentacaoFinanceira;
  let fixture: ComponentFixture<MovimentacaoFinanceira>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimentacaoFinanceira],
    }).compileComponents();

    fixture = TestBed.createComponent(MovimentacaoFinanceira);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
