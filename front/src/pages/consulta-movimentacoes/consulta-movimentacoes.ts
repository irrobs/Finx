import { CurrencyPipe, DatePipe, NgFor, NgIf, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';

registerLocaleData(localePt);

interface Movimentacao {
  id: number;
  descricao: string;
  data: string;
  valor: number;
  categoria: {
    id: number;
    nome: string;
    tipo: string;
  };
}

@Component({
  selector: 'app-consulta-movimentacoes',
  imports: [CurrencyPipe, DatePipe, NgFor, NgIf],
  templateUrl: './consulta-movimentacoes.html',
  styleUrl: './consulta-movimentacoes.css',
})
export class ConsultaMovimentacoes implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly changeDetector = inject(ChangeDetectorRef);

  readonly apiUrl = 'http://localhost:8080/movimentacao-financeira';
  movimentacoes: Movimentacao[] = [];
  carregando = true;
  mensagemErro = '';

  ngOnInit(): void {
    this.carregarMovimentacoes();
  }

  carregarMovimentacoes(): void {
    this.carregando = true;
    this.mensagemErro = '';

    this.http.get<Movimentacao[]>(this.apiUrl).subscribe({
      next: (movimentacoes) => {
        this.movimentacoes = movimentacoes;
        this.carregando = false;
        this.changeDetector.markForCheck();
      },
      error: () => {
        this.mensagemErro =
          'Não foi possível carregar as movimentações. Verifique se a API está disponível e tente novamente.';
        this.carregando = false;
        this.changeDetector.markForCheck();
      },
    });
  }
}
