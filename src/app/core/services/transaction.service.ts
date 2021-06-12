import { Injectable } from "@angular/core";
import { TransactionCreateModel } from "../models/transaction-create.model";
import { TransactionListModel } from "../models/transaction-list.model";

@Injectable({ providedIn: 'root' })
export class TransactionService {

    create(newTransaction: TransactionCreateModel) {
        const list = this.getListFromStorage();

        newTransaction.date = Date.now();
        newTransaction.id = this.generateId(list);

        list.push(newTransaction);
        this.saveListToStorage(list);
    }

    getList(): TransactionListModel[] {
        const list = this.getListFromStorage();

        // @todo: shold we use here Static lists?
        return list.map((item: TransactionCreateModel) => {
            return {
                id: item.id,
                date: item.date,
                currency: item.currency,
                amount: item.amount
            } as TransactionListModel
        });

    }

    remove(id: number) {
        let list = this.getListFromStorage();
        list = list.filter((item) => item.id !== id);
        this.saveListToStorage(list);
    }

    private saveListToStorage(list: TransactionCreateModel[]) {
        localStorage.setItem('list', JSON.stringify(list));
    }

    private getListFromStorage(): TransactionCreateModel[] {
        return JSON.parse(localStorage.getItem('list')) || [];
    }

    private generateId(list: TransactionCreateModel[]): number {
        if (!list || list.length === 0) {
            return 1;
        }
        return list[list.length - 1].id + 1;
    }
}