import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CourseReviewsAndRatingsVO } from 'src/app/model/CourseReviewsAndRatingsVO';
import { CourseVO } from 'src/app/model/CourseVO';
import { DemoClass } from 'src/app/model/DemoClass';
import { MobileCourseVO } from 'src/app/model/MobileCourseVO';
import { PricingPlanVO } from 'src/app/model/PricingPlanVO';
import { CourseService } from 'src/app/services/course/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss'],
})
export class CoursePageComponent implements OnInit {
  courseDetails!: CourseVO;
  pricingPlan: PricingPlanVO[] = [];
  reviewAndRatings: CourseReviewsAndRatingsVO[] = [];
  demoClasses: DemoClass[] = [];
  relatedCourses: MobileCourseVO[] = [];
  recommendedCourses: MobileCourseVO[] = [];
  panelOpenState = false;
  id!: string;
  courses!: MobileCourseVO[];
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['id']) {
        this.id = params['id'];
        this.fetchCourseDetails(this.id);
        this.fetchPricingPlans(this.id);
        this.fetchCourseReviewsAndRatings(this.id);
        this.fetchDemoClasses(this.id);
        this.fetchRecommendedCourses(this.id);
        this.fetchRelatedCourses(this.id);
      } else {
        Swal.fire('Course not found', '', 'error');
        this.router.navigate(['/marketing']);
      }
    });
  }

  fetchCourseDetails(id: string) {
    this.courseService.fetchCourseDetails(Number(id)).subscribe((res) => {
      this.courseDetails = res;
    });
  }

  fetchPricingPlans(id: string) {
    this.courseService.fetchPricingPlan(Number(id)).subscribe((res) => {
      this.pricingPlan = res;
    });
  }

  fetchCourseReviewsAndRatings(id: string) {
    this.courseService
      .fetchCourseReviewsAndRatings(Number(id))
      .subscribe((res) => {
        this.reviewAndRatings = res;
      });
  }

  fetchDemoClasses(id: string) {
    this.courseService.fetchDemoClasses(Number(id)).subscribe((res) => {
      this.demoClasses = res;
    });
  }
  refresh() {
    this.route.queryParams.subscribe((params: Params) => {
      this.fetchCourseReviewsAndRatings(params['id']);
    });
  }

  fetchRecommendedCourses(id: string) {
    this.courseService.fetchRecommendedCourses(Number(id)).subscribe((res) => {
      this.recommendedCourses = res;
    });
  }

  fetchRelatedCourses(id: string) {
    this.courseService.fetchRelatedCourses(Number(id)).subscribe((res) => {
      this.relatedCourses = res;
    });
  }

  refreshDemoClassList() {
    this.fetchDemoClasses(this.id);
  }

  review(event: any) {}

  enroll() {
    const element = document.querySelector('enroll');
    element!.scrollIntoView(true);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
