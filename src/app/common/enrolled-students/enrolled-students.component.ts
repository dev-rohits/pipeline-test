import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, fromEvent, Subscription } from 'rxjs';
import { LoaderService } from 'src/app/loader.service';
import { CourseService } from 'src/app/services/course/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enrolled-students',
  templateUrl: './enrolled-students.component.html',
  styleUrls: ['./enrolled-students.component.scss']
})
export class EnrolledStudentsComponent implements OnInit, AfterViewInit {
  batches: { id: number, batchName: string }[] = []
  page: number = 0;
  size: number = 5;
  batchId!: number | undefined;
  search!: string;
  searchSubscription!: Subscription
  totalStudents!: number;
  studentList: any[] = []
  @ViewChild('searchStudents') searchStudents!: ElementRef;
  constructor(private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private loader: LoaderService
  ) { }
  ngAfterViewInit(): void {
    this.searchStudentsByName()
  }

  searchStudentsByName() {
    this.searchSubscription = fromEvent(
      this.searchStudents.nativeElement,
      'keyup'
    )
      .pipe(debounceTime(1000))
      .subscribe((data: any) => {
        this.search = data.target.value
        this.fetchEnrolledStudent()
      });
  }

  ngOnInit(): void {
    this.loader.showLoader(
      this.courseService.fetchCourseBatches(this.activatedRoute.snapshot.queryParams['id'])).subscribe({
        next: (data: { id: number, batchName: string }[]) => {
          this.batches = data
          console.log(this.batches)
        },
        error: (error: HttpErrorResponse) => {
          Swal.fire("Error", "Error While Fetching Batches", 'error')
        }
      })
    this.fetchEnrolledStudent()
  }

  fetchEnrolledStudent() {
    this.loader.showLoader(
      this.courseService.fetchEnrolledStudents(+this.activatedRoute.snapshot.queryParams['id'], this.page, this.size, this.batchId, this.search)).subscribe(
        {
          next: (data: { total_count: number, enrolledStudents: any }) => {
            this.totalStudents = data.total_count
            this.studentList = data.enrolledStudents
            console.log(this.studentList)
          },
          error: (error: HttpErrorResponse) => {
            console.log(error)
          }
        }
      )
  }

  onBatchChange(event: any) {
    this.batchId = +event.target.value
    if (isNaN(this.batchId))
      this.batchId = undefined
    this.page = 0
    this.fetchEnrolledStudent()
  }

  pageChange(event: any) {
    this.page = event
    this.fetchEnrolledStudent()
  }
  changeSize(event: any) {
    this.size = event
  }

  unEnrollStudent(id: number) {
    Swal.fire({
      title: 'Do you want to Un-Enroll this Student ?',
      showDenyButton: true,
      confirmButtonText: `Un-Enroll`,
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.unenroll(id).subscribe({
          next: (res: any) => {
            Swal.fire('Good job!', res.message, 'success');
            this.page = 0
            this.fetchEnrolledStudent()
          },
          error: (err) => {
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
