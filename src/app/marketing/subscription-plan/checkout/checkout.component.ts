import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HasElementRef } from '@angular/material/core/common-behaviors/color';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'aws-sdk/clients/glue';
import { stat } from 'fs';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LoaderService } from 'src/app/loader.service';
import { ApiResponse } from 'src/app/model/ApiResponse';
import { Auth } from 'src/app/model/Auth';
import { BillingAddressVO } from 'src/app/model/BillingAddressVO';
import { addonns, planlist, SubscriptionPlanOrderRequest, SubscriptionPlanTransactionVO } from 'src/app/model/subscription-PaymentVOs';
import { AuthService } from 'src/app/services/auth.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
declare var Razorpay: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  tab: number = 1
  orderRequest = new SubscriptionPlanOrderRequest()
  isTransactionSuccessSubscription!: Subscription;
  isCouponCanceledSubscription!: Subscription
  isCouponAppliedSubscription!: Subscription
  billingAddressSubscription!: Subscription
  paymentSubscription!: Subscription
  tabSubscription!: Subscription
  @ViewChild('dClick') defaultBtn !: ElementRef;
  constructor(
    private checkoutService: CheckoutService,
    private loader: LoaderService,
    private activatedRoute: ActivatedRoute,
    private subscriptionService: SubscriptionService,
    private location: Location,
  ) {

  }

  @HostListener('window:beforeunload')
  beforeunloadHandler() {
    this.checkoutService.reinitializeCouponState(this.orderRequest.transactionId)
  }

  ngOnDestroy(): void {
    this.checkoutService.tabSubject$.next(1)
    if (this.isTransactionSuccessSubscription) this.isTransactionSuccessSubscription.unsubscribe()
    if (this.isCouponCanceledSubscription) this.isCouponCanceledSubscription.unsubscribe()
    if (this.billingAddressSubscription) this.billingAddressSubscription.unsubscribe()
    if (this.isCouponAppliedSubscription) this.isCouponAppliedSubscription.unsubscribe()
    if (this.paymentSubscription) this.paymentSubscription.unsubscribe()
    if (this.tabSubscription) this.tabSubscription.unsubscribe()
  }
  ngOnInit(): void {
    this.orderRequest.amount = this.activatedRoute.snapshot.queryParams['price']
    this.orderRequest.planId = this.activatedRoute.snapshot.queryParams['id']
    this.orderRequest.addonIds = []
    this.getStates()
    this.getBillingAddress()
    this.getPlanDetails(this.activatedRoute.snapshot.queryParams['id'], this.activatedRoute.snapshot.queryParams['type'])
    this.billingAddress()
    this.couponAppliedSubscription()
    this.couponCanceled()
    this.subscribeToPayment()
    this.subscribeToTabSubject()
  }

  subscribeToTabSubject() {
    this.tabSubscription = this.checkoutService.tabSubject$.subscribe((tab: number) => this.tab = tab)
  }

  billingAddress() {
    this.billingAddressSubscription = this.checkoutService.saveAddressSubject$.subscribe((data: BillingAddressVO) => {
      this.saveBillingAddress(data)
    })
  }

  couponAppliedSubscription() {
    this.isCouponAppliedSubscription = this.checkoutService.isCouponApplied$.subscribe((coupon: string) => {
      if (coupon) {
        this.orderRequest.coupenCode = coupon
        this.createOrder()
      }
    })
  }
  getPlanDetails(id: number, type: string) {
    this.loader.showLoader(
      this.subscriptionService.getplanlist(id, type)).subscribe({
        next: (data: planlist) => { this.checkoutService.planListSubject$.next(data) },
        error: (error: HttpErrorResponse) => {
          Swal.fire('Error', error.error.message, 'error')
          this.location.back()
        }
      }
      )
  }

  getStates() {
    this.loader.showLoader(this.subscriptionService.getstates()).subscribe({
      next: (data: any) => { this.checkoutService.statesSubject$.next(data) },
      error: (error: HttpErrorResponse) => { Swal.fire('Error', 'Error While Fetching States', 'error') }
    })
  }

  saveBillingAddress(address: BillingAddressVO) {
    this.loader.showLoader(
      this.subscriptionService.saveBillingAddress(address)).subscribe({
        next: (data: BillingAddressVO) => {
          if (address.id == null) {
            this.createOrder()
          }
          this.checkoutService.billingAddressSubject$.next(data)
          this.checkoutService.tabSubject$.next(2)
        },
        error: (error: HttpErrorResponse) => {
          Swal.fire('Error', 'Error While Updating Billing Address', 'error')
        }
      })
  }

  getBillingAddress() {
    this.loader.showLoader(
      this.subscriptionService.getBillingAddress()).subscribe({
        next: (data: BillingAddressVO) => {
          if (data != null) {
            this.createOrder()
          }
          this.checkoutService.billingAddressSubject$.next(data)
        }, error: (error: HttpErrorResponse) => {
          Swal.fire('Error', 'Error While Fetching Billing Address', 'error')
        }
      })
  }

  createOrder() {
    this.loader.showLoader(
      this.subscriptionService.createOrder(this.orderRequest)).subscribe({
        next: (data: SubscriptionPlanTransactionVO) => {
          this.orderRequest.transactionId = data.id
          this.checkoutService.createOrderSubject$.next(data)
        },
        error: (error: HttpErrorResponse) => { Swal.fire('Error', error.error.message, 'error') }
      })
  }


  couponCanceled() {
    this.isCouponCanceledSubscription = this.checkoutService.isCouponReinitializeSuccessfully$.subscribe((data: boolean) => {
      if (data) {
        this.orderRequest.coupenCode = undefined
        this.createOrder();
      }
    })
  }

  subscribeToPayment() {
    this.paymentSubscription = this.checkoutService.paymentSubject$.subscribe(() => {
      this.loader.loadingOn()
      this.payment()
    })
  }

  renderNextTab() {
    this.defaultBtn.nativeElement.click();
  }
  changeTabWithSuccess() {
    this.loader.loadingOff()
    this.checkoutService.tabSubject$.next(3)
  }



  paymentSuccess(razorpay_payment_id: string, razorpay_order_id: string, razorpay_signature: string) {
    this.subscriptionService
      .subscriptionPaymentSuccess(
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        this.orderRequest.transactionId
      )
      .subscribe(
        (data: any) => {
          //success
          this.checkoutService.setMsgAndStatus("Payment done successfully", true)
          this.renderNextTab();
        },
        (error: any) => {
          this.checkoutService.setMsgAndStatus("Your Payment has compeleted but there is some issue from our side please contact nrichlearning.com", false)
          this.renderNextTab();
        }
      );
  }

  order: Order = {} as Order;
  options = {
    key: environment.razorpayKeyId, // Enter the Key ID generated from the Dashboard
    amount: 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: 'INR',
    name: 'Nrich Learning',
    description: 'Test Transaction',
    image: 'https://nrichlearning.com/assets/assets/images/nrich_logo.svg',
    order_id: '', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: (response: any) => {
      // alert('sucess');
      this.paymentSuccess(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature)
    },
    prefill: {
      name: 'test',
      email: 'email',
      contact: '1234567899',
    },
    notes: {
      address: 'Nrich Learning',
    },
    theme: {
      color: '#3399cc',
    },
  };

  payment() {
    this.subscriptionService
      .subscriptionPlanPayment(this.orderRequest.transactionId)
      .subscribe(
        (data: SubscriptionPlanTransactionVO) => {
          this.options.amount =
            data.netamount;
          this.options.currency =
            data.currency;
          this.options.order_id =
            data.orderId;
          this.options.prefill.name = AuthService.getUserFirstName;
          this.options.prefill.contact = AuthService.getMobileNumber
          this.options.prefill.email = AuthService.email
          var rzp1 = new Razorpay(this.options);
          rzp1.open();
          rzp1.on('payment.error', (response: any) => {
            this.checkoutService.setMsgAndStatus(response.error.description, false)
            this.renderNextTab();
            this.subscriptionService
              .subscriptionPaymentFailed(
                response.error.metadata.order_id,
                response.error.metadata.payment_id,
                this.orderRequest.transactionId
              )
              .subscribe(
                (data: any) => {
                },
                (error: any) => {
                }
              );
          });
        },
        (error: HttpErrorResponse) => {
        }
      );
  }
}
