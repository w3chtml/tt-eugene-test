import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { TransactionListRoutingModule } from './transaction-list.routing.module';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { NgZorroModule } from 'src/app/ng-zorro.module';

@NgModule({
  declarations: [
    TransactionListComponent
  ],
  imports: [

    TransactionListRoutingModule,

    NgZorroModule,

    FormsModule,
    CommonModule
  ],
  providers: [  ]
})
export class TransactionListModule { }
