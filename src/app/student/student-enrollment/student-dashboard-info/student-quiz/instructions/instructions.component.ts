import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss'],
})
export class InstructionsComponent implements OnInit {
  uploadSuccess = new EventEmitter<boolean>();
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      entry: boolean;
      params: {
        id: number;
        hour: number;
        minutes: number;
        totalMarks: number;
        negitiveMarking: number;
        negtiveMarks: number;
      };
    }
  ) {}

  ngOnInit(): void {}

  close() {
    this.uploadSuccess.emit(true);
    this.dialogRef.close();
  }
}
