import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseVO } from 'src/app/model/CourseVO';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  @Input('courseDetails') courseDetails?: CourseVO;
  studentFeedback!: UntypedFormGroup;
  submitted: boolean = false;
  @Output() newItemEvent = new EventEmitter<string>();
  constructor(private fb: UntypedFormBuilder, private courseService: CourseService) {}
  ngOnInit(): void {
    this.studentFeedback = this.fb.group({
      rating: ['', Validators.required],
      review: ['', Validators.required],
      userId: [''],
      courseId: [''],
    });
  }
  get fControls() {
    return this.studentFeedback.controls;
  }
  submit() {
    if (this.studentFeedback.status == 'INVALID') {
      alert('invalid');
      this.submitted = true;
      return;
    }
    this.studentFeedback
      .get('userId')
      ?.setValue(+JSON.parse(localStorage.getItem('auth') || '')?.user_id);
    this.studentFeedback
      .get('courseId')
      ?.setValue(this.courseDetails?.idCourse);
    this.courseService
      .saveStudentFeedback(this.studentFeedback.value)
      .subscribe((data: any) => {
        this.newItemEvent.emit();
        this.studentFeedback.reset();
      });
  }
}
