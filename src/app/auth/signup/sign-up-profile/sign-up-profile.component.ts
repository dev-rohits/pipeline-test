import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/loader.service';
import { Profile } from 'src/app/model/Profile';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up-profile',
  templateUrl: './sign-up-profile.component.html',
  styleUrls: ['./sign-up-profile.component.scss'],
})
export class SignUpProfileComponent implements OnInit {
  imageSrc!: any;
  signupForm!: UntypedFormGroup;
  referralCode: string | null = '';
  submitted: boolean = false;
  isTeacherOrStudent!: string;
  file!: File;
  file2!: File;
  @ViewChild('fileSelect') fileSelect!: ElementRef;
  profile: Profile = new Profile();
  countryList: string[] = [];
  stateList: string[] = [];

  nextDetails: boolean = false;
  class1: string = 'non-active';
  class2: string = 'non-active';

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private loader: LoaderService,
    private router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.commonService.fetchStatesAndCountries().subscribe((data) => {
      this.countryList = data.countries;
      this.stateList = data.states;
    });
    this.isTeacherOrStudent = this.activatedRoute.snapshot.queryParams['type'];
    this.createSignUpForm();
    this.loader.showLoader(this.authService.getUserProfile('')).subscribe(
      (res) => {
        this.profile = res;
        this.createSignUpForm();
      },
      (err) => {}
    );
  }

  createSignUpForm() {
    this.signupForm = this.fb.group({
      isStudent: [
        this.activatedRoute.snapshot.queryParams['type'],
        Validators.required,
      ],
      name: [this.profile?.name, Validators.required],
      email: [
        this.profile?.email,
        [Validators.email, Validators.required, this.emailvalidate],
      ],
      dob: [
        this.profile?.dob?.toString().substring(0, 10),
        Validators.required,
      ],
      gender: [this.profile?.gender, Validators.required],
      country: [this.profile?.country, Validators.required],
      state: [this.profile?.state, Validators.required],
      agree: [false, Validators.requiredTrue],
    });
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
    };
  }

  createUser() {
    this.loader.loadingOn();
    this.profile = this.signupForm.value;
    this.profile.fromProfile = false;
    this.authService.createUser(this.profile, this.file, this.file2).subscribe(
      (res) => {
        this.loader.loadingOff();
        Swal.fire('Profile created successfully!', '', 'success').then(
          (result) => {
            if (result.isConfirmed) {
              if (this.isTeacherOrStudent == 'student') {
                this.router.navigateByUrl('/student/enrollments');
              }
              if (this.isTeacherOrStudent == 'admin') {
                this.router.navigateByUrl('/admin');
              }
            }
          }
        );
      },
      (err) => {
        this.loader.loadingOff();
        if (err.error.status == '409') {
          Swal.fire('Email already exists!', '', 'error');
        } else {
          Swal.fire('Something went wrong!', 'Internal Server Error', 'error');
        }
      }
    );
  }

  submit() {
    this.submitted = false;
    if (this.signupForm.invalid) {
      this.submitted = true;
      return;
    }
    if (
      !(
        this.signupForm.get('gender')?.value == 'M' ||
        this.signupForm.get('gender')?.value == 'F'
      )
    ) {
      this.submitted = true;
      return;
    }

    this.createUser();
  }

  onlyNumeric(event: any) {
    const keyCode = event.keyCode;
    if (
      (keyCode >= 48 && keyCode <= 57) ||
      keyCode === 8 ||
      keyCode === 46 ||
      (keyCode >= 37 && keyCode <= 40) ||
      (keyCode >= 96 && keyCode <= 105)
    )
      return true;
    return false;
  }

  get controls() {
    return this.signupForm.controls;
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (this.isFileImage(file)) {
        this.file = file;
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event) => {
          this.imageSrc = event?.target?.result;
        };
      }
    } else {
      this.fileSelect.nativeElement.value = '';
      return;
    }
  }

  isFileImage(file: any) {
    const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
    return file && acceptedImageTypes.includes(file['type']);
  }

  setActiveClass(val: number) {
    if (val == 1) {
      this.class1 = 'active';
      this.class2 = 'non-active';
      this.profile.gender = 'M';
      this.signupForm.patchValue({
        gender: 'M',
      });
    } else {
      this.class2 = 'active';
      this.class1 = 'non-active';
      this.profile.gender = 'F';
      this.signupForm.patchValue({
        gender: 'F',
      });
    }
  }

  checkNameAndEmail() {
    this.submitted = false;
    if (
      this.signupForm.get('name')?.invalid ||
      this.signupForm.get('email')?.invalid
    ) {
      this.submitted = true;
      return;
    }
    this.nextDetails = true;
  }
}
