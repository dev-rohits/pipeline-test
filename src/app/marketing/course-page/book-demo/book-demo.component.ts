import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input,Output ,OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

import { Auth } from 'src/app/model/Auth';
import { DemoClass } from 'src/app/model/DemoClass';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-book-demo',
  templateUrl: './book-demo.component.html',
  styleUrls: ['./book-demo.component.scss'],
})
export class BookDemoComponent implements OnInit {
  @Input('demoClasses') demoClasses: DemoClass[] = [];
  @Input('courseName') courseName!: string;
  @Output() refreshDemoClassList = new EventEmitter<void>();
  isLogin: boolean = false;
  form!: UntypedFormGroup;
  submitted: boolean = false;
  classId!: number;
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal!: ElementRef;
  constructor(
    private authService: AuthService,
    private fb: UntypedFormBuilder,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.isLogin = this.authService.isLoggin();
    this.form = this.fb.group({
      remarks: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  bookDemoClass() {
    this.submitted = true;
    if (this.form.status == 'INVALID') {
      return;
    }
    this.courseService
      .bookDemoClass({
        classId: this.classId,
        description: this.form.get('remarks')?.value,
        courseName: this.courseName,
      })
      .subscribe(
        (data: any) => {
          this.refreshDemoClassList.emit()
          alert('Your request for a demo class has been sent successfully.');
          this.closeAddExpenseModal.nativeElement.click();
        },
        (error: HttpErrorResponse) => {
          alert('something went wrong');
        }
      );
  }
}
