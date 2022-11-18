import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PricingPlanVO } from 'src/app/model/PricingPlanVO';
import { AuthService } from 'src/app/services/auth.service';
import { BuyCourseComponent } from '../buy-course/buy-course.component';

@Component({
  selector: 'app-pricing-plans',
  templateUrl: './pricing-plans.component.html',
  styleUrls: ['./pricing-plans.component.scss'],
})
export class PricingPlansComponent implements OnInit {
  @Input('pricingPlan') pricingPlan: PricingPlanVO[] = [];
  isLogin!: boolean;

  constructor(
    private router: Router,
    private auth: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLogin = this.auth.isLoggin();
  }

  login() {
    if (this.isLogin) {
      return;
    }
    this.router.navigate(['/auth/login']);
  }

  pricingPlanInfo(plan: PricingPlanVO) {
    let dialogRef = this.dialog.open(BuyCourseComponent, {
      data: {
        pricingPlanId: plan.idPricingPlan,
      },
    });
  }
}
