import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnBoardingPageComponent } from '../common/on-boarding-page/on-boarding-page.component';
import { ProfileComponent } from '../common/profile/profile.component';
import { SupportPageComponent } from '../common/support-page/support-page.component';
import { ExamComponent } from './exam/exam.component';
import { StudentDashboardInfoComponent } from './student-enrollment/student-dashboard-info/student-dashboard-info.component';
import { StudentEnrollmentComponent } from './student-enrollment/student-enrollment.component';
import { StudentComponent } from './student.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      { path: 'enrollments', component: StudentEnrollmentComponent },
      {
        path: 'student-enrollment-details',
        component: StudentDashboardInfoComponent,
      },
      { path: 'profile', component: ProfileComponent },
      { path: 'exam/:id', component: ExamComponent },
      {
        path: 'support',
        component: SupportPageComponent,
      },
      {
        path: 'onboard',
        component: OnBoardingPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
