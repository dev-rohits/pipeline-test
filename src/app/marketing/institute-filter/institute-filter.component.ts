import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LoaderService } from 'src/app/loader.service';
import { CommonService } from 'src/app/services/common/common.service';
import { InstituteService } from 'src/app/services/institute/institute.service';
import { debounceTime, fromEvent, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CourseCategoryVO } from 'src/app/model/categories.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-institute-filter',
  templateUrl: './institute-filter.component.html',
  styleUrls: ['./institute-filter.component.scss'],
})
export class InstituteFilterComponent implements OnInit, AfterViewInit, OnDestroy {
  name!: string;
  categoryName!: string;
  categoryId!: number | undefined;
  resultName: string[] = []
  instituteList: any;
  config!: number;
  pageNumber: number = 0;
  size: number = 10;
  @ViewChild('instituteSearch') instituteSearch!: ElementRef
  categoryList: CourseCategoryVO[] = [];
  searchSubscription!: Subscription
  constructor(
    private commonService: CommonService,
    private loader: LoaderService,
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService
  ) { }
  ngAfterViewInit(): void {
    this.search()
    this.name = this.activatedRoute.snapshot.queryParams['name']
    if (this.name) {
      this.instituteSearch.nativeElement.value = this.name
      this.filterInstitute()
    }
  }
  ngOnDestroy(): void {
    if (this.searchSubscription) this.searchSubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.searchCourseCategory()
    this.filterInstitute()
  }

  search() {
    this.searchSubscription = fromEvent(
      this.instituteSearch.nativeElement,
      'keyup'
    )
      .pipe(debounceTime(1000))
      .subscribe((data: any) => {
        this.name = data.target.value;
        if (this.name.length > 3) this.searchInstitutename()
      });
  }

  nextPage($event: any) {
    this.pageNumber = $event;
    this.filterInstitute()
    window.scrollTo(0, 0)
  }

  searchInstitutename() {
    this.commonService
      .searchInstituteName(this.name)
      ?.subscribe((data: string[]) => {
        this.resultName = data
      });
  }
  fetchInstituteByCategory(event: any) {
    const category = this.categoryList.find((cl) => cl.categoryName === event.target.value)
    this.categoryId = category?.idCourseCategory
  }

  searchInstitutes() {
    this.pageNumber = 0
    this.filterInstitute()
    window.scrollTo(0, 0)
  }

  filterInstitute() {
    this.loader.showLoader(this.commonService
      .filterInstitute(this.name, this.categoryId, this.pageNumber, this.size))
      .subscribe((data: { institutions: any, total_count: number }) => {
        this.instituteList = data.institutions;
        this.config = data.total_count
      });
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
}
