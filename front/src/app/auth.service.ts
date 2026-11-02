import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, finalize, tap } from 'rxjs';

interface Credenciais {
  usuario: string;
  senha: string;
}

interface Sessao {
  token: string;
  usuario: string;
  expiraEm: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly apiUrl = 'https://finx-2f0m.onrender.com/auth';

  get token(): string | null {
    return this.isBrowser ? sessionStorage.getItem('finx-token') : null;
  }

  get nomeUsuario(): string | null {
    return this.isBrowser ? sessionStorage.getItem('finx-usuario') : null;
  }

  get estaAutenticado(): boolean {
    return this.token !== null;
  }

  cadastrar(credenciais: Credenciais): Observable<{ usuario: string }> {
    return this.http.post<{ usuario: string }>(`${this.apiUrl}/register`, credenciais);
  }

  autenticar(credenciais: Credenciais): Observable<Sessao> {
    return this.http.post<Sessao>(`${this.apiUrl}/login`, credenciais).pipe(
      tap((sessao) => {
        if (this.isBrowser) {
          sessionStorage.setItem('finx-token', sessao.token);
          sessionStorage.setItem('finx-usuario', sessao.usuario);
        }
      }),
    );
  }

  encerrar(): void {
    const token = this.token;
    const request = token
      ? this.http.post<void>(`${this.apiUrl}/logout`, {}, { headers: { Authorization: `Bearer ${token}` } })
      : null;

    if (!request) {
      this.limparSessao();
      void this.router.navigateByUrl('/login');
      return;
    }

    request.pipe(finalize(() => this.limparSessao())).subscribe({
      next: () => void this.router.navigateByUrl('/login'),
      error: () => void this.router.navigateByUrl('/login'),
    });
  }

  private limparSessao(): void {
    if (this.isBrowser) {
      sessionStorage.removeItem('finx-token');
      sessionStorage.removeItem('finx-usuario');
    }
  }
}
