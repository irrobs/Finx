import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCategoria } from './cadastro-categoria';

describe('CadastroCategoria', () => {
  let fixture: ComponentFixture<CadastroCategoria>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroCategoria],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(CadastroCategoria);
    fixture.detectChanges();
  });

  afterEach(() => httpTestingController.verify());

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
