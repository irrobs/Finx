import { Routes } from '@angular/router';
import { MovimentacaoFinanceira } from '../pages/movimentacao-financeira/movimentacao-financeira';
import { ConsultaMovimentacoes } from '../pages/consulta-movimentacoes/consulta-movimentacoes';

export const routes: Routes = [
  { path: '', redirectTo: 'movimentacao-financeira', pathMatch: 'full' },
  { path: 'movimentacao-financeira', component: MovimentacaoFinanceira },
  { path: 'consulta-movimentacoes', component: ConsultaMovimentacoes },
  { path: '**', redirectTo: 'movimentacao-financeira' },
];
