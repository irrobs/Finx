import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

interface Categoria {
  id: number;
  nome: string;
  tipo: string;
}

@Component({
  selector: 'app-movimentacao-financeira',
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './movimentacao-financeira.html',
  styleUrl: './movimentacao-financeira.css',
})
export class MovimentacaoFinanceira implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly changeDetector = inject(ChangeDetectorRef);

  readonly apiUrl = 'http://localhost:8080/movimentacao-financeira';
  readonly categoriasUrl = 'http://localhost:8080/categoria';
  categorias: Categoria[] = [];
  carregandoCategorias = true;
  categoriaErro = '';
  movimentacao = {
    descricao: '',
    data: '',
    valor: 0,
    categoria: null as Categoria | null,
  };
  enviando = false;
  mensagem = '';
  erro = false;

  ngOnInit(): void {
    this.http.get<Categoria[]>(this.categoriasUrl).subscribe({
      next: (categorias) => {
        this.categorias = categorias;
        this.carregandoCategorias = false;
        this.changeDetector.markForCheck();
      },
      error: () => {
        this.categoriaErro = 'Não foi possível carregar as categorias.';
        this.carregandoCategorias = false;
        this.changeDetector.markForCheck();
      },
    });
  }

  salvar(form: NgForm): void {
    this.mensagem = '';
    this.erro = false;
    this.enviando = true;

    this.http.post(this.apiUrl, this.movimentacao).subscribe({
      next: () => {
        this.mensagem = 'Movimentação cadastrada com sucesso.';
        form.resetForm({
          descricao: '',
          data: '',
          valor: 0,
          categoria: null,
        });
        this.enviando = false;
        this.changeDetector.markForCheck();
      },
      error: () => {
        this.mensagem =
          'Não foi possível cadastrar a movimentação. Verifique se a API está disponível e tente novamente.';
        this.erro = true;
        this.enviando = false;
        this.changeDetector.markForCheck();
      },
    });
  }
}
