import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/loader.service';
import { TeachersList } from 'src/app/model/feature-home-teacher.model';
import { CommonService } from 'src/app/services/common/common.service';
import { InstituteService } from 'src/app/services/institute/institute.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { debounceTime, fromEvent, Subscription } from 'rxjs';
import { CourseService } from 'src/app/services/course/course.service';
import { CourseCategoryVO } from 'src/app/model/categories.model';

@Component({
  selector: 'app-educator-filter',
  templateUrl: './educator-filter.component.html',
  styleUrls: ['./educator-filter.component.scss'],
})
export class EducatorFilterComponent implements OnInit, AfterViewInit, OnDestroy {
  searchRes: any[] = [];
  searchTeachersNames!: string;
  categoryName!: string;
  categoryId: number | undefined
  teachersList: TeachersList[] = [];
  config!: number;
  pageNumber: number = 0;
  size: number = 10;
  @ViewChild('teacherSearch') teacherSearch!: ElementRef;
  searchSubscription!: Subscription
  categoryList: CourseCategoryVO[] = [];

  constructor(
    private commonService: CommonService,
    private loader: LoaderService,
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.searchCourseCategory()
    this.filterTeacher()
  }

  ngAfterViewInit(): void {
    this.search()
    this.searchTeachersNames = this.activatedRoute.snapshot.queryParams['name']
    if (this.searchTeachersNames) {
      this.teacherSearch.nativeElement.value = this.searchTeachersNames
      this.filterTeacher()
    }
  }
  ngOnDestroy(): void {
    if (this.searchSubscription) this.searchSubscription.unsubscribe()
  }

  search() {
    this.searchSubscription = fromEvent(
      this.teacherSearch.nativeElement,
      'keyup'
    )
      .pipe(debounceTime(1000))
      .subscribe((data: any) => {
        this.searchTeachersNames = data.target.value;
        if (this.searchTeachersNames.length > 3) this.searchTeachers()
      });
  }

  nextPage($event: any) {
    this.pageNumber = $event;
    this.filterTeacher()
    window.scrollTo(0, 0)
  }

  searchTeachers() {
    this.loader
      .showLoader(
        this.commonService.searchTeacherName(this.searchTeachersNames)
      )
      .subscribe(
        (res) => {
          this.searchRes = res.data.results;
        },
        (error: HttpErrorResponse) => { }
      );
  }

  searchCourseCategory() {
    this.loader
      .showLoader(this.courseService.fetchFeatureCategoryList(false))
      .subscribe({
        next: (data: CourseCategoryVO[]) => {
          this.categoryList = data
          console.log(this.categoryList)
        },
        error: (error: HttpErrorResponse) => { }
      });
  }


  filter() {
    this.pageNumber = 0
    this.filterTeacher()
    window.scrollTo(0, 0)
  }

  filterTeacher() {
    this.loader
      .showLoader(
        this.commonService.filterTeacher(
          this.searchTeachersNames,
          this.categoryId,
          this.pageNumber,
          this.size
        )
      )
      .subscribe({
        next: (res: { teachers: TeachersList[], total_count: number }) => {
          this.teachersList = res.teachers;
          this.config = res.total_count
        },
        error: (error: HttpErrorResponse) => {
        }
      });
  }

  fetchCourseByCategory(event: any) {
    const category = this.categoryList.find((cl) => cl.categoryName === event.target.value)
    this.categoryId = category?.idCourseCategory
  }
}
