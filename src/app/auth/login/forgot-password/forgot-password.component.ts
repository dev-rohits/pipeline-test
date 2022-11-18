import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgOtpInputComponent } from 'ng-otp-input';
import { Subscription, timer } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild(NgOtpInputComponent, { static: false })
  ngOtpInput!: NgOtpInputComponent;
  toggleButton: boolean = false;
  submitted: boolean = false;
  forgotPasswordForm!: UntypedFormGroup;
  resendOtp: boolean = false;
  passwordScreen: boolean = false;
  countDown!: Subscription;
  inverseTimer: number = 45;
  InverseTimerDisable: boolean = true;
  enterOtp: boolean = false;
  disabledButton:boolean=false;
  tick = 1000;
  Otp: any;
  key: any;
  loading:boolean=false;
  otpResponseMessage!: string;
  password: boolean = false;
  repeatPassword: boolean = false;
  constructor(private fb: UntypedFormBuilder, private authService: AuthService,private router:Router) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group(
      {
        email: ['', [Validators.required, this.emailvalidate]],
        otp: ['', Validators.required, Validators.minLength(8)],
        new_password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
            ),
          ],
        ],
        confirmpassword: ['', [Validators.required]],
      },
      {
        validator: this.ConfirmedValidator('new_password', 'confirmpassword'),
      }
    );
  }

  get controls() {
    return this.forgotPasswordForm.controls;
  }
  emailvalidate(control: AbstractControl): { [key: string]: any } | null {
    const regexp = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$');
    if (!regexp.test(control.value)) {
      return { emailvalidate: true };
    } else {
      return null;
    }
  }
  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: UntypedFormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
      const regexp = new RegExp(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
      );
      if (!regexp.test(control.value)) {
        return { passwordvalidate: true };
      } else {
        return null;
      }
    };
  }

  sendOtp() {
    this.disabledButton=true;
    this.loading=true;
    this.authService
      .signInWithOtpSent(this.forgotPasswordForm.value.email)
      .subscribe((res: any) => {
        this.otpResponseMessage=res.message;
        this.loading=false;
        this.disabledButton=false;
        this.enterOtp=true;
      } ,(error: HttpErrorResponse) => {
        this.loading=false;
        this.disabledButton=false;
        Swal.fire({ icon: 'error', text: error.error.errorMessage });
        this.resetOtpValue();
      });
  }

  onOtpChange(event: any) {
    this.Otp = event;
  }
  resetOtpValue() {
    this.ngOtpInput.setValue(null);
  }

  confirmOtp() {
    this.disabledButton=true;
    this.loading=true;
    this.authService
      .confirmOtp(this.forgotPasswordForm.value.email, this.Otp)
      .subscribe(
        (res: any) => {
          this.loading=false;
          this.disabledButton=false;
          this.passwordScreen = true;
          this.key = res.key;
          this.resetOtpValue();
        },
        (error: HttpErrorResponse) => {
          this.loading=false;
          this.disabledButton=false;
          Swal.fire({ icon: 'error', text:  error.error.message });
          this.resetOtpValue();
        }
      );
  }

  changePassword() {
    this.loading=true;
    this.disabledButton=true;
    let passwordMapObject = {
      key: this.key,
      newPassword: this.forgotPasswordForm.value.new_password,
      confirmPassword: this.forgotPasswordForm.value.confirmpassword,
    };
    this.authService.savePassword(passwordMapObject).subscribe((res: any) => {
      this.loading=false;
        this.disabledButton=false;
      Swal.fire({ icon: 'success', text: res.message });
      this.router.navigateByUrl("/auth/login");
    },
    (error: HttpErrorResponse) =>
    {
      Swal.fire({ icon: 'error', text:  error.error.message });
      this.loading=false;
      this.disabledButton=false;
    });
  }

  private startInverseTimer() {
    this.InverseTimerDisable = true;
    this.countDown = timer(0, this.tick).subscribe(() => {
      this.inverseTimer -= 1;
      if (this.inverseTimer < 0) {
        this.resendOtp = true;
        this.InverseTimerDisable = false;
        this.unsubscribeCounter();
      }
    });
  }
  unsubscribeCounter() {
    this.inverseTimer = 45;
    this.countDown.unsubscribe();
  }
  ngOnDestroy(): void {
    if (this.countDown) {
      this.countDown.unsubscribe();
    }
  }

  showCPassword() {
    this.repeatPassword = !this.repeatPassword;
  }
  showPassword() {
    this.password = !this.password;
  }
}
