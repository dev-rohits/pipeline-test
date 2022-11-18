import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/loader.service';
import { BillingAddressVO } from 'src/app/model/BillingAddressVO';
import { CheckoutService } from 'src/app/services/checkout.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';

@Component({
  selector: 'app-contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.scss']
})
export class ContactInformationComponent implements OnInit, OnDestroy {
  billingAddressForm!: FormGroup
  billingAddressVO: BillingAddressVO | undefined
  states: { id: number, stateName: string }[] = []
  submitted: boolean = false
  stateSubscription!: Subscription;
  billingAddressSubscription!: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private checkoutService: CheckoutService
  ) { }
  ngOnDestroy(): void {
    if (this.stateSubscription) this.stateSubscription.unsubscribe()
    if (this.billingAddressSubscription) this.billingAddressSubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.createForm()
    this.checkoutService.statesSubject$.subscribe((data: { id: number, stateName: string }[]) => { this.states = data })
    this.checkoutService.billingAddressSubject$.subscribe((data: BillingAddressVO | undefined) => {
      this.billingAddressVO = data
      this.createForm()
    })

  }

  createForm() {
    this.billingAddressForm = this.formBuilder.group({
      id: [this.billingAddressVO?.id],
      name: [this.billingAddressVO?.name, [Validators.required]],
      email: [this.billingAddressVO?.email, [Validators.required]],
      phoneNumber: [this.billingAddressVO?.phoneNumber, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      country: [this.billingAddressVO?.country, [Validators.required]],
      state: [this.billingAddressVO?.state, [Validators.required]],
      pinCode: [this.billingAddressVO?.pinCode, [Validators.required]],
      gstNumber: [this.billingAddressVO?.gstNumber],
      isGST: [false]
    })
  }

  get controls() {
    return this.billingAddressForm.controls
  }

  payment() {
    this.submitted = true
    if (this.controls['isGST'].value === true) {
      this.controls['gstNumber'].addValidators([Validators.required, Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$")])
      this.controls['gstNumber'].updateValueAndValidity()
    }
    else {
      this.controls['gstNumber'].clearValidators()
      this.controls['gstNumber'].updateValueAndValidity()
    }
    if (this.billingAddressForm.invalid) {
      return
    }
    this.billingAddressVO = this.billingAddressForm.value as BillingAddressVO
    this.checkoutService.saveAddressSubject$.next(this.billingAddressVO)
  }
}
