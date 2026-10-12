import { Routes } from '@angular/router';
import { MovimentacaoFinanceira } from '../pages/movimentacao-financeira/movimentacao-financeira';
import { ConsultaMovimentacoes } from '../pages/consulta-movimentacoes/consulta-movimentacoes';
import { CadastroCategoria } from '../pages/cadastro-categoria/cadastro-categoria';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Login } from '../pages/login/login';
import { Registrar } from '../pages/registrar/registrar';
import { anonimoGuard, autenticadoGuard } from './auth.guards';

export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [anonimoGuard] },
  { path: 'registrar', component: Registrar, canActivate: [anonimoGuard] },
  { path: '', component: Dashboard, canActivate: [autenticadoGuard] },
  { path: 'movimentacao-financeira', component: MovimentacaoFinanceira, canActivate: [autenticadoGuard] },
  { path: 'consulta-movimentacoes', component: ConsultaMovimentacoes, canActivate: [autenticadoGuard] },
  { path: 'cadastro-categoria', component: CadastroCategoria, canActivate: [autenticadoGuard] },
  { path: '**', redirectTo: 'login' },
];
