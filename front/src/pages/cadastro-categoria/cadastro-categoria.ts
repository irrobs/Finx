import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadastro-categoria',
  imports: [FormsModule, NgIf],
  templateUrl: './cadastro-categoria.html',
  styleUrl: './cadastro-categoria.css',
})
export class CadastroCategoria {
  private readonly http = inject(HttpClient);
  private readonly changeDetector = inject(ChangeDetectorRef);

  readonly apiUrl = 'http://localhost:8080/categoria';
  categoria = {
    nome: '',
    tipo: '',
  };
  enviando = false;
  mensagem = '';
  erro = false;

  salvar(form: NgForm): void {
    this.mensagem = '';
    this.erro = false;
    this.enviando = true;

    this.http.post(this.apiUrl, this.categoria).subscribe({
      next: () => {
        this.mensagem = 'Categoria cadastrada com sucesso.';
        form.resetForm({ nome: '', tipo: '' });
        this.enviando = false;
        this.changeDetector.markForCheck();
      },
      error: () => {
        this.mensagem =
          'Não foi possível cadastrar a categoria. Verifique se a API está disponível e tente novamente.';
        this.erro = true;
        this.enviando = false;
        this.changeDetector.markForCheck();
      },
    });
  }
}
