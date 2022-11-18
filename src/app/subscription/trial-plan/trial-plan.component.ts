import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Triallist } from 'src/app/model/coupon.model';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { AddEditTrialplanComponent } from './add-edit-trialplan/add-edit-trialplan.component';

@Component({
  selector: 'app-trial-plan',
  templateUrl: './trial-plan.component.html',
  styleUrls: ['./trial-plan.component.scss']
})
export class TrialPlanComponent implements OnInit {
  Trial:Triallist []=[];
  constructor(private subscriptionplanservices:SubscriptionService, public dialog: MatDialog,) { }

  ngOnInit(): void {
   this.refresh();
  }

addTrial(){
  const dialogRef = this.dialog.open(AddEditTrialplanComponent, {
    data: {
      isEdit:false
    },
  });

  dialogRef.afterClosed().subscribe((result) => {
  this.refresh(); 
  });
}
editTrial(element:any){
  const dialogRef = this.dialog.open(AddEditTrialplanComponent, {
    data: {
      Body:element,
      isEdit:true
    },
  });

  dialogRef.afterClosed().subscribe((result) => {
  this.refresh(); 
  });
}
refresh(){
  this.subscriptionplanservices.getTrialplan().subscribe((res)=>{
    this.Trial=res.data;
  
  })
}
}
