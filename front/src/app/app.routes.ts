import { Routes } from '@angular/router';
import { MovimentacaoFinanceira } from '../pages/movimentacao-financeira/movimentacao-financeira';
import { ConsultaMovimentacoes } from '../pages/consulta-movimentacoes/consulta-movimentacoes';
import { CadastroCategoria } from '../pages/cadastro-categoria/cadastro-categoria';
import { Dashboard } from '../pages/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'movimentacao-financeira', component: MovimentacaoFinanceira },
  { path: 'consulta-movimentacoes', component: ConsultaMovimentacoes },
  { path: 'cadastro-categoria', component: CadastroCategoria },
  { path: '**', redirectTo: '' },
];
