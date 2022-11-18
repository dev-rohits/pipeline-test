import { AfterViewChecked, Injectable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInputLifecycle } from 'aws-sdk/clients/iotevents';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { BatchVO } from 'src/app/model/BatchVO';
import { Course } from 'src/app/model/Course';
import { CourseVO } from 'src/app/model/CourseVO';
import { PricingPlanVO } from 'src/app/model/PricingPlanVO';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class CourseWizardService implements OnInit {
  edit: boolean = false;
  tabSubject$ = new BehaviorSubject<number>(1);
  teachers: { id: number; name: string; image: string }[] = [];
  courseSubject$ = new BehaviorSubject<boolean>(false);
  planSubject$ = new BehaviorSubject<PricingPlanVO | boolean>(true);
  batchSubject$ = new BehaviorSubject<BatchVO | boolean>(true);
  tab: number = 0;
  private course!: Course;
  constructor(private router: Router) {}
  ngOnInit(): void {}
  enableEditMode(edit: boolean) {
    this.edit = edit;
  }

  nextFromTab(tab: number) {
    if (this.edit || this.tab >= tab) {
      if (tab == 3 && this.getPricingPlans.length == 0) {
        return;
      }
      this.tabSubject$.next(tab);
      this.tab = tab;
    }
  }

  next(tab: number) {
    this.tab = tab;
    this.tabSubject$.next(tab);
  }

  setCourse(course: Course) {
    this.course = course;
  }
  get getCourse() {
    return this.course;
  }

  get getPricingPlans(): PricingPlanVO[] {
    return this.course?.pricingPlans;
  }

  get getBatches(): BatchVO[] {
    return this.course?.batches;
  }

  addBatch(batch: BatchVO) {
    this.course.batches.push(batch);
    Swal.fire({
      title: 'Do you want to continue to class configuration?',
      showDenyButton: true,
      confirmButtonText: 'Continue',
      denyButtonText: `Skip`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl(`${AuthService.getModulePrefix}/classes`);
      } 
    })
  }

  editBatch(batch: BatchVO) {
    this.course.batches[
      this.course.batches.findIndex((b) => batch.idBatch == b.idBatch)
    ] = batch;
  }

  deleteBatch(index: number) {
    this.course.batches.splice(index, 1);
  }

  addPricingPlan(plan: PricingPlanVO) {
    this.course.pricingPlans.push(plan);
  }

  updatePricingPlan(plan: PricingPlanVO) {
    this.course.pricingPlans[
      this.course.pricingPlans.findIndex(
        (p) => (plan.idPricingPlan = p.idPricingPlan)
      )
    ] = plan;
  }

  deletePricingPlan(i: number) {
    this.course.pricingPlans.splice(i, 1);
  }

  setTeachers(teachers: any[]) {
    this.teachers = teachers;
  }

  get getTeachers() {
    return this.teachers;
  }
}
