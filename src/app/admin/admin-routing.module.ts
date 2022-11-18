import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditInstituteComponent } from '../common/add-edit-institute/add-edit-institute.component';
import { AddUserComponent } from '../common/add-user/add-user.component';
import { BulkUserUploadComponent } from '../common/bulk-user-upload/bulk-user-upload.component';
import { ClassConfigurationComponent } from '../common/class-configuration/class-configuration.component';
import { CourseWizardComponent } from '../common/course-wizard/course-wizard.component';
import { CoursesComponent } from '../common/courses/courses.component';
import { ExplorePlansComponent } from '../common/explore-plans/explore-plans.component';
import { FileManagementComponent } from '../common/file-management/file-management.component';
import { OnBoardingPageComponent } from '../common/on-boarding-page/on-boarding-page.component';
import { ProfileComponent } from '../common/profile/profile.component';
import { QuizSubmitByComponent } from '../common/quiz-submit-by/quiz-submit-by.component';
import { SupportPageComponent } from '../common/support-page/support-page.component';
import { UserListingComponent } from '../common/user-listing/user-listing.component';
import { AssignmentSudmitbyComponent } from '../teacher/assignment/assignment-sudmitby/assignment-sudmitby.component';
import { AssignmentComponent } from '../teacher/assignment/assignment.component';
import { AddMaterialComponent } from '../teacher/material-listing/add-material/add-material.component';
import { MaterialListingComponent } from '../teacher/material-listing/material-listing.component';
import { QuizCreationComponent } from '../teacher/quiz-creation/quiz-creation.component';
import { QuizPreviewComponent } from '../teacher/quiz-creation/quiz-preview/quiz-preview.component';
import { QuizListComponent } from '../teacher/quiz-list/quiz-list.component';
import { AddEditRolesComponent } from './add-edit-roles/add-edit-roles.component';
import { AdminBatchesComponent } from './admin-enrollment/admin-batches/admin-batches.component';
import { AdminEnrollmentDetailsComponent } from './admin-enrollment/admin-enrollment-details/admin-enrollment-details.component';
import { AdminEnrollmentComponent } from './admin-enrollment/admin-enrollment.component';
import { AdminComponent } from './admin.component';
import { CourseCategoryManagementComponent } from './course-category-management/course-category-management.component';
import { SubCategoryManagementComponent } from './course-category-management/sub-category-management/sub-category-management.component';
import { SubSubCategoryManagementComponent } from './course-category-management/sub-category-management/sub-sub-category-management/sub-sub-category-management.component';
import { OfflineEnrollmentComponent } from './offline-enrollment/offline-enrollment.component';
import { RolesComponent } from './roles/roles.component';
import { ScreenMappingComponent } from './screen-mapping/screen-mapping.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'roles',
        pathMatch: 'full',
        component: RolesComponent,
      },
      {
        path: 'add-role',
        component: AddEditRolesComponent,
      },
      {
        path: 'screen-mapping',
        component: ScreenMappingComponent,
      },
      {
        path: 'institutes',
        component: AddEditInstituteComponent,
      },
      {
        path: 'courses',
        component: CoursesComponent,
      },
      {
        path: 'users',
        component: UserListingComponent,
      },
      {
        path: 'add-user',
        component: AddUserComponent,
      },
      { path: 'profile', component: ProfileComponent },
      { path: 'classes', component: ClassConfigurationComponent },
      { path: 'material', component: MaterialListingComponent },
      { path: 'assignments', component: AssignmentComponent },
      { path: 'create-course', component: CourseWizardComponent },
      { path: 'add-material', component: AddMaterialComponent },
      { path: 'quiz-creation', component: QuizCreationComponent },
      { path: 'quiz', component: QuizListComponent },
      { path: 'offline-enrollment', component: OfflineEnrollmentComponent },
      { path: 'submit-by/:id', component: AssignmentSudmitbyComponent },
      { path: 'quiz-submit-by', component: QuizSubmitByComponent },
      {
        path: 'enrollments',
        component: AdminEnrollmentComponent,
      },
      {
        path: 'admin-enrollment-details',
        component: AdminEnrollmentDetailsComponent,
      },
      {
        path: 'admin-batches',
        component: AdminBatchesComponent,
      },
      {
        path: 'file',
        component: FileManagementComponent,
      },
      {
        path: 'bulk-users-upload',
        component: BulkUserUploadComponent,
      },
      {
        path: 'quiz-preview',
        component: QuizPreviewComponent,
      },
      {
        path: 'category-management',
        component: CourseCategoryManagementComponent,
      },
      {
        path: 'sub-category-management',
        component: SubCategoryManagementComponent,
      },
      {
        path: 'sub-sub-category-management',
        component: SubSubCategoryManagementComponent,
      },
      {
        path: 'support',
        component: SupportPageComponent,
      },
      {
        path: 'onboard',
        component: OnBoardingPageComponent,
      },
      {
        path: 'explore-plans',
        component: ExplorePlansComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
