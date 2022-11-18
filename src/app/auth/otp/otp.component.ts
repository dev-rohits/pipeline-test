import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgOtpInputComponent } from 'ng-otp-input';
import { LoaderService } from 'src/app/loader.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  borderradius!: '39px';
  @ViewChild(NgOtpInputComponent, { static: false })
  ngOtpInput!: NgOtpInputComponent;
  showLoading: boolean = false;
  email!: string;
  referralCode: any;
  clicked: boolean = true;
  otp!: number;
  // timeLeft: number = 3;
  // interval: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      (this.email = data.id), (this.referralCode = data.referralCode);
      localStorage.setItem('email', this.email);
    });

    // this.startTimer();
  }

  // startTimer() {
  //   this.interval = setInterval(() => {
  //     if (this.timeLeft > 0) {
  //       this.timeLeft--;
  //     } else {
  //       // this.timeLeft = 30;
  //     }
  //   }, 1000);
  // }

  // resendOtp() {
  //   this.loader.loadingOn();
  //   this.authService.resendOtp(this.email).subscribe(
  //     (res) => {
  //       this.loader.loadingOff();
  //       Swal.fire('OTP resent on registered mobile number!', '', 'success');
  //       this.timeLeft = 30;
  //     },
  //     (err) => {
  //       this.loader.loadingOff();
  //       Swal.fire('Something went wrong!', 'Internal Server Error', 'error');
  //     }
  //   );
  // }

  onOtpChange(event: any) {
    if (event.length === 4) {
      this.otp = event;
      this.clicked = false;
    }
  }

  submit() {
    this.clicked = true;
    this.loader.loadingOn();
    this.authService
      .checkOTP({
        otp: this.otp,
        email: this.email,
        referralCode: this.referralCode,
      })
      .subscribe(
        (res: any) => {
          this.loader.loadingOff();
          this.router.navigate(['/auth/login'], {
            queryParams: { message: 'You have successfully registered.' },
          });
          Swal.fire('Registered Successfully!', '', 'success');
        },
        (err: HttpErrorResponse) => {
          this.loader.loadingOff();
          Swal.fire('Something went wrong!', 'Internal Server Error', 'error');
          this.clicked = false;
        }
      );
  }
}
