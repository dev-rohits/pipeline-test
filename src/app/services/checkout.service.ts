import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stat } from 'fs';
import { BehaviorSubject, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { LoaderService } from '../loader.service';
import { BillingAddressVO } from '../model/BillingAddressVO';
import { planlist, SubscriptionPlanOrderRequest, SubscriptionPlanTransactionVO } from '../model/subscription-PaymentVOs';
import { SubscriptionService } from './subscription/subscription.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  billingAddressSubject$ = new BehaviorSubject<BillingAddressVO | undefined>(undefined);
  saveAddressSubject$ = new Subject<BillingAddressVO>();
  statesSubject$ = new BehaviorSubject<{ id: number, stateName: string }[]>([]);
  tabSubject$ = new BehaviorSubject<number>(1);
  planListSubject$ = new BehaviorSubject<planlist | undefined>(undefined);
  createOrderSubject$ = new BehaviorSubject<SubscriptionPlanTransactionVO | undefined>(undefined)
  isCouponReinitializeSuccessfully$ = new BehaviorSubject<boolean>(false)
  isCouponApplied$ = new Subject<string>()
  paymentSubject$ = new Subject<void>()
  paymentStatus: boolean = false
  msg: string = ''

  constructor(
    private subscriptionService: SubscriptionService,
  ) { }

  setMsgAndStatus(msg: string, status: boolean) {
    this.msg = msg
    this.paymentStatus = status
  }


  reinitializeCouponState(id: number | undefined) {
    this.subscriptionService
      .reinitializeCoupenState(id)
      .subscribe({
        next: (data: any) => {
          this.isCouponReinitializeSuccessfully$.next(true)
        },
        error: (error: HttpErrorResponse) => {
        }
      }
      );
  }


}
