import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignRoleGuard } from '../guards/assign-role.guard';
import { LoginGuard } from '../guards/login.guard';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { LoginOtpComponent } from './login/login-otp/login-otp.component';
import { NewLoginComponent } from './login/new-login/new-login.component';
import { OtpComponent } from './otp/otp.component';
import { NewSignupCheckComponent } from './signup/new-signup-check/new-signup-check.component';
import { SignUpProfileComponent } from './signup/sign-up-profile/sign-up-profile.component';
import { SignupCheckComponent } from './signup/signup-check/signup-check.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: 'login',
    component: NewLoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'otp',
    component: OtpComponent,
  },
  {
    path: 'login-otp',
    component: LoginOtpComponent,
    canActivate: [LoginGuard],
  },
  { path: 'signup-role', component: SignupCheckComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'role', component: NewSignupCheckComponent,canActivate:[AssignRoleGuard],canDeactivate:[AssignRoleGuard] },
  { path: 'profile', component: SignUpProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
