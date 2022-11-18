import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AssignmentDocumentPreviewComponent } from 'src/app/common/assignment-document-preview/assignment-document-preview.component';
import { LoaderService } from 'src/app/loader.service';
import { AssignmentService } from 'src/app/services/assignment/assignment.service';
import { InstituteService } from 'src/app/services/institute/institute.service';
import Swal from 'sweetalert2';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-evaluate-assignment',
  templateUrl: './evaluate-assignment.component.html',
  styleUrls: ['./evaluate-assignment.component.scss']
})
export class EvaluateAssignmentComponent implements OnInit {

  file: any;
  AssignmentForm!: FormGroup;
  refresh = new EventEmitter<boolean>();


  title: string = '';
  htmlContent1 = '';
  maxMarks='';
  htmlContent2 = '';
  filesList:string[]=[];
  marks: string = '';
  grade:string ='';
  grades:string[]=['A+','A','B+','B+','C'];
  constructor(public dialogRef: MatDialogRef<EvaluateAssignmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { assignment: any },
    private assignmentService: AssignmentService,
    private fb: FormBuilder,
    private loader: LoaderService,
    private dialog:MatDialog) { }


    editorConfig1: AngularEditorConfig = {
      editable: false,
      spellcheck: true,
      height: '15rem',
      minHeight: '5rem',
      placeholder: 'Enter text here...',
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
      editable: false,
      spellcheck: true,
      height: '15rem',
      minHeight: '5rem',
      placeholder: 'Enter text here...',
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

    this.htmlContent2 = this.data.assignment.assignmentObj.description;
    this.htmlContent1 = this.data.assignment.description;
    this.title = this.data.assignment.assignmentObj.name;
    this.maxMarks =this.data.assignment.assignmentObj.maxMarks;
    if(this.data.assignment.marks !=null
      ){
        this.marks=this.data.assignment.marks
      }else{
        this.marks='';
      }
      this.filesList=this.data.assignment.fileUploaded;
      
  }

  documentPreview(file: File | string): void {
    let filePath = file
    if (typeof (file) != 'string') {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        filePath = reader.result as string
        this.preview(filePath, file.type == 'application/pdf' ? true : false)
      }
    }
    else {
      this.preview(file, file.includes('.pdf') ? true : false)
    }
  }

  preview(path: string, isPdf: boolean) {
    const dialogRef = this.dialog.open(AssignmentDocumentPreviewComponent, {
      position: { top: '20px' },
      maxHeight: '650px',
      width: '1000px',
      data: {
        imgUrl: path,
        isPdf: isPdf
      },
      hasBackdrop: true,
      panelClass: ['animate__animated', 'animate__backInDown'],
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }
 
  submit(id: any) {
    this.loader
      .showLoader(
        this.assignmentService.evaluateAssignment({
          assignmentId: id,
          idUser: this.data.assignment.idUser,
          grade: this.grade,
          marks: this.marks,
        })
      )
      .subscribe(
        (res: any) => {
          this.refresh.emit(true);
         
          Swal.fire(res.message);
        },
        (err: HttpErrorResponse) => {
         
          Swal.fire(err.error.message);
          return;
        }
      );
  }
}
