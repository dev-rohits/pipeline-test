import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/loader.service';

import { AuthService } from 'src/app/services/auth.service';
import { SelectInstituteComponent } from './select-institute/select-institute.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  showLoading: boolean = false;
  submitted: boolean = false;
  message: boolean = false;
  constructor(
    private fb: UntypedFormBuilder,
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  isLoading() {
    this.showLoading = !this.showLoading;
  }
  submit() {
    if (this.loginForm.status == 'INVALID') {
      this.submitted = true;
      return;
    }
    this.loaderService
      .showLoader(
        this.auth.login(
          this.loginForm.get('email')?.value,
          this.loginForm.get('password')?.value,
          false
        )
      )
      .subscribe(
        (auth: any) => {
          
          this.auth.loggedInSubject.next(true);
          localStorage.setItem('isLoggedIn', 'true');
        
          localStorage.setItem('auth',JSON.stringify(auth));
          if (auth.role.authority=='Student' && !auth.hasMultipleRoles){
            this.router.navigateByUrl("/student/enrollments")
          }
          else if(!auth.hasMultipleRoles){
           this.router.navigateByUrl("/teacher/enrollments")
          }
          else{
           this.selectInstitute()
           this.router.navigateByUrl("/student/enrollments")
          }
        },
        (error: HttpErrorResponse) => {
          this.message = true;
        }
      );
  }

  private selectInstitute() {
    this.dialog.open(SelectInstituteComponent, {
      disableClose: true,
    });
  }
  get controls() {
    return this.loginForm.controls;
  }
}
