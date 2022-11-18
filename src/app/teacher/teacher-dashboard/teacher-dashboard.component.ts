import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/loader.service';
import { MobileCourseVO } from 'src/app/model/MobileCourseVO';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss'],
})
export class TeacherDashboardComponent implements OnInit {
  teacherCourses: MobileCourseVO[] = [];
  id!: number;

  constructor(private teacherService: TeacherService,private loader: LoaderService) {}

  ngOnInit(): void {
    this.loader
    .showLoader(
    this.teacherService.getCouresOfTeacher()).subscribe((data: any) => {
      this.teacherCourses = data.body;
    });
  }
}
