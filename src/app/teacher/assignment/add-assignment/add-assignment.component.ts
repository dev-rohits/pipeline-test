import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry,
} from 'ngx-file-drop';
import { AssignmentService } from 'src/app/services/assignment/assignment.service';
import Swal from 'sweetalert2';
import { assignmentVO } from 'src/app/model/assignmentVO';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/loader.service';
import { MappingPageComponent } from 'src/app/common/mapping-page/mapping-page.component';
import { MappingType } from 'src/app/model/MappingType';
import { DatePipe, Location } from '@angular/common';
import * as moment from 'moment';
import { AssignmentDocumentPreviewComponent } from 'src/app/common/assignment-document-preview/assignment-document-preview.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.scss'],
})
export class AddAssignmentComponent implements OnInit {
  form!: FormGroup;
  now: any;
  maxmarksField: boolean = false;
  assignmentVO: assignmentVO = new assignmentVO();
  allowedFileType: string[] = ['image/jpeg', 'image/png', 'application/pdf'];
  refresh = new EventEmitter<boolean>();
  @ViewChild('selectFiles') selectFilesInput!: ElementRef;
  file: any;
  filesList: File[] = [];
  isSubmit: boolean = false;
  constructor(
    private fb: FormBuilder,
    private loader: LoaderService,
    private assignmentService: AssignmentService,
    private dialog: MatDialog,
    private _location: Location,
    private el: ElementRef,
    @Inject(MAT_DIALOG_DATA)
    public data: { body: assignmentVO; isEdit: boolean; instituteId: number }
  ) {}

  fileSelect!: ElementRef;
  ngOnInit(): void {
    const datePipe = new DatePipe('en-Us');
    this.now = datePipe.transform(new Date(), 'yyyy-MM-dd');
    if (this.data.isEdit) {
      this.form = this.fb.group({
        name: [this.data.body.name, [Validators.required]],
        description: [this.data.body.description, Validators.required],
        submissiontype: [this.data.body.submissiontype],
        gradeType: [this.data.body.gradeType],
        maxMarks: [this.data.body.maxMarks],
        submitDate: [
          moment(this.data.body.submissionFrom).utc().format('YYYY-MM-DD'),
          Validators.required,
        ],
        publishedDate: [
          moment(this.data.body.publishedDate).utc().format('YYYY-MM-DD'),
          Validators.required,
        ],
        uploadedFiles: [this.data.body.uploadedFiles, Validators.required],
      });
    } else
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        description: ['', Validators.required],
        submissiontype: [''],
        gradeType: [''],
        maxMarks: [''],
        submitDate: [''],
        publishedDate: [''],
        uploadedFiles: ['', Validators.required],
      });
  }
  get controls() {
    return this.form.controls;
  }

  onFileChange(event: any) {
    let invalidFilesName: string[] = [];
    for (var i = 0; i < event.target.files.length; i++) {
      if (!this.allowedFileType.includes(event.target.files[i].type)) {
        invalidFilesName.push(event.target.files[i].name);
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

  deleteFilesFromList(index: number) {
    this.filesList.splice(index, 1);
    if (this.filesList.length == 0) {
      this.selectFilesInput.nativeElement.value = '';
    }
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.form.invalid) {
      for (const key of Object.keys(this.form.controls)) {
        if (this.form.controls[key].invalid) {
          const invalidControl: HTMLElement =
            this.el.nativeElement.querySelector(
              '[formcontrolname="' + key + '"]'
            );
          invalidControl.focus();
          break;
        }
      }
      return;
    }
    // if (this.filesList.length == 0) {
    //   this.updateAssignment();
    //   return;
    // }
    if (
      this.form.value.gradeType == 'number' &&
      this.form.value.maxMarks == ''
    ) {
      Swal.fire('Please enter Maximum Marks');
    }
    this.createAssignment(this.filesList);
  }

  createAssignment(fileName: File[]) {
    (this.assignmentVO.id = this.data.isEdit
      ? this.data.body.id
      : (' ' as unknown as number)),
      (this.assignmentVO.name = this.form.value.name),
      (this.assignmentVO.description = this.form.value.description),
      (this.assignmentVO.gradeType = this.form.value.gradeType),
      (this.assignmentVO.submissiontype = this.form.value.submissiontype),
      (this.assignmentVO.maxMarks = this.form.value.maxMarks),
      (this.assignmentVO.instituteId = this.data.instituteId);
    this.assignmentVO.submissionFrom = this.form.value.submitDate;
    this.assignmentVO.publishedDate = this.form.value.publishedDate;
    if (this.data.isEdit)
      this.assignmentVO.uploadedFiles = this.data.body.uploadedFiles;
    this.loader
      .showLoader(
        this.assignmentService.createAssignment(this.assignmentVO, fileName)
      )
      .subscribe((res: any) => {
        Swal.fire({
          title: 'Assignment Created Successfully!',
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Map To Batch',
        }).then((result) => {
          if (result.isConfirmed) {
            this.dialog.open(MappingPageComponent, {
              data: {
                id: res,
                mappingType: MappingType.ASSIGNMENT,
              },
              width: '100%',
              height: '99%',
            });
          } else {
            // this._location.back();
          }
        });
        this.refresh.emit(true);
      }),
      (error: any) => {
        Swal.fire({ icon: 'error', text: error.error.message });
      };
  }

  updateAssignment() {
    (this.assignmentVO.id = this.data.isEdit
      ? this.data.body.id
      : (' ' as unknown as number)),
      (this.assignmentVO.name = this.form.value.name),
      (this.assignmentVO.description = this.form.value.description),
      (this.assignmentVO.gradeType = this.form.value.gradeType),
      (this.assignmentVO.submissiontype = this.form.value.submissiontype),
      (this.assignmentVO.uploadedFiles = this.data.body.uploadedFiles),
      (this.assignmentVO.maxMarks = this.form.value.maxMarks),
      (this.assignmentVO.instituteId = this.data.instituteId);
    this.assignmentVO.submissionFrom = this.form.value.submitDate;
    this.assignmentVO.publishedDate = this.form.value.publishedDate;
    this.loader
      .showLoader(
        this.assignmentService.createAssignment(this.assignmentVO, [])
      )
      .subscribe((res: any) => {
        Swal.fire({
          title: 'Assignment Updated Successfully!',
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Map To Batch',
        }).then((result) => {
          if (result.isConfirmed) {
            this.dialog.open(MappingPageComponent, {
              data: {
                id: res,
                mappingType: MappingType.ASSIGNMENT,
              },
              width: '100%',
              height: '99%',
            });
          } else {
            this._location.back();
          }
        });
        this.refresh.emit(true);
      }),
      (error: any) => {
        Swal.fire({ icon: 'error', text: error.error.message });
      };
  }

  selectInput(gradeType: string) {
    if (gradeType == 'number') {
      this.maxmarksField = true;
    } else this.maxmarksField = false;
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

  deleteUploadedFiles(i: number) {
    this.data.body.uploadedFiles.splice(i, 1);
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
}
