import { Component, OnDestroy, OnInit, EventEmitter, Output, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { planlist, SubscriptionPlanOrderRequest, SubscriptionPlanTransactionVO } from 'src/app/model/subscription-PaymentVOs';
import { CheckoutService } from 'src/app/services/checkout.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {
  planList!: planlist | undefined;
  coupon!: string
  subscriptionPlanTransaction: SubscriptionPlanTransactionVO | undefined
  transactionSubject!: Subscription

  constructor(private checkoutService: CheckoutService) { }

  reinitalizeCoupon() {
    this.coupon = ''
    this.checkoutService.reinitializeCouponState(this.subscriptionPlanTransaction?.id)
  }



  ngOnDestroy(): void {
    if (this.transactionSubject) this.transactionSubject.unsubscribe()
  }

  pay() {
    this.checkoutService.paymentSubject$.next()
  }


  goBack() {
    this.checkoutService.tabSubject$.next(1)
  }


  ngOnInit(): void {
    this.checkoutService.planListSubject$.subscribe(
      {
        next: (data: planlist | undefined) => {
          this.planList = data
        }
      }
    )
    this.transactionSubject = this.checkoutService.createOrderSubject$.subscribe((data: SubscriptionPlanTransactionVO | undefined) => {
      this.subscriptionPlanTransaction = data
    })
  }

  applyCoupon() {
    this.checkoutService.isCouponApplied$.next(this.coupon)
  }

}
