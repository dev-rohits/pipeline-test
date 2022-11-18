import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { S3 } from 'aws-sdk';
import { AssignmentDocumentPreviewComponent } from 'src/app/common/assignment-document-preview/assignment-document-preview.component';
import { LoaderService } from 'src/app/loader.service';
import {
  assignmentVO,
  CompletedAssignmentList,
} from 'src/app/model/assignmentVO';
import { AssignmentService } from 'src/app/services/assignment/assignment.service';
import { InstituteService } from 'src/app/services/institute/institute.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-submit-assignment',
  templateUrl: './submit-assignment.component.html',
  styleUrls: ['./submit-assignment.component.scss'],
})
export class SubmitAssignmentComponent implements OnInit {
  file: any;
  disableButton!: boolean;
  refresh = new EventEmitter<boolean>();
  grade: any;
  disableToUpload: boolean = false;
  filesList: File[] = [];
  @ViewChild('fileInput') fileInput!: ElementRef;
  completedAssignmentListVO: CompletedAssignmentList =
    new CompletedAssignmentList();
  studentUploadedFiles: string[] = [];
  @ViewChild('selectFiles') selectFilesInput!: ElementRef;
  allowedFileType: string[] = ['image/jpeg', 'image/png', 'application/pdf'];
  constructor(
    public dialogRef: MatDialogRef<SubmitAssignmentComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { assignment: assignmentVO; buttonText: string },
    private assignmentService: AssignmentService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private loader: LoaderService
  ) {}

  discriptions: string = '';
  title: string = '';
  htmlContent1 = '';
  htmlContent2 = '';

  editorConfig1: AngularEditorConfig = {
    editable: false,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter your answer...',
    translate: 'no',
    width: 'auto',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };
  editorConfig2: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter your answer...',
    translate: 'no',
    width: 'auto',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  ngOnInit(): void {
    this.title = this.data.assignment.name;
    this.discriptions = this.data.assignment.description;
    if (this.data.assignment.assignmentSubmittedOrNot == 'Y') {
      this.htmlContent1 = this.data.assignment.answer;
      this.editorConfig2.editable = false;
      this.studentUploadedFiles = this.data.assignment.uploadedFiles;
    } else {
      this.htmlContent1 = '';
    }
    this.submitDisable();
  }

  submit() {
    (this.completedAssignmentListVO.assignmentId = this.data.assignment.id),
      (this.completedAssignmentListVO.description = this.htmlContent1),
      (this.completedAssignmentListVO.grade = this.grade);
    this.loader
      .showLoader(
        this.assignmentService.saveStudentAssignment(
          this.completedAssignmentListVO,
          this.filesList
        )
      )
      .subscribe(
        (res: any) => {
          Swal.fire('Assignment Submit', '', 'success');
          this.loader.loadingOff();
          this.refresh.emit(true);
        },
        (err: HttpErrorResponse) => {
          Swal.fire(err.error.message, '', 'error');
          this.loader.loadingOff();
        }
      );
  }

  removeSelectedFile(i: number) {
    this.filesList.splice(i, 1);
    if (this.filesList.length == 0) {
      this.fileInput.nativeElement.value = '';
    }
  }

  fileChanges(event: any) {
    let invalidFilesName: string[] = [];
    for (var i = 0; i < event.target.files.length; i++) {
      if (!this.allowedFileType.includes(event.target.files[i].type)) {
        if (!event.target.files[i].name.includes('.jfif')) {
          invalidFilesName.push(event.target.files[i].name);
        } else {
          event.target.files[i].nativeElement.value = '';
          Swal.fire('info', '.jfif file format is Not Allowed.', 'info');
          return;
        }
      } else {
        this.filesList.push(event.target.files[i]);
      }
    }
    if (invalidFilesName.length != 0) {
      Swal.fire(
        'info',
        'Format of these files ' +
          invalidFilesName.toString() +
          ' Are Not Allowed.',
        'info'
      );
    }
  }

  submitDisable() {
    if (this.data.buttonText === 'Submit') {
      this.disableButton = true;
    } else {
      this.disableButton = false;
    }
  }

  documentPreview(file: File | string): void {
    let filePath = file;
    if (typeof file != 'string') {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        filePath = reader.result as string;
        this.preview(filePath, file.type == 'application/pdf' ? true : false);
      };
    } else {
      this.preview(file, file.includes('.pdf') ? true : false);
    }
  }
  preview(path: string, isPdf: boolean) {
    const dialogRef = this.dialog.open(AssignmentDocumentPreviewComponent, {
      position: { top: '20px' },
      maxHeight: '650px',
      width: '1000px',
      data: {
        imgUrl: path,
        isPdf: isPdf,
      },
      hasBackdrop: true,
      panelClass: ['animate__animated', 'animate__backInDown'],
    });
    dialogRef.afterClosed().subscribe((result: any) => {});
  }

  deleteFilesFromList(index: number) {
    this.filesList.splice(index, 1);
    if (this.filesList.length == 0) {
      this.selectFilesInput.nativeElement.value = '';
    }
  }
}
