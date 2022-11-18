import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LoaderService } from 'src/app/loader.service';
import { MobileCourseVO } from 'src/app/model/MobileCourseVO';
import { CourseService } from 'src/app/services/course/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-courses',
  templateUrl: './category-courses.component.html',
  styleUrls: ['./category-courses.component.scss'],
})
export class CategoryCoursesComponent implements OnInit {
  categoryCourses: MobileCourseVO[] = [];
  config!: number;
  pageNumber: number = 0;
  size: number = 3;
  totalElement!: number
  categoryId!: number;
  subSubCategoryId!: number
  name!: string
  isCategoryLoaded:boolean=false
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.subSubCategoryId = params['id']
      this.categoryId = params['categoryId']
      this.name = params['name']
      this.fetchCategoryCourses()
    });
  }

  fetchCategoryCourses() {
    this.isCategoryLoaded=false
    this.categoryCourses=[]
      this.courseService
        .fetchCategoryCourses(this.categoryId, this.subSubCategoryId, this.name, this.pageNumber, this.size)
      .subscribe({
        next: (data: { courses: MobileCourseVO[], totalCount: number }) => {
          this.isCategoryLoaded=true
          this.categoryCourses = data.courses
          this.totalElement = data.totalCount
          window.scrollTo(0,0)
        },
        error: (error: HttpErrorResponse) => {
          this.isCategoryLoaded=true
          Swal.fire('error', 'error while fetching courses', 'error')
        }
      })
  }

  pageChange($event: any) {
    this.pageNumber = $event;
    this.fetchCategoryCourses()
    // this.loader
    //   .showLoader(
    //     this.teacherService.fetchTeachersListWithPagination(this.pageNumber)
    //   )
    //   .subscribe((data: any) => {
    //     this.teachersList = data.teachers;
    //     this.config = data.totalCount;
    //   });
  }
}
