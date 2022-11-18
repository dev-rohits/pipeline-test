import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/loader.service';
import { CourseCategoryVO } from 'src/app/model/categories.model';
import { MobileCourseVO } from 'src/app/model/MobileCourseVO';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: CourseCategoryVO[] = [];
  firstCourse!: MobileCourseVO;
  secondCourse!: MobileCourseVO;

  constructor(
    private courseService: CourseService,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {

    this.loader
      .showLoader(this.courseService.fetchFeatureCategoryList(false))
      .subscribe((res) => {
        this.categories = res;
      });

      this.courseService.fetchNewCourses().subscribe((res) => {
      this.firstCourse = res[0];
      console.log(this.firstCourse)
      this.secondCourse = res[1];
    });
  }
}
