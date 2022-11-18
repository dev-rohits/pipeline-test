import { Component, OnInit } from '@angular/core';
import { InstituteService } from 'src/app/services/institute/institute.service';

@Component({
  selector: 'app-teacher-course-list',
  templateUrl: './teacher-course-list.component.html',
  styleUrls: ['./teacher-course-list.component.scss']
})
export class TeacherCourseListComponent implements OnInit {
res: any;
  constructor(private instituteService: InstituteService) { }

  ngOnInit(): void {
  this.instituteService.fetchCourseReqList()
    .subscribe((res:any) => {
      this.res = res;
    });
  }

}
