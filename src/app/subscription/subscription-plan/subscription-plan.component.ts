import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from 'src/app/loader.service';
import { SubscriptionPricingPlans } from 'src/app/model/subscriptionplan.model';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { AddEditPlanComponent } from './add-edit-plan/add-edit-plan.component';

@Component({
  selector: 'app-subscription-plan',
  templateUrl: './subscription-plan.component.html',
  styleUrls: ['./subscription-plan.component.scss']
})
export class SubscriptionPlanComponent implements OnInit {
  subscriptionplanlist: SubscriptionPricingPlans[] = [];
  open!:number;
  constructor(private subscriptionplan : SubscriptionService,private dialog: MatDialog,private loader: LoaderService  ) { }

  ngOnInit(): void {
    this.plans();
  }
plans(){
  this.loader.showLoader( this.subscriptionplan.getPlans()).subscribe((data:any)=>{
    this.subscriptionplanlist=data.body;
  })

}
editPlan(row: SubscriptionPricingPlans) {
  const dialogRef = this.dialog.open(AddEditPlanComponent, {
    disableClose: true,
    data: {
      row: row,
      isEdit: true
    }
  }).afterClosed().subscribe(res4 => this.plans());;
}

addplans() {
  const dialogRef = this.dialog.open(AddEditPlanComponent, {
    disableClose: true,
    data: { isEdit: false }
  }).afterClosed().subscribe(res4 => this.plans());
}
}
