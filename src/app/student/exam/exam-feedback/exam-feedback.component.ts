import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExamComponent } from '../exam.component';

@Component({
  selector: 'app-exam-feedback',
  templateUrl: './exam-feedback.component.html',
  styleUrls: ['./exam-feedback.component.scss'],
})
export class ExamFeedbackComponent implements OnInit {
  feedback!: string;
  feedBackData = new EventEmitter<string>();
  constructor(public dialogRef: MatDialogRef<ExamComponent>) {}

  ngOnInit(): void {}

  submit() {
    this.feedBackData.emit(
      this.feedback == undefined ? 'No Feedback' : this.feedback
    );
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
