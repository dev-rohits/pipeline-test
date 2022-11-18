import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';

import { CourseDTO } from 'src/app/model/CourseVO';
import { AuthService } from 'src/app/services/auth.service';
import { InstituteService } from 'src/app/services/institute/institute.service';
import { environment } from 'src/environments/environment';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import Swal from 'sweetalert2';
import * as S3 from 'aws-sdk/clients/s3';
import { UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-course-request',
  templateUrl: './create-course-request.component.html',
  styleUrls: ['./create-course-request.component.scss'],
})
export class CreateCourseRequestComponent implements OnInit {
  // courseDTO: CourseDTO = new CourseDTO();
  // teacherEmail!: string;
  // fileUploadedList: string[] = [];
  // data: {
  //   id: any;
  //   course: CourseDTO;
  //   isEdit: boolean;
  // } = {
  //   id: null,
  //   course: this.courseDTO,
  //   isEdit: false,
  // };
  // isSubmit: any;
  // form!:any
  // radioButton = '';
  // loader: any;
  // get f() {
  //   return this.form.controls;
  // }
  // editorConfig: AngularEditorConfig = {
  //   editable: true,
  //   spellcheck: true,
  //   height: '15rem',
  //   minHeight: '5rem',
  //   placeholder: 'Enter Comment here...',
  //   translate: 'no',
  //   defaultParagraphSeparator: 'p',
  //   defaultFontName: 'Arial',
  //   toolbarHiddenButtons: [['bold']],
  //   customClasses: [
  //     {
  //       name: 'quote',
  //       class: 'quote',
  //     },
  //     {
  //       name: 'redText',
  //       class: 'redText',
  //     },
  //     {
  //       name: 'titleText',
  //       class: 'titleText',
  //       tag: 'h1',
  //     },
  //   ],
  // };
  // matChecked: string = 'mat-checked';
  // matUnchecked: string = 'mat-unchecked';
  // hasError: any;
  // file: any;
  // file1: any;
  // file2: any;
  // file3: any;
  // response1: boolean = false;
  // response2: boolean = false;
  // response3: boolean = false;
  // response4: boolean = false;
  // serverResponse: boolean = false;
  // progressValue: any;
  // fileName!: string;
  // @ViewChild('fileSelect')
  // fileSelect!: ElementRef;
  // @ViewChild('fileSelect1')
  // fileSelect1!: ElementRef;
  // @ViewChild('fileSelect2')
  // fileSelect2!: ElementRef;
  // @ViewChildren('fileSelect3')
  // fileSelect3!: ElementRef;
  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private instituteService: InstituteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}
  //   this.form = this.fb.group({
  //     courseName: ['', Validators.required],
  //     courseDescription: ['', Validators.required],
  //     isLiveClassEnabled: ['', Validators.required],
  //     courseTitle: ['', Validators.required],
  //     whatStudentWillLearn: ['', Validators.required],
  //     whoThisCourseIsFor: ['', Validators.required],
  //     timePeriodCourse: ['', Validators.required],
  //     level: ['', Validators.required],
  //     coursePrice: ['', Validators.required],
  //     subjectSyllabus: [''],
  //     displayOrder: ['', Validators.required],
  //     courseAsPrivate: ['', Validators.required],
  //     courseImage: [''],
  //     featured: [''],
  //     isCertificateIncluded: [''],
  //     whetherAssignmentTestIncluded: ['', Validators.required],
  //     whetherStudyMaterialIncluded: ['', Validators.required],
  //     moduleList: this.fb.array([this.createSectionItem()]),
  //     radioInput: [this.radioButton],
  //     sectionDesctionAttach: [''],
  //     coursePricingPlans: ['', Validators.required],
  //     teacherBio: ['', Validators.required],
  //   });

  //   this.teacherEmail = this.route.snapshot.queryParams['email'];
  //   this.authService.getTeacherId(this.teacherEmail).subscribe(
  //     (data: any) => {
  //     },
  //     (error: any) => {
  //     }
  //   );
  // }

  // createSectionItem() {
  //   return this.fb.group({
  //     dispalyOrder: [''],
  //     moduleTitle: [''],
  //     moduleDuration: [''],
  //     moduleDurationType: [''],
  //     courseModuleSectionList: this.fb.array([
  //       this.createCourseModuleSectionList(),
  //     ]),
  //   });
  // }

  // createCourseModuleSectionList() {
  //   return this.fb.group({
  //     dispalyOrder: [''],
  //     moduleSectionTitle: [''],
  //     moduleSectionDescription: [''],
  //     moduleSectionDuration: [''],
  //     moduleSectionDurationType: [''],
  //   });
  // }

  // getCourseModuleSectionList(form:any) {
  //   return form.controls.courseModuleSectionList.controls;
  // }

  // removeCourseModuleSectionList(i:any, j:any) {
  //   const control = <FormArray>(
  //     this.form.get('moduleList')['controls'][i].get('courseModuleSectionList')
  //   );
  //   control.removeAt(j);
  // }

  // addCourseModuleSectionList(j:any) {
  //   const control = <FormArray>(
  //     this.form.get('moduleList')['controls'][j].get('courseModuleSectionList')
  //   );
  //   control.push(this.createCourseModuleSectionList());
  // }

  // isFileImage(file:any) {
  //   const acceptedImageTypes = [
  //     'image/gif',
  //     'image/jpeg',
  //     'image/png',
  //     'image/svg+xml',
  //   ];
  //   return file && acceptedImageTypes.includes(file['type']);
  // }

  // onFileChange($event:any) {
  //   let file = $event.target.files[0];
  //   if (this.isFileImage(file)) {
  //     this.file = file;
  //   } else {
  //     this.fileSelect.nativeElement.value = '';
  //     Swal.fire('Please select image or change material type.', '', 'error');
  //     return;
  //   }
  // }
  // isFileVedio(file:any) {
  //   const acceptedVideoTypes = ['video/mp4', 'video/ogg'];
  //   return file && acceptedVideoTypes.includes(file['type']);
  // }

  // onFileChange1($event:any) {
  //   let file = $event.target.files[0];
  //   if (this.isFileVedio(file)) {
  //     this.file1 = file;
  //   } else {
  //     this.fileSelect1.nativeElement.value = '';
  //     Swal.fire('Please select video or change material type.', '', 'error');
  //     return;
  //   }
  // }
  // onFileChange2($event:any) {
  //   let file = $event.target.files[0];
  //   if (this.isFileVedio(file)) {
  //     this.file2 = file;
  //   } else {
  //     this.fileSelect2.nativeElement.value = '';
  //     Swal.fire('Please select video or change material type.', '', 'error');
  //     return;
  //   }
  // }
  // onFileChange3($event:any) {
  //   let file = $event.target.files[0];
  //   if (this.isFileImage(file)) {
  //     this.file3 = file;
  //   } else {
  //     this.fileSelect.nativeElement.value = '';
  //     Swal.fire('Please select image or change material type.', '', 'error');
  //     return;
  //   }
  // }
  // getSections(form:any) {
  //   return form.controls.moduleList.controls;
  // }

  // addSection() {
  //   const control = <FormArray>this.form.get('moduleList');
  //   control.push(this.createSectionItem());
  // }

  // removeSection(i:any) {
  //   const control = <FormArray>this.form.get('moduleList');
  //   control.removeAt(i);
  // }

  // onSubmit() {
  //   this.isSubmit = true;
  //   // alert(this.route.snapshot.paramMap.get('idInstitution'))
  //   if (this.form.invalid) {
  //     Swal.fire('Please Fill All Required Field.', '', 'info');
  //     // for (const key of Object.keys(this.form.controls)) {
  //     //   if (this.form.controls[key].invalid) {
  //     //     const invalidControl: HTMLElement =
  //     //       this.el.nativeElement.querySelector(
  //     //         '[formcontrolname="' + key + '"]'
  //     //       );
  //     //     invalidControl.focus();
  //     //     break;
  //     //   }
  //     // }
  //     return;
  //   }
  //   if (!this.file2) {
  //     Swal.fire('Please Select Demo Video For Uploading.', '', 'error');
  //     return;
  //   }
  //   if (!this.file3) {
  //     Swal.fire(
  //       'Please Select Teacher Profile Image For Uploading.',
  //       '',
  //       'error'
  //     );
  //     return;
  //   }
  //   // if (!this.file1) {
  //   //   Swal.fire('Please Select video for uploading.', '', 'error');
  //   //   return;
  //   // }

  //   //this.uploadFile(this.file, this.file1, this.file2,this.file3)
  //   this.uploadFilesOnS3(this.file, 'courseImage');
  //   this.uploadFilesOnS3(this.file1, 'courseVideo');
  //   this.uploadFilesOnS3(this.file2, 'demoVideo');
  //   this.uploadFilesOnS3(this.file3, 'teacherImage');
  //   // this.uploadFile2(this.file1, this.file1, this.file2)
  // }

  // uploadFilesOnS3(file:any, type:any) {
  //   if (file != undefined) {
  //     const contentType = file.type;
  //     const bucket = new S3({
  //       accessKeyId: 'AKIA6DYX4US5IMX2HIGU',
  //       secretAccessKey: 'GLBHSdj/Ei3nJrALAJvZoYP4sFcsBsinEw5uXOqu',
  //       region: 'ap-south-1',
  //     });
  //     let fileName1 = file.name.replace(/ /g, '_');
  //     const params = {
  //       Bucket: environment.bucketName,
  //       Key: fileName1,
  //       Body: file,
  //       ACL: 'bucket-owner-full-control',
  //       ContentType: contentType,
  //     };
  //     bucket
  //       .upload(params, (err: any, data: any) => {
  //         if (err) {
  //           alert(err);
  //           return false;
  //         } else {
  //           // this.fileuploading = false;
  //           if (type == 'courseImage') {
  //             this.courseDTO.courseImage = fileName1;
  //             this.fileUploadedList.push('courseImage');
  //             this.alertMessage();
  //           }
  //           if (type == 'courseVideo') {
  //             this.courseDTO.courseVideo = fileName1;
  //             this.fileUploadedList.push('courseVideo');
  //             this.alertMessage();
  //           } else if (type == 'demoVideo') {
  //             this.courseDTO.demoVideo = fileName1;
  //             this.fileUploadedList.push('demoVideo');
  //             this.alertMessage();
  //           } else {
  //             this.courseDTO.teacherImage = fileName1;
  //             this.fileUploadedList.push('teacherImage');
  //             this.alertMessage();
  //           }
  //           return true;
  //         }
  //       })
  //       .on('httpUploadProgress', (e: any) => {
  //         this.progressValue = Math.round(100.0 * (e.loaded / e.total));
  //         this.fileName = e.key;
  //       });
  //   } else {
  //     this.fileUploadedList.push('OptionalImage');
  //     this.alertMessage();
  //   }
  // }

  // requestCourse() {
  //   Swal.fire({
  //     title: 'Do you want to submit your course details to the institute?',
  //     showDenyButton: true,

  //     confirmButtonText: `Yes`,
  //     denyButtonText: `No`,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.onSubmit();
  //     } else if (result.isDenied) {
  //       Swal.fire('Details not submitted', '', 'info');
  //     }
  //   });
  // }
  // alertMessage() {
  //   if (this.fileUploadedList.length == 4) {
  //     this.courseDTO.idInstitution = localStorage.getItem('selectedInstitute');
  //     this.courseDTO.requestBy = this.authService.parseAuth().id;
  //     let upload$ = this.instituteService.addRequestedCourse(this.courseDTO);
  //     this.courseDTO.courseModuleList = this.form.value.moduleList;
  //     let courseModuleList = [...this.courseDTO.courseModuleList].filter(
  //       (elementAttach) => {
  //         if (
  //           elementAttach?.dispalyOrder != '' ||
  //           elementAttach?.moduleTitle != '' ||
  //           elementAttach?.moduleDuration ||
  //           elementAttach?.moduleDurationType
  //         ) {
  //           return true;
  //         } else {
  //           return false;
  //         }
  //       }
  //     );
  //     this.courseDTO.courseModuleList = courseModuleList;
  //     this.courseDTO.featured = this.form.value.featured ? true : false;

  //     this.loader.showLoader(upload$).subscribe(
  //       (res: any) => {
  //         Swal.fire(
  //           'Good job!',
  //           'Course request created successfully!',
  //           'success'
  //         );
  //         Swal.fire('Good Job!', 'Course  created successfully', 'success');
  //         this.router.navigate(['/institute/list']);
  //       },
  //       (err:any) => {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Oops...',
  //           text: 'Something went wrong!',
  //         });
  //       }
  //     );
  //   }
  // }
}
