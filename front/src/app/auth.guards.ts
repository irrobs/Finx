import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const autenticadoGuard: CanActivateFn = () =>
  inject(AuthService).estaAutenticado || inject(Router).parseUrl('/login');

export const anonimoGuard: CanActivateFn = () =>
  inject(AuthService).estaAutenticado ? inject(Router).parseUrl('/') : true;
