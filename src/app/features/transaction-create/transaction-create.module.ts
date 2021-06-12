import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TransactionCreateRoutingModule } from './transaction-create.routing.module';

@NgModule({
  declarations: [

  ],
  imports: [
    TransactionCreateRoutingModule,

    FormsModule,
    CommonModule
  ],
  providers: [  ]
})
export class TransactionCreateModule { }
