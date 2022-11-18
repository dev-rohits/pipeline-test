import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/model/ApiResponse';
import { SubscriptionPlanTransactionHistory } from 'src/app/model/Subscription';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';

@Component({
  selector: 'app-user-transaction-history',
  templateUrl: './user-transaction-history.component.html',
  styleUrls: ['./user-transaction-history.component.scss']
})
export class UserTransactionHistoryComponent implements OnInit {
  TransactionHistory: SubscriptionPlanTransactionHistory[] = [];
  constructor(private subscriptionPlanService: SubscriptionService) { }

  ngOnInit(): void {
    this.subscriptionPlanService
      .fetchSubscriptionPlanHistory()
      .subscribe((res: ApiResponse) => {
        this.TransactionHistory = res.body;
        console.log(this.TransactionHistory)
      });
  }

}
