import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/model/ApiResponse';
import { SubscriptionPlanTransactionHistory } from 'src/app/model/Subscription';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-explore-plans',
  templateUrl: './explore-plans.component.html',
  styleUrls: ['./explore-plans.component.scss']
})
export class ExplorePlansComponent implements OnInit {
  annualPlans: any[] = []
  transaction: SubscriptionPlanTransactionHistory[] = []
  constructor(
    private subscriptionService: SubscriptionService,
    private router: Router) { }

  ngOnInit(): void {
    this.subscriptionService.getSubscriptionplan().subscribe({
      next: (data: any) => {
        this.annualPlans = data.teacherPricingPlans;
        console.log(this.annualPlans)
      },
      error: (error: HttpErrorResponse) => {
        Swal.fire('Error', 'Error While Fetching Active Plans')
      }
    }
    );
    this.subscriptionService.fetchSubscriptionPlanHistory().subscribe(
      {
        next: (data: ApiResponse) => {
          this.transaction=data.body
          console.log(this.transaction)
        },
        error: (HttpErrorResponse) => {
          Swal.fire('Error','Error While Fetching Transaction History')
        }
      }
    )
  }

  purchase(id: number, price: number) {
    this.router.navigate(['/marketing/checkout'], {
      queryParams: { id: id, price: price, type: 'pricingplan' },
    });
  }

}
