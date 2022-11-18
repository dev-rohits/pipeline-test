import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MobileCourseVO } from 'src/app/model/MobileCourseVO';

@Component({
  selector: 'app-related-courses',
  templateUrl: './related-courses.component.html',
  styleUrls: ['./related-courses.component.scss'],
})
export class RelatedCoursesComponent implements OnInit {
  @Input("relatedCourses") relatedCourses: MobileCourseVO[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {}
  viewRelatedCourses(){
    this.router.navigate(['/marketing/course-list'], {
      queryParams: { search: 'allCourses' },
    });
  }
}
