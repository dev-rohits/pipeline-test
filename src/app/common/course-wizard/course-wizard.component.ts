import { I } from '@angular/cdk/keycodes';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/loader.service';
import { BatchVO } from 'src/app/model/BatchVO';
import { Course } from 'src/app/model/Course';
import { PricingPlanVO } from 'src/app/model/PricingPlanVO';
import { BatchService } from 'src/app/services/batch.service';
import { CourseWizardService } from 'src/app/services/course/course-wizard.service';
import { CourseService } from 'src/app/services/course/course.service';
import { PricingPlanService } from 'src/app/services/pricing-plan.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-wizard',
  templateUrl: './course-wizard.component.html',
  styleUrls: ['./course-wizard.component.scss'],
})
export class CourseWizardComponent implements OnInit, OnDestroy {
  tab: number = 1;
  togglePlanForm: boolean = true
  tabSubscription!: Subscription;
  pricingPlanSubscription!: Subscription;
  batchSubscription!: Subscription;
  planSubscription!: Subscription;
  toggleBatchForm: boolean = true
  isEdit:boolean=false;
  constructor(
    private courseWizard: CourseWizardService,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private loader:LoaderService
  ) { }
  ngOnDestroy(): void {
    if (this.tabSubscription) {
      this.tabSubscription.unsubscribe()
    }
    if (this.pricingPlanSubscription) {
      this.pricingPlanSubscription.unsubscribe()
    }
    if (this.batchSubscription) {
      this.batchSubscription.unsubscribe()
    }
    this.courseWizard.tabSubject$.next(1)
    this.courseWizard.setCourse(new Course())
    this.courseWizard.enableEditMode(false)

  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParams['id']) {
      this.isEdit=true
      this.loader.showLoader(this.courseService.fetchCourse(this.activatedRoute.snapshot.queryParams['id'])).subscribe(
        (data: Course) => {
          this.courseWizard.enableEditMode(true)
          this.courseWizard.setCourse(data)
          this.courseWizard.courseSubject$.next(true)
        },
        (error: HttpErrorResponse) => { Swal.fire('Error', 'Somthing Went Wrong', 'error') })
    }
    else {
      this.isEdit=false
      this.courseWizard.courseSubject$.next(false)
    }
    this.tabSubscription = this.courseWizard.tabSubject$.subscribe((data: number) => {
      this.tab = data
    })
    this.batchSubscription = this.courseWizard.batchSubject$.subscribe((id: BatchVO | boolean) => {
      this.toggleBatchForm = typeof (id) == 'boolean' ? id : false;
    })
    this.planSubscription = this.courseWizard.planSubject$.subscribe((data: PricingPlanVO | boolean) => {
      this.togglePlanForm= typeof(data)=='boolean' ? data : false
    })
    this.getTeachersList()
  }

  getTeachersList() {
    this.loader.showLoader(this.courseService.fetchTeachersForCourseMapping()).subscribe({
      next: (data: any[]) => {
        this.courseWizard.setTeachers(data)
      },
      error: (error: HttpErrorResponse) => { },
    });
  }

  nextFromTab(tab: number) {
    this.courseWizard.nextFromTab(tab)
  }



}
