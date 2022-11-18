import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { Body } from 'src/app/model/assignment';
import { assignmentVO } from 'src/app/model/assignmentVO';
import { ClassVO } from 'src/app/model/classVO';
import {
  PastClass,
  LiveClass,
  MaterialFetch,
  FutureClass,
} from 'src/app/model/enroll-classes';
import { NotMappedClass } from 'src/app/model/fetchteacher.model';
import { ClassService } from 'src/app/services/Classes/class.service';
import { StudentService } from 'src/app/services/student/student.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-student-dashboard-info',
  templateUrl: './student-dashboard-info.component.html',
  styleUrls: ['./student-dashboard-info.component.scss'],
})
export class StudentDashboardInfoComponent implements OnInit {
  courseId!: number;
  batchId!: number;
  // pastClasses!: PastClass[];
  // liveClasses!: LiveClass[];
  // futureClasses!: FutureClass[];
  totalCount!:number;
  FutureTotalCount!:number;
  page: number = 0;
  size: number = 5;
  Livepage: number = 0;
  Livesize: number = 5;
  searchParam: string = '';
  subject = new Subject();
  result$!: Observable<any>;
  assignments!: assignmentVO[];
  liveClassesVO!: ClassVO[];
  futureClassesVO!: ClassVO[];
  recordedClassesVO!: ClassVO[];
  constructor(
    private route: ActivatedRoute,
    private classService: ClassService
  ) {}

  ngOnInit(): void {
    // this.courseId = +this.route.snapshot.queryParams?.['id'];
    this.batchId = +this.route.snapshot.queryParams?.['idbatch'];
  }

  
 
}
