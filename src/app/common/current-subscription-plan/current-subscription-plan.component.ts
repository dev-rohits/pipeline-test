import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/loader.service';
import { Currentplan } from 'src/app/model/current-plan.model';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-current-subscription-plan',
  templateUrl: './current-subscription-plan.component.html',
  styleUrls: ['./current-subscription-plan.component.scss']
})
export class CurrentSubscriptionPlanComponent implements OnInit {

  currentplan!: Currentplan;
  plan!: Currentplan[];
  addons: any[] = [];
  user: any;
  couponcode: any;
  coupon!: any[];
  link!: string;
  constructor(
    private subscriptionService: SubscriptionService,
    private loader: LoaderService,
  ) {}

  ngOnInit(): void {
  this.reset();
  }

reset(){
  this.loader.loadingOn();
  this.subscriptionService.getmyCoupons().subscribe((data: any) => {
    this.coupon = data.body;
    this.loader.loadingOff();
  });
  this.subscriptionService.getcurrentplan().subscribe((data: any) => {
    this.currentplan = data.body.plans[0];
    this.plan = data.body.plans;
    this.plan.splice(0,1);
    this.user = data.body.users;
    this.couponcode = data.body.code;
    this.addons = this.currentplan.userAddons;
    this.loader.loadingOff();
  });
}
}
