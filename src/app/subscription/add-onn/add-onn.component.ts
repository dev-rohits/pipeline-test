import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { addOnPlan } from 'src/app/model/add-0nn.model';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { AddEditAddonnsComponent } from './add-edit-addonns/add-edit-addonns.component';

@Component({
  selector: 'app-add-onn',
  templateUrl: './add-onn.component.html',
  styleUrls: ['./add-onn.component.scss']
})
export class AddOnnComponent implements OnInit {
  addonslist: addOnPlan [] = [];
  open!:number;

  constructor(private subscription:SubscriptionService,  public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getaddOnns();

  }
getaddOnns(){
  this.subscription.getAddOnPlansList().subscribe((data:any)=>{
    this.addonslist= data?.teacherAddOnPlans.reverse();
  })
}
addons() {
  const dialogRef = this.dialog.open(AddEditAddonnsComponent, {
    disableClose: true,
    data: { isEdit: false },
  });

  dialogRef.afterClosed().subscribe((result) => {
    this.getaddOnns();
  });
}
editPlan(row: addOnPlan) {
  const dialogRef = this.dialog
    .open(AddEditAddonnsComponent, {
      disableClose: true,
      data: {
        row: row,
        isEdit: true,
      },
    })
    .componentInstance.isSuccess.subscribe((data: boolean) => {
      if (data) {
        this.getaddOnns();
      }
    });
}
}
