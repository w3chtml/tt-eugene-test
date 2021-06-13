import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [  ]
})
export class TransactionListModule { }
