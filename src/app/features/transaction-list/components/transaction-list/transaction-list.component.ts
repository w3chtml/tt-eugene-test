import { Component, OnInit } from '@angular/core';

import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: ReadonlyArray<Transaction> = [];
  listOfData: ReadonlyArray<Transaction> = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  // onAllChecked(value: boolean): void {
  //   this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
  //   this.refreshCheckedStatus();
  // }

  onCurrentPageDataChange($event: ReadonlyArray<Transaction>): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  ngOnInit(): void {
    this.listOfData = new Array(20).fill(0).map((_, index) => {
      return {
        id: index,
        date: Date.now(),
        currency: 'xyz',
        amount: 10 + index
      };
    });
  }
}