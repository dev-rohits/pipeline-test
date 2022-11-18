import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { addOnPlan } from 'src/app/model/add-0nn.model';
import { ApiResponse } from 'src/app/model/ApiResponse';
import { BillingAddressVO } from 'src/app/model/BillingAddressVO';
import { couponVO } from 'src/app/model/coupon.model';
import { SubscriptionPlanOrderRequest } from 'src/app/model/subscription-PaymentVOs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  instituteId = Number.parseInt(
    JSON.parse(localStorage.getItem('auth') || '{}').selectedInstitute
  );

  url = environment.apiEndpoint + '/users';
  constructor(private http: HttpClient) {}
  addCoupons(form: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.post<any>(
      `${environment.apiEndpoint}/users/v1/api/createCoupon`,
      form,
      {
        headers: headers,
      }
    );
  }

  checkStorageInS3Bucket(size: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.post(
      `${environment.apiEndpoint}/users/v1/api/validateUploadDataRequest/${size}/${AuthService.instituteId}`,
      '',
      { headers: headers }
    );
  }

  saveBillingAddress(BillingaddressForm: BillingAddressVO) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .post<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/saveBillingAddress`,
        BillingaddressForm,
        { headers: headers }
      )
      .pipe(
        map((value: ApiResponse) => {
          return value.body;
        })
      );
  }

  downloadFile(eTag: any, key: string, bucketName: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    const params = new HttpParams()
      .append('eTag', eTag)
      .append('bucketName', bucketName)
      .append('key', key)
      .append('idInstitution', AuthService.getInstituteId);
    return this.http.get(`${environment.apiEndpoint}/users/v2/api/download`, {
      headers: headers,
      params: params,
      responseType: 'blob',
    });
  }

  deleteFiles(keys: string[], bucketName: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.post(
      `${environment.apiEndpoint}/users/v2/api/s3FileDelete/${bucketName}`,
      keys,
      { headers: headers }
    );
  }

  getaddonnsPlan(id: number, type: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.get(
      this.url + `/v1/api/fetchAddonsBySubscriptionPlan/${id}/${type}`,
      { headers: headers }
    );
  }
  getcoupens() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });

    return this.http.get<any>(
      `${environment.apiEndpoint}/users/v1/api/fetchCouponDetail`,
      { headers: headers }
    );
  }

  createOrder(order: SubscriptionPlanOrderRequest) {
    order.instituteId = +AuthService.getInstituteId;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .post<ApiResponse>(
        `${environment.apiEndpoint}/users/razorPay/v1/api/subscriptionPlanOrder`,
        order,
        { headers: headers }
      )
      .pipe(
        map((value: ApiResponse) => {
          return value.body;
        })
      );
  }
  getcoupensdetail(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.get<any>(
      `${environment.apiEndpoint}/users/v1/api/fetchCoupons/${id}`,
      { headers: headers }
    );
  }

  getplanlist(id: number, type: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.get<ApiResponse>(this.url + `/v2/api/fetchPlanDetails/${id}/${type}`, {
      headers: headers,
    }).pipe(map((value: ApiResponse) => { return value.body }))
  }
  getRoleByInstitution(idInstitution: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.get<any>(
      `${environment.apiEndpoint}/users/v1/api/rolesByInstitutionId/${idInstitution}`,
      { headers: headers }
    );
  }
  getUserByRole(roleId: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.get<any>(
      `${environment.apiEndpoint}/users/v1/api/users/${roleId}`,
      { headers: headers }
    );
  }
  getSubscriptionplan() {
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${AuthService.getAccessToken}`,
    // });
    return this.http.get(
      `${environment.apiEndpoint}/users/v1/api/fetchSubscriptionPricingPlans`
    );
  }
  addAddon(addOn: addOnPlan) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .post(
        `${environment.apiEndpoint}/users/v1/api/saveSubscriptionAddOnPlan`,
        addOn,
        { headers: headers }
      )
      .pipe(
        map((response: ApiResponse) => {
          return response.body;
        })
      );
  }
  getAddOnPlansList() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.get<any>(
      `${environment.apiEndpoint}/users/v1/api/fetchSubscriptionAddOnList`,
      { headers: headers }
    );
  }
  getPlans() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.get<any>(
      `${environment.apiEndpoint}/users/v1/api/fetchAllSubscriptionPlans`,
      { headers: headers }
    );
  }
  deletePlan(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.delete(
      `${environment.apiEndpoint}/users/v1/api/deleteSubscriptionPlans/${id}`,
      { headers: headers }
    );
  }
  addPlan(planForm: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.post(
      `${environment.apiEndpoint}/users/v1/api/saveSubscriptionPricingPlans`,
      planForm,
      { headers: headers }
    );
  }

  gets3BucketProperties() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/s3BucketProperties/${this.instituteId}`,
        {
          headers: headers,
        }
      )
      .pipe(
        map((response: ApiResponse) => {
          return response.body;
        })
      );
  }

  saveTrialplan(createTrial: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.post<any>(
      `${environment.apiEndpoint}/users/v1/api/createSubscriptionTrial`,
      createTrial,
      { headers: headers }
    );
  }
  getTrialplan() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.get<any>(
      `${environment.apiEndpoint}/users/v1/api/fetchSubscriptionTrials`,
      {
        headers: headers,
      }
    );
  }
  getcurrentplan() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.get(
      `${environment.apiEndpoint}/users/v1/api/fetchCurrentAndFuturePlan`,
      { headers: headers }
    );
  }
  getmyCoupons() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.get(`${environment.apiEndpoint}/users/v1/api/myCoupons`, {
      headers: headers,
    });
  }

  fetchSubscriptionPlanHistory() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.get<any>(
      `${environment.apiEndpoint}/users/v2/api/fetchTransactionHistory`,
      {
        headers: headers,
      }
    );
  }

  getSubscriptionfaq() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.get(this.url + `/v1/api/fetchSubscriptionFAQs`);
  }

  getAddons() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get(
        `${environment.apiEndpoint}/users/v1/api/fetchActiveSubscriptionAddOnList`
      )
      .pipe(
        map((response: ApiResponse) => {
          return response.body;
        })
      );
  }

  isAddonValid(addonId: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.post(
      `${environment.apiEndpoint}/users/v1/api/isAddonValid/${addonId}`,
      '',
      { headers: headers }
    );
  }

  getBillingAddress() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v1/api/getBillingAddress`,
        { headers: headers }
      )
      .pipe(map((res: ApiResponse) => res.body));
  }

  getstates() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get(this.url + `/v1/api/getStates`, { headers: headers })
      .pipe(map((res: ApiResponse) => res.body));
  }

  subscriptionPlanPayment(transactionId: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.post(
      `${environment.apiEndpoint}/users/razorPay/v1/api/subscriptionPricingPlanPayment/${transactionId}`,
      '',
      { headers: headers }
    ).pipe(map((res:ApiResponse)=> res.body))
  }

  subscriptionPaymentSuccess(
    razorpay_payment_id: string,
    razorpay_order_id: string,
    razorpay_signature: string,
    transaction_id: number
  ) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.post(
      `${environment.apiEndpoint}/users/razorPay/v1/api/planPaymentSuccess`,
      {
        razorpay_payment_id: razorpay_payment_id,
        razorpay_order_id: razorpay_order_id,
        razorpay_signature: razorpay_signature,
        transaction_id: transaction_id,
      },
      { headers: headers }
    );
  }

  getUserInfo(instituteId: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.get(
      `${environment.apiEndpoint}/users/v1/api/getUserInfo/${instituteId}`,
      { headers: headers }
    );
  }

  subscriptionPaymentFailed(
    order_id: string,
    payment_id: string,
    transaction_id: number
  ) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.post(
      `${environment.apiEndpoint}/users/razorPay/v1/api/planPurchasedFailed`,
      {
        order_id: order_id,
        payment_id: payment_id,
        transaction_id: transaction_id,
      },
      { headers: headers }
    );
  }

  reinitializeCoupenState(transactionId: number | undefined) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.post<ApiResponse>(
      `${environment.apiEndpoint}/users/razorPay/v1/api/reinitializeCouponState/${transactionId}`,
      '',
      { headers: headers }
    ).pipe(map((res:ApiResponse)=> {return res.body}))
  }
}
