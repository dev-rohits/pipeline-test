import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemoClass } from 'src/app/model/DemoClass';
import { MobileCourseVO } from 'src/app/model/MobileCourseVO';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-home-courses',
  templateUrl: './home-courses.component.html',
  styleUrls: ['./home-courses.component.scss'],
})
export class HomeCoursesComponent implements OnInit {
  allCourses: MobileCourseVO[] = [];
  freeCourses: MobileCourseVO[] = [];
  newCourses: MobileCourseVO[] = [];
  trendingCourses: MobileCourseVO[] = [];
  popularCourses: MobileCourseVO[] = [];
  webinar: DemoClass[] = [];
  tab: number = 1;

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.courseService.fetchFreeCourses().subscribe((res) => {
      this.freeCourses = res;
      this.allCourses.push(...this.freeCourses);
    });

    this.courseService.fetchNewCourses().subscribe((res) => {
      this.newCourses = res;
      this.allCourses.push(...this.newCourses);
    });

    this.courseService.fetchTrendingCourses().subscribe((res) => {
      this.trendingCourses = res;
      this.allCourses.push(...this.trendingCourses);
    });

    this.courseService.fetchPopularCourses().subscribe((res) => {
      this.popularCourses = res;
      this.allCourses.push(...this.popularCourses);
    });

    this.courseService.fetchWebinars().subscribe((res) => {
        this.webinar = res;
      });


  }

  viewAll() {
    switch (this.tab) {
      case 1:
        this.router.navigate(['/marketing/course-list'], {
          queryParams: { search: 'allCourses' },
        });
        break;
      case 2:
        this.router.navigate(['/marketing/course-list'], {
          queryParams: { search: 'newCourses' },
        });
        break;
      case 3:
        this.router.navigate(['/marketing/course-list'], {
          queryParams: { search: 'freeCourses' },
        });
        break;
      case 4:
        this.router.navigate(['/marketing/course-list'], {
          queryParams: { search: 'trendingCourses' },
        });
        break;
      case 5:
        this.router.navigate(['/marketing/course-list'], {
          queryParams: { search: 'popularCourses' },
        });
        break;
      case 6:
        this.router.navigate(['/marketing/course-list'], {
          queryParams: { search: 'webinar' },
        });
        break;
      default:
        break;
    }
  }
}
