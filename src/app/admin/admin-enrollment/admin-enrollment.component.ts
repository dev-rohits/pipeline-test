import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoaderService } from 'src/app/loader.service';
import { MobileCourseVO } from 'src/app/model/MobileCourseVO';
import { InstituteService } from 'src/app/services/institute/institute.service';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-admin-enrollment',
  templateUrl: './admin-enrollment.component.html',
  styleUrls: ['./admin-enrollment.component.scss']
})
export class AdminEnrollmentComponent implements OnInit { 
  courseList: MobileCourseVO[] = [];
  id!: number;
  instituteId: any;
  totalCount: any;
  searchRes: any[] = [];
  searchCoursesNames: string = '';
  categoryName: string = '';
  location: string = '';
  config!: number;
  pageNumber: number = 0;
  size:number=8 ;
  searchParam!: string;
  idParam: any;
  @Output() nextPage = new EventEmitter<number>();
  constructor(private instituteService: InstituteService,private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.instituteId=JSON.parse(localStorage.getItem('auth') as string).selectedInstitute;
    this.instituteService
          .fetchAdminCourseListWithPagination(this.instituteId,this.pageNumber,this.size)
          .subscribe((data: any) => {
            this.courseList = data.body.courses;
            this.config=data.total_count;
          });
      }

      // nextPage($event: any) {
      //   this.pageNumber = $event;
      //   // if (this.searchParam) {
      //   //   this.getCoursesWithPagination();
      //   // } else {
      //     this.loaderService
      //       .showLoader(
      //         this.instituteService.fetchInstituteCourseListWithPagination(this.instituteId,this.pageNumber,this.size)
      //       )
      //       .subscribe((data:any) => {
      //         this.courseList = data.body.courses;
      //       this.config=data.total_count;
      //       });
  
      // }
  

}
