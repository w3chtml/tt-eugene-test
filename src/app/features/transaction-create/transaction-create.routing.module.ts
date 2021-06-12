import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionCreateComponent } from './components/transaction-create/transaction-create.component';

const routes: Routes = [
  { path: 'create', component: TransactionCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionCreateRoutingModule { }
