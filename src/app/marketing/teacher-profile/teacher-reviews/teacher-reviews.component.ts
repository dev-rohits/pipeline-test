import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Auth } from 'src/app/model/Auth';
import { AuthService } from 'src/app/services/auth.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-reviews',
  templateUrl: './teacher-reviews.component.html',
  styleUrls: ['./teacher-reviews.component.scss'],
})
export class TeacherReviewsComponent implements OnInit {
  starRating = 0;
  form: UntypedFormGroup;
  result: any;
  isSubmit: boolean = false;
  user_id!: number;

  constructor(
    private fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<TeacherReviewsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private teacherservices: TeacherService
  ) {
    this.form = this.fb.group({
      id: [''],
      userId: [''],
      teacherId: [''],
      rating: ['', Validators.required],
      review: ['', Validators.required],
      userName: [''],
    });
  }

  ngOnInit(): void {}
  close() {
    this.dialogRef.close();
  }

  submit() {
    if (this.form.invalid) {
      this.isSubmit = true;
      return;
    }
    this.user_id = +JSON.parse(localStorage.getItem('auth') || '')?.user_id;
    this.form.get('userId')?.setValue(this.user_id);
    this.form.get('teacherId')?.setValue(this.data.teacherId);
    this.teacherservices
      .savefeedback(this.form.value)
      .subscribe((data: any) => {
        this.dialogRef.close();
      });
  }

  get controls() {
    return this.form.controls;
  }
}
