import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import Swal from 'sweetalert2';
import { InstructionsComponent } from './instructions/instructions.component';

@Component({
  selector: 'app-student-quiz',
  templateUrl: './student-quiz.component.html',
  styleUrls: ['./student-quiz.component.scss'],
})
export class StudentQuizComponent implements OnInit {
  page = 0;
  size = 5;
  totalCount: number = 0;
  buttonText = 'Start Quiz';
  displayedColumns: string[] = [
    'Name',
    'Marks',
    'StartTime',
    'EndTime',
    'examDuration',
    'Teacher Name',
    'Action',
  ];

  ELEMENT_DATA: any[] = [];
  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refresh(this.page);
  }

  refresh(page: number) {
    this.teacherService
      .fetchAllPendingQuizes(
        +this.route.snapshot.queryParams?.['idbatch'],
        page,
        this.size
      )
      .subscribe((res: any) => {
        this.ELEMENT_DATA = res.quizs.reverse();
        this.totalCount = res.totalCount;
      });
  }

  pageChange(event: any) {
    this.refresh(event);
  }
  changeSize(event: any) {
    this.size = event;
    this.refresh(0);
  }

  startQuizOrGetResult(
    quiz: any,
    startDateTime: any,
    endDateTime: any,
    studentSubmittedQuizs: any[]
  ) {
    if (AuthService.getUserRoleName != 'Student') {
      Swal.fire('Info', 'You don`t have permissions to start quiz');
      return;
    }
    var startTime = new Date(startDateTime).getTime();
    var endTime = new Date(endDateTime).getTime();
    var currentTime = new Date().getTime();
    if (
      currentTime >= startTime &&
      currentTime <= endTime &&
      !this.checkResult(studentSubmittedQuizs)
    ) {
      let dialogref = this.matDialog.open(InstructionsComponent, {
        data: {
          entry: true,
          params: {
            id: quiz.id,
            hour: quiz.hour,
            minutes: quiz.minutes,
            totalMarks: quiz.marks,
            negitiveMarking: quiz.negtiveMarking,
            negtiveMarks: quiz.negtiveMarks,
          },
        },
      });
      dialogref.componentInstance.uploadSuccess.subscribe((res: boolean) => {
        if (res) {
          this.router.navigate(['/student/exam', quiz.id]);
        }
      });
    }
  }

  checkTime(
    startDateTime: any,
    endDateTime: any,
    studentSubmittedQuizs: any[]
  ) {
    var startTime = new Date(startDateTime).getTime();
    var endTime = new Date(endDateTime).getTime();
    var currentTime = new Date().getTime();
    if (currentTime <= startTime && studentSubmittedQuizs.length == 0) {
      this.buttonText = 'Coming Soon';
      return true;
    }
    if (
      currentTime >= startTime &&
      currentTime <= endTime &&
      !this.checkResult(studentSubmittedQuizs)
    ) {
      this.buttonText = 'Start Quiz';
      return false;
    }
    if (currentTime <= endTime && this.checkResult(studentSubmittedQuizs)) {
      this.buttonText = 'Test Submitted';
      return true;
    }
    if (currentTime >= endTime && this.checkResult(studentSubmittedQuizs)) {
      this.buttonText = 'Test Submitted';
      return true;
    }
    if (currentTime >= endTime && !this.checkResult(studentSubmittedQuizs)) {
      this.buttonText = 'Test Expired';
      return true;
    }
    return;
  }

  checkResult(studentSubmittedQuizs: any[]) {
    if (
      studentSubmittedQuizs.some(
        (studentSubmittedQuiz: any) =>
          studentSubmittedQuiz.userId == AuthService.getUserId &&
          studentSubmittedQuiz.submitted == true
      )
    ) {
      return true;
    } else {
      return false;
    }
  }
}
