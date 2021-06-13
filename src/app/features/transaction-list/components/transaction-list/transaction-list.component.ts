import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { merge, Subject } from 'rxjs';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter,
  takeUntil
} from 'rxjs/operators';

import { TransactionListModel } from '@core/models/transaction-list.model';
import { TransactionService } from '@core/services/transaction.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<boolean>();

  searchInput = new FormControl();
  rangeInput = new FormControl();
  searchValue = null;
  rangeValue = null;

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

  onItemRemove(id: number) {
    this.transactionService.remove(id);
    this.listOfData = this.transactionService.getList(this.searchValue, this.rangeValue);
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
    const rangeInput$ = this.rangeInput.valueChanges
      .pipe(map((event) => {
        this.rangeValue = event;
        return event;
      }));
    const idInput$ = this.searchInput.valueChanges.pipe(
        filter(res => res.length > 0),
        debounceTime(300),
        distinctUntilChanged(),
        map((event) => {
          this.searchValue = event;
          return event;
        })
      );

    merge(idInput$, rangeInput$)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        this.listOfData = this.transactionService.getList(this.searchValue, this.rangeValue);
      });

    this.listOfData = this.transactionService.getList(this.searchValue, this.rangeValue);
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}