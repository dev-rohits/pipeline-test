import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import {
  assignmentVO,
  CompletedAssignmentList,
} from 'src/app/model/assignmentVO';
import { AssignmentService } from 'src/app/services/assignment/assignment.service';
import { StudentService } from 'src/app/services/student/student.service';
import Swal from 'sweetalert2';
import { SubmitAssignmentComponent } from './submit-assignment/submit-assignment.component';

@Component({
  selector: 'app-student-all-assignments',
  templateUrl: './student-all-assignments.component.html',
  styleUrls: ['./student-all-assignments.component.scss'],
})
export class StudentAllAssignmentsComponent implements OnInit {
  // @Input() assignments!: assignmentVO[];
  page: number = 0;
  size: number = 5;
  submittedPage: number = 0;
  submittedSize: number = 5;
  batchId!: number;
  totalSubmitCount!: number;
  totalPendingCount!: number;
  assignments!: assignmentVO[];
  btnText: string = 'View';
  submittedType: String = 'submitted';
  pendingType: String = 'pending';
  disableRequestButton: boolean = false;
  pendingAssignments!: assignmentVO[];

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private dialog: MatDialog,
    private assignemntService: AssignmentService
  ) {}

  ngOnInit(): void {
    this.batchId = +this.route.snapshot.queryParams?.['idbatch'];
    this.fetchSubmittedAssignments(this.page);
    this.fetchPendingAssignments(this.page);
  }
  fetchSubmittedAssignments(page: number) {
    this.studentService
      .fetchAssignmentsToStudent(
        this.batchId,
        this.size,
        page,
        this.submittedType
      )
      .subscribe((res: any) => {
        this.assignments = res?.body.assignments;
        this.totalSubmitCount = res?.body.total_count;
      });
  }

  fetchPendingAssignments(page: number) {
    this.studentService
      .fetchAssignmentsToStudent(
        this.batchId,
        this.size,
        page,
        this.pendingType
      )
      .subscribe((res: any) => {
        this.pendingAssignments = res.body.assignments;
        this.totalPendingCount = res?.body.total_count;
      });
  }

  checkGrade(row: any) {
    Swal.fire('Your Grades are ', row.grade, 'success');
  }

  checkMarks(row: any) {
    Swal.fire('Your Marks are ', row.marks.toString(), 'success');
  }

  submitAssignment(element: assignmentVO) {
    this.btnText = 'Submit';
    let dialogRef = this.dialog.open(SubmitAssignmentComponent, {
      width: '90%',
      height: '90%',
      autoFocus: false,
      disableClose: true,
      data: {
        assignment: element,
        buttonText: this.btnText,
      },
    });
    dialogRef.componentInstance.refresh.subscribe((res: any) => {
      if (res) {
        this.fetchSubmittedAssignments(this.page);
        this.fetchPendingAssignments(this.page);

        dialogRef.close();
      }
    });
  }
  viewAssignment(element: assignmentVO) {
    element.assignmentSubmittedOrNot = 'Y';
    let dialogRef = this.dialog.open(SubmitAssignmentComponent, {
      width: '90%',
      height: '90%',
      autoFocus: false,
      disableClose: true,
      data: {
        assignment: element,
      },
    });
    dialogRef.componentInstance.refresh.subscribe((res: any) => {
      if (res) {
        dialogRef.close();
      }
    });
  }

  requestForReevaluation(assignmentId: any) {
    this.assignemntService
      .requestForReevaluation(assignmentId)
      .subscribe((res: any) => {
        Swal.fire('Your Request for Re-evaluation is successfully submitted');
        this.fetchSubmittedAssignments(this.page);
        this.fetchPendingAssignments(this.page);
        this.disableRequestButton = false;
      });
  }

  submitSizeChange(event: number) {
    this.submittedSize = event;
    this.fetchSubmittedAssignments(0);
  }
  submitPageChange(event: number) {
    this.submittedPage = event;
    this.fetchSubmittedAssignments(this.page);
  }

  pendingPageChange(event:number){
    this.size = event;
    this.fetchPendingAssignments(this.page);
  }

  pendingSizeChange(event:number){
    this.page = event;
    this.fetchPendingAssignments(0);
  }
}
