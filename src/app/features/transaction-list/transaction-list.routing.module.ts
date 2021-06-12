import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionListComponent } from './components/transaction-list/transaction-list.component';

const routes: Routes = [
  { path: 'list', component: TransactionListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionListRoutingModule { }
