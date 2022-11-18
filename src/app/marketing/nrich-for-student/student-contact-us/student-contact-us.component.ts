import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { ContactCourses } from 'src/app/model/ContactCourses';
import { CourseService } from 'src/app/services/course/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-contact-us',
  templateUrl: './student-contact-us.component.html',
  styleUrls: ['./student-contact-us.component.scss'],
})
export class StudentContactUsComponent implements OnInit {
  form!: UntypedFormGroup;
  courses: ContactCourses[] = [];
  subject = new Subject<string>();
  courseName: string = '';

  constructor(
    private fb: UntypedFormBuilder,
    private courseService: CourseService
  ) {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      mobileNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      id: ['', Validators.required],
    });

    this.subject.pipe(debounceTime(1000)).subscribe((data: string) => {
      if (this.courseName.length >= 3)
        this.courseService
          .searchCourse(this.courseName)
          .subscribe((response: any) => {
            this.courses = response;
          });
      else this.courses = [];
    });
  }

  getCourses(name: any) {
    this.subject.next(name.data);
  }

  get controls() {
    return this.form.controls;
  }

  scrolltop(id: any) {
    let el = document.getElementById(id);
    el?.scrollIntoView();
  }

  submit() {
    if (this.form.status == 'VALID') {
      let selectedId = 0;
      this.courses.forEach((course) => {
        if (course.courseName === this.form.get('id')?.value) {
          selectedId = course.id;
          return;
        }
      });
      this.form.get('id')?.setValue(selectedId);
      this.courseService.contactUs(this.form.value).subscribe(
        (res) => {
          this.form.get('id')?.setValue('');
          this.form.get('name')?.setValue('');
          this.form.get('mobileNumber')?.setValue('');
          Swal.fire('Inquiry sent to Nrich Learning!', '', 'success');
        },
        (err) => {
          Swal.fire('Error while submitting inquiry!', '', 'error');
        }
      );
    } else {
      Swal.fire('Please provide correct information', '', 'error');
    }
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
}
