import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InstituteDetails } from 'src/app/model/institute-details';
import { TeachersList } from 'src/app/model/feature-home-teacher.model';
import { MobileCourseVO } from 'src/app/model/MobileCourseVO';
import { InstituteService } from 'src/app/services/institute/institute.service';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-institute-page',
  templateUrl: './institute-page.component.html',
  styleUrls: ['./institute-page.component.scss'],
})
export class InstitutePageComponent implements OnInit {
  @ViewChild('slickModal', { static: true })
  slickModal!: SlickCarouselComponent;
  scrHeight: any;
  scrWidth: any;
  lazyLoading: boolean = true;
  flipCard: boolean = false;
  id: any;
  instituteName: any;
  instituteDetails!: InstituteDetails;
  courseList: MobileCourseVO[] = [];
  teacherlist: TeachersList[] = [];
  form: UntypedFormGroup;
  isSubmit: boolean = false;
  totalCount!: number;

  constructor(
    private teacherservices: TeacherService,
    private instituteService: InstituteService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private router: Router
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
        this.instituteName = params['name'];
        this.instituteService.fetchInstitute(this.id).subscribe((data: any) => {
          this.instituteDetails = data.body;
        });
        this.instituteService
          .fetchInstituteTeacherList(this.id)
          .subscribe((data: any) => {
            this.teacherlist = data.body.teachers;
            this.totalCount=data.total_count;
          });
        this.instituteService
          .fetchInstituteCourseList(this.id)
          .subscribe((data: any) => {
            this.courseList = data.body.courses;
            this.totalCount=data.total_count;
          });
      }
    });
  }

  viewAllCourses() {
    if (this.id) {
      this.router.navigate(['/marketing/course-list'], {
        queryParams: {
          search: 'instituteCourses',
          id: this.id,
        },
      });
    }
  }

  viewAllTutors() {
    if (this.id) {
      this.router.navigate(['/marketing/educator-list'], {
        queryParams: {
          search: 'instituteEducators',
          id: this.id,
        },
      });
    }
  }

  // submit() {
  //   if (this.form.invalid) {
  //     this.isSubmit = true;
  //     return;
  //   }
  //   this.form.get('instituteId')?.setValue(this.instituteDetails.idInstitution);
  //   this.teacherservices.saveInquiry(this.form.value).subscribe((data: any) => {
  //     this.form.reset();
  //   });
  // }

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 2,
    dots: false,
    arrows: false,
    vertical: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  slickInit(_e: any) {}

  breakpoint(_e: any) {}

  afterChange(_e: any) {
    this.lazyLoading = false;
  }

  beforeChange(_e: any) {}
  next() {
    this.slickModal.slickNext();
  }
  prev() {
    this.slickModal.slickPrev();
  }
  get controls() {
    return this.form.controls;
  }
  submit() {
    if (this.form.invalid) {
      this.isSubmit = true;
      return;
    }
    this.form.get('instituteId')?.setValue(this.instituteDetails.idInstitution);
    this.commonService.saveInquiry(this.form.value).subscribe((data: any) => {
      this.form.reset();
    });
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
