import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },

  { path: '', loadChildren: () => import('./features/transaction-list/transaction-list.module').then(m => m.TransactionListModule) },
  { path: '', loadChildren: () => import('./features/transaction-create/transaction-create.module').then(m => m.TransactionCreateModule) },

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes , { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
