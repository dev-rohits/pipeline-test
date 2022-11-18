import { Component, OnInit } from '@angular/core';
import { MobileCourseVO } from 'src/app/model/MobileCourseVO';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-student-enrollment',
  templateUrl: './student-enrollment.component.html',
  styleUrls: ['./student-enrollment.component.scss'],
})
export class StudentEnrollmentComponent implements OnInit {
  studentCourses: MobileCourseVO[] = [];
  id!: number;
  instituteId: any;

  constructor(private studentservices: StudentService) {}

  ngOnInit(): void {
    this.studentservices.getCouresOfStudent().subscribe((data: any) => {
      this.studentCourses = data.body;
    });
    this.instituteId=JSON.parse(localStorage.getItem('auth') as string).selectedInstitute;
    this.studentservices.fetchStudentDashboardDetails(this.instituteId).subscribe((data: any) => {
    });
  }
}
