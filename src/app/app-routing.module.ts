import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { EmailVerificationComponent } from './email-verification/email-verification.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./marketing/marketing.module').then((m) => m.MarketingModule),
  },
  {
    path: 'emailVerification',
    component: EmailVerificationComponent
  },
  {
    path: 'social-connect',
    // canLoad: [LoginGuard],
    loadChildren: () =>
      import('./social-connect/social-connect.module').then(
        (m) => m.SocialConnectModule
      ),
  },
  {
    path: 'teacher',
    // canLoad: [TeacherGuard],
    loadChildren: () =>
      import('./teacher/teacher.module').then((m) => m.TeacherModule),
  },
  {
    path: 'marketing',
    loadChildren: () =>
      import('./marketing/marketing.module').then((m) => m.MarketingModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'student',
    // canLoad: [StudentGuard],
    loadChildren: () =>
      import('./student/student.module').then((m) => m.StudentModule),
  },
  {
    path: 'master',
    // canLoad: [LoginGuard],
    loadChildren: () =>
      import('./subscription/subscription.module').then(
        (m) => m.SubscriptionModule
      ),
  },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
];
const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
 // anchorScrolling: 'enabled',

}
@NgModule({
  imports: [
    RouterModule.forRoot(routes, routerOptions),
  ],

  exports: [RouterModule],
})
export class AppRoutingModule { }
