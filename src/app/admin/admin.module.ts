import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CommonModule2 } from '../common/common.module';
import { RolesComponent } from './roles/roles.component';
import { AddEditRolesComponent } from './add-edit-roles/add-edit-roles.component';
import { ScreenMappingComponent } from './screen-mapping/screen-mapping.component';
import { MatButtonModule } from '@angular/material/button';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';
import { OfflineEnrollmentComponent } from './offline-enrollment/offline-enrollment.component';
import { MatIconModule } from '@angular/material/icon';
import { AdminEnrollmentComponent } from './admin-enrollment/admin-enrollment.component';
import { AdminEnrollmentDetailsComponent } from './admin-enrollment/admin-enrollment-details/admin-enrollment-details.component';
import { AdminClassesComponent } from './admin-enrollment/admin-enrollment-details/admin-classes/admin-classes.component';
import { AdminDemoclassesComponent } from './admin-enrollment/admin-enrollment-details/admin-democlasses/admin-democlasses.component';
import { AdminAllAssignmentsComponent } from './admin-enrollment/admin-enrollment-details/admin-all-assignments/admin-all-assignments.component';
import { AdminAllMaterialComponent } from './admin-enrollment/admin-enrollment-details/admin-all-material/admin-all-material.component';
import { AdminAllQuizComponent } from './admin-enrollment/admin-enrollment-details/admin-all-quiz/admin-all-quiz.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminBatchesComponent } from './admin-enrollment/admin-batches/admin-batches.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseCategoryManagementComponent } from './course-category-management/course-category-management.component';
import { CreateCategoryComponent } from './course-category-management/create-category/create-category.component';
import { SubCategoryManagementComponent } from './course-category-management/sub-category-management/sub-category-management.component';
import { SubSubCategoryManagementComponent } from './course-category-management/sub-category-management/sub-sub-category-management/sub-sub-category-management.component';
import { CreateSubCategoryComponent } from './course-category-management/sub-category-management/create-sub-category/create-sub-category.component';
import { CreateSubSubCategoryComponent } from './course-category-management/sub-category-management/sub-sub-category-management/create-sub-sub-category/create-sub-sub-category.component';
import { MatMenuModule } from '@angular/material/menu';
import { AdminWebinarsComponent } from './admin-enrollment/admin-enrollment-details/admin-webinars/admin-webinars.component';

@NgModule({
  declarations: [
    AdminComponent,
    RolesComponent,
    AddEditRolesComponent,
    ScreenMappingComponent,
    OfflineEnrollmentComponent,
    AdminEnrollmentComponent,
    AdminEnrollmentDetailsComponent,
    AdminClassesComponent,
    AdminDemoclassesComponent,
    AdminAllAssignmentsComponent,
    AdminAllMaterialComponent,
    AdminAllQuizComponent,
    AdminBatchesComponent,
    CourseCategoryManagementComponent,
    CreateCategoryComponent,
    SubCategoryManagementComponent,
    SubSubCategoryManagementComponent,
    CreateSubCategoryComponent,
    CreateSubSubCategoryComponent,
    AdminWebinarsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CommonModule2,
    MatButtonModule,
    FormsModule,
    MatSnackBarModule,
    MatChipsModule,
    MatIconModule,
    MatTabsModule,
    MatPaginatorModule,
    MatMenuModule,
    ReactiveFormsModule
  ]
})
export class AdminModule {}
