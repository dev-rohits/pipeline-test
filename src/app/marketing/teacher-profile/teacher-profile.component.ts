import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';

import { CourseReviewsAndRatingsVO } from 'src/app/model/CourseReviewsAndRatingsVO';
import { MobileCourseVO } from 'src/app/model/MobileCourseVO';
import { teacherDetails } from 'src/app/model/teacher-info';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common/common.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { TeacherReviewsComponent } from './teacher-reviews/teacher-reviews.component';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss'],
})
export class TeacherProfileComponent implements OnInit {
  id: any;
  teacherDetails!: teacherDetails;
  @ViewChild('videoPlayer')
  videoplayer!: ElementRef;
  teachercourselist: MobileCourseVO[] = [];
  teacherReviewlist: CourseReviewsAndRatingsVO[] = [];
  form: FormGroup;
  isSubmit: boolean = false;
  constructor(
    private teacherService: TeacherService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public authService: AuthService
  ) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      inquiry: ['', Validators.required],
      teacherName: [null],
      teacherId: [null],
      courseId: [null],
      courseName: [null, Validators.required],
      email: [null],
      userId: [null],
      instituteId: [null],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['id']) {
        this.id = params['id'];
        this.getTeacherDetails();
        this.teacherService.getTeacherCoures(this.id).subscribe((data: any) => {
          this.teachercourselist = data.body;
        });
        this.teacherService
          .getTeacherReviews(this.id)
          .subscribe((data: any) => {
            this.teacherReviewlist = data.ratings.teacherReviewsAndRatings;
          });
      }
    });
    this.teacherService.getTeacherDetails(this.id).subscribe((data: any) => {
      this.teacherDetails = data.body;
    });
    this.teacherService.getTeacherCoures(this.id).subscribe((data: any) => {
      this.teachercourselist = data.body;
    });

    this.review();
  }

  getTeacherDetails() {
    this.teacherService.getTeacherDetails(this.id).subscribe((data: any) => {
      this.teacherDetails = data.body;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TeacherReviewsComponent, {
      data: { teacherId: this.teacherDetails.id },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getTeacherDetails();
      this.review();
    });
  }
  
  video() {
    this.videoplayer?.nativeElement.play();
  }
  get controls() {
    return this.form.controls;
  }
  submit() {
    if (this.form.invalid) {
      this.isSubmit = true;
      return;
    }
    this.form.get('teacherId')?.setValue(this.teacherDetails.id);
    this.commonService.saveInquiry(this.form.value).subscribe((data: any) => {
      this.form.reset();
    });
  }
  review() {
    this.teacherService.getTeacherReviews(this.id).subscribe((data: any) => {
      this.teacherReviewlist = data.ratings.teacherReviewsAndRatings;
    });
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
