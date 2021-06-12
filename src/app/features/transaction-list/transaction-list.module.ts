import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzTableModule } from 'ng-zorro-antd/table';

import { TransactionListRoutingModule } from './transaction-list.routing.module';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';

@NgModule({
  declarations: [
    TransactionListComponent
  ],
  imports: [

    TransactionListRoutingModule,

    NzTableModule,

    FormsModule,
    CommonModule
  ],
  providers: [  ]
})
export class TransactionListModule { }
