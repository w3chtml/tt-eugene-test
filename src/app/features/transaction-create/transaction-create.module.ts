import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TransactionCreateRoutingModule } from './transaction-create.routing.module';
import { TransactionCreateComponent } from './components/transaction-create/transaction-create.component';
import { NgZorroModule } from 'src/app/ng-zorro.module';

@NgModule({
  declarations: [
    TransactionCreateComponent
  ],
  imports: [
    TransactionCreateRoutingModule,
    NgZorroModule,
    ReactiveFormsModule,

    FormsModule,
    CommonModule
  ],
  providers: [  ]
})
export class TransactionCreateModule { }
