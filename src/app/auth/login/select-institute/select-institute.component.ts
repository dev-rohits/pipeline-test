import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Auth } from 'src/app/model/Auth';

import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-select-institute',
  templateUrl: './select-institute.component.html',
  styleUrls: ['./select-institute.component.scss'],
})
export class SelectInstituteComponent implements OnInit {
  institutes: UserInstitutes[] = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<SelectInstituteComponent>
  ) {}

  ngOnInit(): void {
    this.authService.enrollInstituesListRes().subscribe(
      (data: UserInstitutes[]) => {
        this.institutes = data;
      },
      (error: any) => {}
    );
  }

  addRoleAndInstitute(data: number) {}

  submit(id: string) {
    if (!id) {
      Swal.fire('Warning', 'Please Select Institute', 'warning');
      return;
    }
    const selectedInstitute = this.institutes.find(
      (institute) => institute.instituteId == +id
    );
    const auth: Auth = JSON.parse(localStorage.getItem('auth') || '{}');
    auth.role.roleType = selectedInstitute?.roleType;
    auth.selectedInstitute = selectedInstitute?.instituteId;
    localStorage.setItem('auth', JSON.stringify(auth));
    this.router.navigateByUrl('/marketing/home');
    this.dialogRef.close();
  }
}

export class UserInstitutes {
  instituteId!: number;
  instituteName!: string;
  roleType!: string;
}
