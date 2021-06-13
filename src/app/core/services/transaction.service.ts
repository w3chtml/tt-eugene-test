import { Injectable } from '@angular/core';

import { currencyList } from '@core/models/lists/currencies.list';
import { StaticListModel } from '../models/list.model';
import { TransactionCreateModel } from '../models/transaction-create.model';
import { TransactionListModel } from '../models/transaction-list.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {
    listValues = {};

    create(newTransaction: TransactionCreateModel) {
        const list = this.getListFromStorage();

        newTransaction.metadata = newTransaction.metadata.filter((metadataItem) => metadataItem.keyData || metadataItem.valueData);

        newTransaction.date = Date.now();
        newTransaction.id = this.generateId(list);

        list.push(newTransaction);
        this.saveListToStorage(list);
    }

    getList(searchValue: string, rangeValue: Date[]): TransactionListModel[] {
        let list = this.getListFromStorage();
        if (searchValue) {
            list = list.filter((item: TransactionCreateModel) => {
                return ('' + item.id).indexOf(searchValue) !== -1
            });
        }
        if (rangeValue && rangeValue.length) {
            const from = (new Date(rangeValue[0])).getTime();
            const to = (new Date(rangeValue[1])).getTime();
            list = list.filter((item: TransactionCreateModel) => {
                return item.date >= from && item.date <= to;
            });
        }

        return list.map((item: TransactionCreateModel) => {
            return {
                id: item.id,
                date: item.date,
                currency: this.getListValueByKey(item.currency),
                amount: item.amount
            } as TransactionListModel
        });

    }

    remove(id: number) {
        let list = this.getListFromStorage();
        list = list.filter((item) => item.id !== id);
        this.saveListToStorage(list);
    }

    private getListValueByKey(key: string) {
        if (!this.listValues[key]) {
            currencyList.map((item: StaticListModel) => {
                if (item.key === key) {
                    this.listValues[key] = item.value;
                }
            });
        }

        return this.listValues[key];
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