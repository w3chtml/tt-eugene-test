import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/core/services/transaction.service';

@Component({
  selector: 'app-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.scss']
})
export class TransactionCreateComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private transactionService: TransactionService) {}

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log('validateForm: ', this.validateForm.value);
    this.transactionService.create(this.validateForm.value);
  }

  get metadata() {
    return this.validateForm.get('metadata') as FormArray;
  }



  ngOnInit(): void {
    this.validateForm = this.fb.group({
      acc: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      currency: ['TZX', [Validators.required]],
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