import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionComponent } from './subscription.component';
import { CouponCodeComponent } from './coupon-code/coupon-code.component';
import { AddEditCouponComponent } from './coupon-code/add-edit-coupon/add-edit-coupon.component';
import { CouponDetailsComponent } from './coupon-code/coupon-details/coupon-details.component';
import { CommonModule2 } from '../common/common.module';
import { MatDialogModule } from '@angular/material/dialog';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AddOnnComponent } from './add-onn/add-onn.component';
import { AddEditAddonnsComponent } from './add-onn/add-edit-addonns/add-edit-addonns.component';
import { SubscriptionPlanComponent } from './subscription-plan/subscription-plan.component';
import { AddEditPlanComponent } from './subscription-plan/add-edit-plan/add-edit-plan.component';
import { FileManagementComponent } from './file-management/file-management.component';
import { TrialPlanComponent } from './trial-plan/trial-plan.component';
import { AddEditTrialplanComponent } from './trial-plan/add-edit-trialplan/add-edit-trialplan.component';
import { UserTrialplanExtendComponent } from './user-trialplan-extend/user-trialplan-extend.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SubscriptionComponent,
    CouponCodeComponent,
    AddEditCouponComponent,
    CouponDetailsComponent,
    AddOnnComponent,
    AddEditAddonnsComponent,
    SubscriptionPlanComponent,
    AddEditPlanComponent,
    FileManagementComponent,
    TrialPlanComponent,
    AddEditTrialplanComponent,
    UserTrialplanExtendComponent,
  ],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    CommonModule2,
    MatDialogModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
  ],
  providers: [DatePipe],
})
export class SubscriptionModule {}
