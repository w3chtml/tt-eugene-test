import { Component, OnInit } from '@angular/core';

import { TransactionListModel } from '@core/models/transaction-list.model';
import { TransactionService } from '@core/services/transaction.service';

@Component({
  selector: 'app-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: ReadonlyArray<TransactionListModel> = [];
  listOfData: ReadonlyArray<TransactionListModel> = [];
  setOfCheckedId = new Set<number>();

  constructor(private transactionService: TransactionService) {}

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemRemove() {
    this.transactionService.remove();
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: ReadonlyArray<TransactionListModel>): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  ngOnInit(): void {
    this.transactionService.getList();
    this.listOfData = this.transactionService.getList();
  }
}