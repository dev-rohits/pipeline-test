import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';

@Component({
  selector: 'app-coupon-details',
  templateUrl: './coupon-details.component.html',
  styleUrls: ['./coupon-details.component.scss']
})
export class CouponDetailsComponent implements OnInit {
  id!:number;
  coupons!: any [];
  constructor(private subscriptionservices:SubscriptionService,private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((data)=>{
      this.id=data?.['id'];
      
    })
    this.subscriptionservices.getcoupensdetail(this.id).subscribe((res)=>{
      this.coupons=res.body
    })
  }

}
