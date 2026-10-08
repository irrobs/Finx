import { CurrencyPipe, DecimalPipe, NgFor, NgIf, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

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
  } | null;
}

interface ResumoCategoria {
  id: number | null;
  nome: string;
  tipo: string;
  total: number;
  quantidade: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [CurrencyPipe, DecimalPipe, NgFor, NgIf, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly changeDetector = inject(ChangeDetectorRef);

  readonly apiUrl = 'http://localhost:8080/movimentacao-financeira';
  movimentacoes: Movimentacao[] = [];
  categorias: ResumoCategoria[] = [];
  totalRendas = 0;
  totalDespesas = 0;
  carregando = true;
  mensagemErro = '';

  get saldo(): number {
    return this.totalRendas - this.totalDespesas;
  }

  get maiorTotalCategoria(): number {
    return Math.max(0, ...this.categorias.map((categoria) => categoria.total));
  }

  ngOnInit(): void {
    this.carregarMovimentacoes();
  }

  carregarMovimentacoes(): void {
    this.carregando = true;
    this.mensagemErro = '';

    this.http.get<Movimentacao[]>(this.apiUrl).subscribe({
      next: (movimentacoes) => {
        this.movimentacoes = movimentacoes;
        this.resumirPorCategoria(movimentacoes);
        this.carregando = false;
        this.changeDetector.markForCheck();
      },
      error: () => {
        this.mensagemErro =
          'Não foi possível carregar o dashboard. Verifique se a API está disponível e tente novamente.';
        this.carregando = false;
        this.changeDetector.markForCheck();
      },
    });
  }

  larguraBarra(total: number): number {
    return this.maiorTotalCategoria > 0 ? (total / this.maiorTotalCategoria) * 100 : 0;
  }

  private resumirPorCategoria(movimentacoes: Movimentacao[]): void {
    const resumos = new Map<string, ResumoCategoria>();
    this.totalRendas = 0;
    this.totalDespesas = 0;

    for (const movimentacao of movimentacoes) {
      const categoria = movimentacao.categoria;
      const tipo = categoria?.tipo ?? 'Sem tipo';
      const nome = categoria?.nome ?? 'Sem categoria';
      const chave = categoria ? `${categoria.id}-${tipo}` : `sem-categoria-${tipo}`;
      const valor = Number(movimentacao.valor) || 0;

      if (tipo === 'Renda') {
        this.totalRendas += valor;
      } else if (tipo === 'Despesa') {
        this.totalDespesas += valor;
      }

      const resumo = resumos.get(chave) ?? {
        id: categoria?.id ?? null,
        nome,
        tipo,
        total: 0,
        quantidade: 0,
      };
      resumo.total += valor;
      resumo.quantidade += 1;
      resumos.set(chave, resumo);
    }

    this.categorias = [...resumos.values()].sort((a, b) => b.total - a.total);
  }
}
