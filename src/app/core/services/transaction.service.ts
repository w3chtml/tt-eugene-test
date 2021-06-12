import { Injectable } from "@angular/core";
import { TransactionCreateModel } from "../models/transaction-create.model";
import { TransactionListModel } from "../models/transaction-list.model";

@Injectable({ providedIn: 'root' })
export class TransactionService {
    // @todo: add types
    create(newTransaction: TransactionCreateModel) {
        //
    }

    getList(): TransactionListModel[] {
        return new Array(20).fill(0).map((_, index) => {
            return {
              id: index,
              date: Date.now(),
              currency: 'xyz',
              amount: 10 + index
            } as TransactionListModel;
          });
    }

    remove() {
        //
    }
}