import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtpComponent } from './otp/otp.component';
import { SignupCheckComponent } from './signup/signup-check/signup-check.component';
import { LoginOtpComponent } from './login/login-otp/login-otp.component';
import { SelectInstituteComponent } from './login/select-institute/select-institute.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { NewLoginComponent } from './login/new-login/new-login.component';
import { NewSignupCheckComponent } from './signup/new-signup-check/new-signup-check.component';
import { SignUpProfileComponent } from './signup/sign-up-profile/sign-up-profile.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
    OtpComponent,
    SignupCheckComponent,
    LoginOtpComponent,
    SelectInstituteComponent,
    ForgotPasswordComponent,
    NewLoginComponent,
    NewSignupCheckComponent,
    SignUpProfileComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgOtpInputModule,
    FormsModule,
  ],
})
export class AuthModule {}
