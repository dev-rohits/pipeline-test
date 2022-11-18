import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/loader.service';
import { MobileCourseVO } from 'src/app/model/MobileCourseVO';
import { CommonService } from 'src/app/services/common/common.service';
import { CourseService } from 'src/app/services/course/course.service';
import { InstituteService } from 'src/app/services/institute/institute.service';
import { debounceTime, fromEvent, Subscription } from 'rxjs';
import { CourseCategoryVO } from 'src/app/model/categories.model';
@Component({
  selector: 'app-course-filter',
  templateUrl: './course-filter.component.html',
  styleUrls: ['./course-filter.component.scss'],
})
export class CourseFilterComponent implements OnInit, AfterViewInit, OnDestroy {
  searchRes: any[] = [];
  categoryList: CourseCategoryVO[] = [];
  searchCoursesNames!: string;
  categoryId!: number | undefined
  categoryName!:string
  isSearch: boolean = false
  courseList: MobileCourseVO[] = [];
  config!: number;
  pageNumber: number = 0;
  searchParam!: string;
  idParam: any;
  @ViewChild('courseSearch') courseSearch!: ElementRef;
  searchSubscription!: Subscription
  size: number = 9
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private instituteService: InstituteService,
    private commonService: CommonService,
    private loaderService: LoaderService,
    private activatedRoute: ActivatedRoute
  ) { }
  ngAfterViewInit(): void {
    this.search()
    this.searchCoursesNames = this.activatedRoute.snapshot.queryParams['name']
    if (this.searchCoursesNames) {
      this.courseSearch.nativeElement.value = this.searchCoursesNames
      this.filterCourse()
      return
    }
    this.route.queryParams.subscribe((params) => {
      if (params['search']) {
        this.searchParam = params['search'];
        this.idParam = params['id'];
        this.getCoursesWithPagination();
      }
    });
  }
  ngOnDestroy(): void {
    if (this.searchSubscription) this.searchSubscription.unsubscribe()
  }

  search() {
    this.searchSubscription = fromEvent(
      this.courseSearch.nativeElement,
      'keyup'
    )
      .pipe(debounceTime(1000))
      .subscribe((data: any) => {
        this.searchCoursesNames = data.target.value;
        if (this.searchCoursesNames.length > 3) this.searchCourse()
      });
  }


  nextPage($event: any) {
    this.pageNumber = $event;
    window.scrollTo(0, 0)
    if (this.searchParam && !this.isSearch) {
      this.getCoursesWithPagination();
      return
    }
    this.filterCourse()
  }



  ngOnInit(): void {
    this.searchCourseCategory()
    this.searchParam = this.activatedRoute.snapshot.queryParams['search']
  }

  getCoursesWithPagination() {
    switch (this.searchParam) {
      case 'instituteCourses':
        this.loaderService
          .showLoader(
            this.instituteService
              .fetchInstituteCoursesWithPagination(this.idParam, this.pageNumber))
          .subscribe((res) => {
            this.courseList = res.courses;
            this.config = res.totalCount;
          });
        break;
      case 'newCourses':
        this.loaderService
          .showLoader(
            this.courseService.fetchNewCoursesWithPagination(this.pageNumber)
          )
          .subscribe((res) => {
            this.courseList = res.courses;
            this.config = res.totalCount;
          });
        break;
      case 'freeCourses':
        this.loaderService
          .showLoader(
            this.courseService.fetchFreeCoursesWithPagination(this.pageNumber)
          )
          .subscribe((res) => {
            this.courseList = res.courses;
            this.config = res.totalCount;
          });
        break;
      case 'trendingCourses':
        this.loaderService
          .showLoader(
            this.courseService.fetchTrendingCoursesWithPagination(
              this.pageNumber
            )
          )
          .subscribe((res) => {
            this.courseList = res.courses;
            this.config = res.totalCount;
          });
        break;
      case 'popularCourses':
        this.loaderService
          .showLoader(
            this.courseService.fetchPopularCoursesWithPagination(
              this.pageNumber
            )
          )
          .subscribe((res) => {
            this.courseList = res.courses;
            this.config = res.totalCount;
          });
        break;
      default:
        this.loaderService
          .showLoader(
            this.courseService.fetchAllCoursesWithPagination(this.pageNumber)
          )
          .subscribe((res) => {
            this.courseList = res.courses;
            this.config = res.totalCount;
          });
        break;
    }
  }

  searchCourse() {
    this.loaderService
      .showLoader(this.commonService.searchCourseName(this.searchCoursesNames))
      .subscribe(
        (res) => {
          this.searchRes = res.data.results;
        },
        (error: HttpErrorResponse) => { }
      );
  }

  searchCourseCategory() {
    this.loaderService
      .showLoader(this.courseService.fetchFeatureCategoryList(false))
      .subscribe({
        next: (data: CourseCategoryVO[]) => {
          this.categoryList = data
          console.log(this.categoryList)
        },
        error: (error: HttpErrorResponse) => { }
      });
  }

  searchCourses() {
    this.pageNumber = 0
    this.filterCourse()
    window.scrollTo(0, 0)
  }

  filterCourse() {
    this.isSearch = true
    this.loaderService
      .showLoader(
        this.commonService.filterCourse(
          this.searchCoursesNames,
          this.pageNumber,
          this.size,
          this.activatedRoute.snapshot.queryParams['search'],
          this.categoryId ? this.categoryId : undefined
        )
      )
      .subscribe(
        (res: any) => {
          this.courseList = res.courses;
          this.config = res.totalCount;
        },
        (error: HttpErrorResponse) => { }
      );
  }

  fetchCourseByCategory(event: any) {
    const category = this.categoryList.find((cl) => cl.categoryName === event.target.value)
    this.categoryId = category?.idCourseCategory
  }
}
