import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-movimentacao-financeira',
  imports: [FormsModule, NgIf],
  templateUrl: './movimentacao-financeira.html',
  styleUrl: './movimentacao-financeira.css',
})
export class MovimentacaoFinanceira {
  private readonly http = inject(HttpClient);

  readonly apiUrl = 'http://localhost:8080/movimentacao-financeira';
  movimentacao = {
    descricao: '',
    data: '',
    valor: 0,
    categoria: '',
  };
  enviando = false;
  mensagem = '';
  erro = false;

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
          categoria: '',
        });
        this.enviando = false;
      },
      error: () => {
        this.mensagem =
          'Não foi possível cadastrar a movimentação. Verifique se a API está disponível e tente novamente.';
        this.erro = true;
        this.enviando = false;
      },
    });
  }
}
