import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TransactionService } from '@core/services/transaction.service';
import { accountList } from '@core/models/lists/account.list';
import { currencyList } from '@core/models/lists/currencies.list';
import { destinationList } from '@core/models/lists/destination.list';
import { StaticListModel } from '@core/models/list.model';
import { metadataValidator } from '../../validators/metadata.validator';


@Component({
  selector: 'app-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.scss']
})
export class TransactionCreateComponent implements OnInit {
  validateForm!: FormGroup;
  accounts: StaticListModel[] = [];
  currencies: StaticListModel[] = [];
  destinations: StaticListModel[] = [];

  constructor(private fb: FormBuilder, private transactionService: TransactionService, private router: Router) {
    this.accounts = accountList;
    this.currencies = currencyList;
    this.destinations = destinationList;
  }

  get metadata() {
    return this.validateForm.get('metadata') as FormArray;
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.transactionService.create(this.validateForm.value);
    this.router.navigate(['list']);
  }

  onCancel() {
    this.router.navigate(['list']);
  }

  onDeleteMetaItem(index: number, e: MouseEvent) {
    this.metadata.removeAt(index);
    e.preventDefault();
  }

  onMetaKeyDown(valueLength: string) {
    if (!valueLength) {
      return;
    }
    const lastMetaItem = this.metadata.value[this.metadata.value.length - 1];
    if (!lastMetaItem.keyData && !lastMetaItem.valueData) {
      return;
    }
    this.metadata.push(
      this.fb.group({ keyData: [null], valueData: [null] })
    );
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      acc: [null, [Validators.required]],
      amount: [null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      currency: [this.currencies[0].key, [Validators.required]],
      isPaidFee: [false],
      destination: [null, [Validators.required]],
      metadata: this.fb.array([
        this.fb.group({
          keyData: [null],
          valueData: [null]
        })
      ], metadataValidator())
    });
  }
}
