import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../app/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './login.html',
  styleUrl: '../auth.css',
})
export class Login implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly changeDetector = inject(ChangeDetectorRef);

  credenciais = { usuario: '', senha: '' };
  enviando = false;
  mensagem = '';
  erro = false;

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.has('registrado')) {
      this.mensagem = 'Conta criada. Entre com seu usuário e senha.';
    }
  }

  entrar(form: NgForm): void {
    this.mensagem = '';
    this.erro = false;
    this.enviando = true;
    this.auth.autenticar(this.credenciais).subscribe({
      next: () => void this.router.navigateByUrl('/'),
      error: () => {
        this.mensagem = 'Usuário ou senha inválidos.';
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
