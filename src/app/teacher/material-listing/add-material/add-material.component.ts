import {
  Component,
  OnInit,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/loader.service';
import { UploadMaterial } from 'src/app/model/UploadMaterial';
import { InstituteService } from 'src/app/services/institute/institute.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { MappingPageComponent } from 'src/app/common/mapping-page/mapping-page.component';
import { MappingType } from 'src/app/model/MappingType';
import { AuthService } from 'src/app/services/auth.service';
import { AssignmentDocumentPreviewComponent } from 'src/app/common/assignment-document-preview/assignment-document-preview.component';
import { ApiResponse } from 'src/app/model/ApiResponse';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss'],
})
export class AddMaterialComponent implements OnInit {
  materialId!: number;
  materialFilePath!: string;
  materialFileName: string = '';
  form!: FormGroup;
  materialModule: UploadMaterial = new UploadMaterial();
  isSubmit: boolean = false;
  hasError: boolean = false;
  file!: File;
  progressValue: any;
  @ViewChild('fileSelect') fileSelect!: ElementRef;
  allowedFileType: string[] = ['image/jpeg', 'image/png', 'application/pdf'];
  uploadSuccess = new EventEmitter<boolean>();
  new!: { value: string }[];

  constructor(
    private fb: FormBuilder,
    private instituteService: InstituteService,
    private loader: LoaderService,
    private _location: Location,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.materialId = this.activatedRoute.snapshot.queryParams['id'];
    this.refresh();
    if (this.materialId) {
      this.loader
        .showLoader(this.instituteService.fetchClassMaterial(this.materialId))
        .subscribe({
          next: (res) => {
            this.materialModule.materialTopic = res.materialTopic;
            this.materialModule.materialType = res.materialType;
            if (res.metaTags != null) {
              this.new = res.metaTags.map(function (e: any) {
                return { display: e, value: e };
              });
            }
            this.materialModule.materialFileName = res.materialFileName;
            this.materialFilePath = res.materialFilePath;
            this.materialFileName = res.materialFileName;
          },
          error: (err) => {
            Swal.fire('Error while fetching material details', '', 'error');
          },
        });
    }
  }

  refresh() {
    this.form = this.fb.group({
      materialType: ['', Validators.required],
      materialTopic: ['', Validators.required],
      metaTags: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.form.invalid) {
      return;
    }

    if (!this.materialFilePath) {
      if (!this.file) {
        this.hasError = true;
        return;
      }
    }

    this.materialModule.idTeacher = JSON.parse(
      localStorage.getItem('auth') || '{}'
    ).user_id;
    let selectedInstitute = Number.parseInt(
      JSON.parse(localStorage.getItem('auth') || '{}').selectedInstitute
    );
    this.materialModule.idInstitution = selectedInstitute;
    this.materialModule.metaTags = this.new.map(function (a) {
      return a['value'];
    });
    if (this.materialId) {
      this.materialModule.idClassMaterial = this.materialId;
    }


    let formData = new FormData();
    formData.append('classMaterialVO', JSON.stringify(this.materialModule));
    if (!this.materialFilePath) formData.append('materialImage', this.file);

    this.loader
      .showLoader(
        this.instituteService.uploadMaterial(
          formData,
          +AuthService.getInstituteId
        )
      )
      .subscribe(
        (res: ApiResponse) => {
          Swal.fire({
            title: res.message,
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Map To Batch',
          }).then((result) => {
            if (result.isConfirmed) {
              this.dialog.open(MappingPageComponent, {
                data: {
                  id: res.body,
                  mappingType: MappingType.MATERIAL,
                },
                width: '100%',
                height: '99%',
              });
            } else {
              this._location.back();
            }
          });
        },
        (error) => {
          if (error.status == 507) {
            Swal.fire('Your Bucket thresshold limit is exceeded', '', 'info');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.error.message,
            });
          }
        }
      );
  }

  documentPreview(file?: File): void {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const filePath = reader.result as string;
        this.preview(filePath, file.type == 'application/pdf' ? true : false);
      };
      return;
    }
    this.preview(this.materialFilePath, false);
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
    dialogRef.afterClosed().subscribe((result: any) => { });
  }

  onFileChange($event: any) {
    this.materialFileName = '';
    if (!this.materialModule.materialType) {
      this.fileSelect.nativeElement.value = '';
      alert('Please Select the Type of File You want to select.');
      return;
    }
    this.hasError = false;

    let file = $event.target.files[0];

    if (this.materialModule.materialType == 'excel') {
      if (this.isFileExcel(file)) {
        this.file = file;
      } else {
        this.fileSelect.nativeElement.value = '';
        alert('Please select excel file or change material type.');
        return;
      }
    }
    if (this.materialModule.materialType == 'video') {
      if (this.isFileVedio(file)) {
        this.file = file;
      } else {
        this.fileSelect.nativeElement.value = '';
        alert('Please select video or change material type.');
        return;
      }
    }
    if (this.materialModule.materialType == 'image') {
      if (this.isFileImage(file)) {
        if (!file.name.includes('.jfif')) {
          this.file = file;
        } else {
          this.fileSelect.nativeElement.value = '';
          Swal.fire('info', '.jfif file format is Not Allowed.', 'info');
          return;
        }
      } else {
        this.fileSelect.nativeElement.value = '';
        alert('Please select image or change material type.');
        return;
      }
    }
    if (this.materialModule.materialType == 'ms-word') {
      alert('inside ms-word if');
      if (this.isFileMsword(file)) {
        this.file = file;
      } else {
        this.fileSelect.nativeElement.value = '';
        alert('Please select Ms word file or change material type.');
        return;
      }
    }
    if (this.materialModule.materialType == 'pdf') {
      if (this.isFilePDF(file)) {
        this.file = file;
      } else {
        this.fileSelect.nativeElement.value = '';
        alert('Please select pdf file or change material type.');
        return;
      }
    }
    if (this.materialModule.materialType == 'ppt') {
      if (this.isFilePpt(file)) {
        this.file = file;
      } else {
        this.fileSelect.nativeElement.value = '';
        alert('Please select ppt file or change material type.');
        return;
      }
    }
  }

  isFileExcel(file: any) {
    const acceptedVideoTypes = ['text/csv', 'text/xls', 'text/xls'];
    return file && acceptedVideoTypes.includes(file['type']);
  }
  isFileVedio(file: any) {
    const acceptedVideoTypes = ['video/mp4', 'video/ogg'];
    return file && acceptedVideoTypes.includes(file['type']);
  }

  isFileImage(file: any) {
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    return file && acceptedImageTypes.includes(file['type']);
  }
  isFilePpt(file: any) {
    const acceptedVideoTypes = ['application/vnd.ms-powerpoint'];
    return file && acceptedVideoTypes.includes(file['type']);
  }

  isFilePDF(file: any) {
    const acceptedImageTypes = ['application/pdf'];
    return file && acceptedImageTypes.includes(file['type']);
  }

  isFileMsword(file: any) {
    if (
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'.includes(
        file.type
      )
    )
      return true;
    return false;
  }

  get controls() {
    return this.form.controls;
  }

  back() {
    this._location.back();
  }
}
