import { T } from '@angular/cdk/keycodes';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { debounceTime, fromEvent, Subscription } from 'rxjs';
import { LoaderService } from 'src/app/loader.service';
import { CourseCategoryVO } from 'src/app/model/categories.model';
import { CommonService } from 'src/app/services/common/common.service';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-course-selection',
  templateUrl: './course-selection.component.html',
  styleUrls: ['./course-selection.component.scss'],
})
export class CourseSelectionComponent implements OnInit, AfterViewInit {
  categories: CourseCategoryVO[] = [];
  searchText: string = '';
  categoryName!: string;
  searchCoursesNames!: string
  categoryList: CourseCategoryVO[] = [];
  searchRes: string[] = []
  categoryId: number | undefined
  activeCategoryId!: number
  searchSubscription!: Subscription
  @ViewChild('courseSearch') courseSearch!: ElementRef;
  constructor(private courseService: CourseService,
    private loaderService: LoaderService,
    private commonService: CommonService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  ngAfterViewInit(): void {
    this.search()
    this.activeCategoryId = this.activatedRoute.snapshot.queryParams['id']
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

  ngOnInit(): void {
    this.searchCourse()
    this.searchCourseCategory()
    this.courseService.fetchFeatureCategoryList(false).subscribe((res) => {
      this.categories = res;
      const selectedCategory = this.categories.splice(this.categories.findIndex((c) => c.idCourseCategory == this.activeCategoryId), 1)[0];
      this.categories.unshift(selectedCategory)
    });
  }

  @ViewChild('slickModal', { static: true })
  slickModal!: SlickCarouselComponent;
  scrHeight: any;
  scrWidth: any;
  lazyLoading: boolean = true;
  flipCard: boolean = false;

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    infinite: false,
    vertical: true,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  slickInit(_e: any) { }

  breakpoint(_e: any) { }

  afterChange(_e: any) {
    this.lazyLoading = false;
  }

  beforeChange(_e: any) { }
  next() {
    this.slickModal.slickNext();
  }
  prev() {
    this.slickModal.slickPrev();
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

  fetchCourseByCategory(event: any) {
    const category = this.categoryList.find((cl) => cl.categoryName === event.target.value)
    this.categoryId = category?.idCourseCategory
  }

  filter() {
    if (this.categoryId && this.searchCoursesNames) {
      this.router.navigate(["/marketing/categories/categoryCourses"], { queryParams: { categoryId: this.categoryId, name: this.searchCoursesNames } })
    }
    else if (this.categoryId) {
      this.router.navigate(["/marketing/categories/categoryCourses"], { queryParams: { categoryId: this.categoryId } })
    }
    else {
      this.router.navigate(["/marketing/categories/categoryCourses"], { queryParams: { name: this.searchCoursesNames } })
    }
  }
}
