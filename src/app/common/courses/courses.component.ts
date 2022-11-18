import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, fromEvent, Subscription } from 'rxjs';
import { InstituteRoles } from 'src/app/enums/InstituteRoles';
import { LoaderService } from 'src/app/loader.service';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, AfterViewInit, OnDestroy {
  change: number = 0;
  courses: any[] = [];
  page: number = 0;
  size: number = 5;
  totalCourses!: number;
  @ViewChild('displayOrder') displayOrder!: ElementRef;
  @ViewChild('courseSearch') courseSearch!: ElementRef;
  searchSubscription!: Subscription;
  constructor(
    private courseService: CourseService,
    private router: Router,
    private loader: LoaderService
  ) {}
  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
  ngAfterViewInit(): void {
    this.search();
  }

  ngOnInit(): void {
    this.refresh(this.page);
  }

  search() {
    this.searchSubscription = fromEvent(
      this.courseSearch.nativeElement,
      'keyup'
    )
      .pipe(debounceTime(1000))
      .subscribe((data: any) => {
        this.loader
          .showLoader(
            this.courseService.fetchCourses(0, this.size, data.target.value)
          )
          .subscribe((data: any) => {
            this.courses = data.courses;
            this.totalCourses = data.total_courses;
          });
      });
  }

  refresh(page: number) {
    this.loader
      .showLoader(this.courseService.fetchCourses(page, this.size))
      .subscribe((data: any) => {
        this.courses = data.courses;
        this.totalCourses = data.total_courses;
      });
  }

  editCourse(id: number) {
    if (
      AuthService.getRoleType == InstituteRoles.Admin ||
      AuthService.getRoleType == InstituteRoles.InstituteAdmin
    ) {
      this.router.navigate(['/admin/create-course'], {
        queryParams: { id: id },
      });
    } else if (AuthService.getRoleType == InstituteRoles.Teacher) {
      this.router.navigate(['/teacher/create-course'], {
        queryParams: { id: id },
      });
    }
  }

  addCourse() {
    if (
      AuthService.getRoleType == InstituteRoles.Admin ||
      AuthService.getRoleType == InstituteRoles.InstituteAdmin
    ) {
      this.router.navigate(['/admin/create-course']);
    } else if (AuthService.getRoleType == InstituteRoles.Teacher) {
      this.router.navigate(['/teacher/create-course']);
    }
  }

  pageChange(event: any) {
    this.refresh(event);
  }
  changeSize(event: any) {
    this.size = event;
    this.refresh(0);
  }

  changeDisplayOrder(displayOrder: string, elementId: number) {
    this.loader
      .showLoader(
        this.courseService.updateDisplayOrder(displayOrder, elementId)
      )
      .subscribe({
        next: (data: any) => {
          // this.displayOrder.nativeElement.focusout();
        },
        error: (error: HttpErrorResponse) => {
          Swal.fire('Error', 'Internal Server Error', 'error');
        },
      });
  }

  featured(element: any, event: any) {
    this.courseService.updateFeaturedFlag(element.id).subscribe({
      next: (data: any) => {},
      error: (error: HttpErrorResponse) => {
        element.featured = !event.target.checked;
        Swal.fire('Error', 'Somthing Went Wrong', 'error');
      },
    });
  }

  enrolledStudents(id:number){
    this.router.navigate(['/teacher/enrolled-students'],{queryParams:{id:id}})
  }

  deleteCourse(id:number){
    Swal.fire({
      title: 'Do you want to delete this course ?',
      showDenyButton: true,
      confirmButtonText: `Delete`,
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.loader.showLoader(
        this.courseService.deleteCourse(id)).subscribe({
          next: (res: any) => {
            Swal.fire('Good job!','Course Deleted Successfully !', 'success')
            this.refresh(0)
          },
          error: (err:HttpErrorResponse) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          }
        });
      } else if (result.isDenied) {

      }
    });
  }
}
