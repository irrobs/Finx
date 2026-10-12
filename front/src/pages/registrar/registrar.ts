import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../app/auth.service';

@Component({
  selector: 'app-registrar',
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './registrar.html',
  styleUrl: '../auth.css',
})
export class Registrar {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly changeDetector = inject(ChangeDetectorRef);

  credenciais = { usuario: '', senha: '' };
  enviando = false;
  mensagem = '';
  erro = false;

  cadastrar(form: NgForm): void {
    this.mensagem = '';
    this.erro = false;
    this.enviando = true;
    this.auth.cadastrar(this.credenciais).subscribe({
      next: () => void this.router.navigate(['/login'], { queryParams: { registrado: '1' } }),
      error: (resposta: { status?: number }) => {
        this.mensagem = resposta.status === 409
          ? 'Esse usuário já está em uso.'
          : resposta.status === 400
            ? 'Informe um usuário com 3 a 50 caracteres e senha com pelo menos 8.'
            : 'Não foi possível criar a conta. Tente novamente.';
        this.erro = true;
        this.enviando = false;
        this.changeDetector.markForCheck();
      },
      complete: () => {
        this.enviando = false;
        this.changeDetector.markForCheck();
      },
    });
  }
}
