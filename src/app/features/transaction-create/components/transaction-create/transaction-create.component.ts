import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TransactionService } from '@core/services/transaction.service';
import { accountList } from '@core/models/lists/account.list';
import { currencyList } from '@core/models/lists/currencies.list';
import { destinationList } from '@core/models/lists/destination.list';
import { StaticListModel } from '@core/models/list.model';


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

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    // console.log('validateForm: ', this.validateForm.value);
    this.transactionService.create(this.validateForm.value);
    this.router.navigate(['list']);
  }

  get metadata() {
    return this.validateForm.get('metadata') as FormArray;
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      acc: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      currency: [this.currencies[0].key, [Validators.required]],
      isPaidFee: [false],
      destination: [null, [Validators.required]],
      metadata: this.fb.array([
        this.fb.group({
          keyData: [null, [Validators.required]],
          valueData: [null, [Validators.required]]
        })
      ])
    });
  }
}