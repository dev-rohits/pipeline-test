import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CouponList } from 'src/app/model/coupon.model';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { AddEditCouponComponent } from './add-edit-coupon/add-edit-coupon.component';

@Component({
  selector: 'app-coupon-code',
  templateUrl: './coupon-code.component.html',
  styleUrls: ['./coupon-code.component.scss']
})
export class CouponCodeComponent implements OnInit {
  couponlist: CouponList[] = [];



  constructor(public dialog: MatDialog, private subscriptionservices: SubscriptionService, private router: Router,) { }

  ngOnInit(): void {
    this.refresh();


  }
  addcoupen() {
    const dialogRef = this.dialog.open(AddEditCouponComponent, {
      data: {
        isEdit: false
      }

    });

    dialogRef.afterClosed().subscribe((result) => {
      this.refresh();
    });


  }
  refresh() {
    this.subscriptionservices.getcoupens().subscribe((res) => {
      this.couponlist = res.body.reverse();

    });

  }
  edit(element: any) {
    const dialogRef = this.dialog.open(AddEditCouponComponent, {
      data: {
        Body: element,
        isEdit: true
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.refresh();
    });
  }
  view(id: any) {
    this.router.navigate(['/master/coupon-details'], {
      queryParams: { id: id, },
    });

  }

}


