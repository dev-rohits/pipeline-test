import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { MatChipInputEvent } from '@angular/material/chips';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { LoaderService } from 'src/app/loader.service';
import { Course } from 'src/app/model/Course';
import { CourseService } from 'src/app/services/course/course.service';
import Swal from 'sweetalert2';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CourseWizardService } from 'src/app/services/course/course-wizard.service';
import { AuthService } from 'src/app/services/auth.service';

import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddEditCourseComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  courseForm!: FormGroup;
  isEdit: boolean = false;
  value: string = '';
  isSubmit: boolean = false;
  course = new Course();
  image!: File;
  video!: File;
  imageName!: string;
  imageFormat!: string;
  addOnBlur = true;
  courseCategories: CategoryVO[] = [];
  subCategories: CourseCategoryMappingVO[] = [];
  subSubCategories: CourseCategoryMappingVO[] = [];
  paymentModes: string[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  @ViewChild('imageSelect') imageSelect!: ElementRef;
  @ViewChild('videoSelect') videoSelect!: ElementRef;
  @ViewChild('searchCategories') searchCategories!: ElementRef;
  @ViewChild('searchSubCategories') searchSubCategories!: ElementRef;
  @ViewChild('searchSubSubCategories') searchSubSubCategories!: ElementRef;
  @ViewChild('online') online!: ElementRef;
  @ViewChild('offline') offline!: ElementRef;
  courseSubscription$!: Subscription;
  metaTags: { name: string }[] = [];
  imageChangedEvent: any = '';
  croppedImage: any = '';
  isCroppedImage: boolean = false;
  isImageLoaded: boolean = false;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '105px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
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
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };
  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private loader: LoaderService,
    private courseWizard: CourseWizardService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngAfterViewInit(): void {
    this.fetchCategories();
    this.courseSubscription$ = this.courseWizard.courseSubject$.subscribe(
      (data: boolean) => {
        if (data) {
          this.updateCourse();
          return;
        }
        this.fetchMostDisplayOrder();
      }
    );
  }
  ngOnDestroy(): void {
    if (this.courseSubscription$) {
      this.courseSubscription$.unsubscribe();
    }
  }
  fileChangeEvent($event: any): void {
    this.isImageLoaded = false;
    let file: File = $event.target.files[0];
    if (this.isFileImage(file)) {
      this.courseForm.get('courseImage')?.setValue(file.name);
    } else {
      this.imageSelect.nativeElement.value = '';
      Swal.fire('Please select valid image format.', '', 'error');
      return;
    }
    this.isCroppedImage = true;
    this.imageChangedEvent = $event;
    this.imageName = file.name;
    this.imageFormat = file.type;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded(image?: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
    this.isImageLoaded = true;
  }
  loadImageFailed() {
    this.isImageLoaded = true;
    // show message
  }
  ngOnInit(): void {
    this.createAndUpdateForm();
  }

  paymodeSelected($event: any) {
    if (this.paymentModes.includes($event.target.value)) {
      const index: number = this.paymentModes.indexOf($event.target.value);
      if (index !== -1) {
        this.paymentModes.splice(index, 1);
      }
      this.updatePaymentMode();
      return;
    }
    this.paymentModes.push($event.target.value);
    this.updatePaymentMode();
  }

  updatePaymentMode() {
    this.courseForm
      .get('paymentType')
      ?.setValue(
        this.paymentModes.length == 2
          ? 'both'
          : this.paymentModes.length == 0
          ? ''
          : this.paymentModes[0]
      );
  }

  handlePaymentType() {
    if (this.course.paymentType == 'both') {
      this.online.nativeElement.checked = 'online';
      this.offline.nativeElement.checked = 'offline';
      this.paymentModes.concat(['online', 'offline']);
    } else if (this.course.paymentType == 'online') {
      this.online.nativeElement.checked = 'online';
      this.paymentModes.push('online');
    } else if (this.course.paymentType == 'offline') {
      this.offline.nativeElement.checked = 'offline';
      this.paymentModes.push('offline');
    }
  }

  updateCourse() {
    this.course = this.courseWizard.getCourse;
    this.metaTags = this.course.metaTags.map((tag: string) => {
      return { name: tag };
    });
    this.createAndUpdateForm();
    this.handlePaymentType();
    this.isCroppedImage = true;
  }

  createAndUpdateForm() {
    this.courseForm = this.fb.group({
      id: [this.course.id],
      courseName: [this.course.courseName, Validators.required],
      courseDescription: [this.course.courseDescription, Validators.required],
      timePeriodCourse: [this.course.timePeriodCourse, Validators.required],
      subjectSyllabus: [this.course.subjectSyllabus, Validators.required],
      courseImage: [this.course.courseImage, Validators.required],
      metaTags: [this.course.metaTags],
      demoVideo: [this.course.demoVideo, Validators.required],
      whetherAssignmentTestIncluded: [
        this.course.whetherAssignmentTestIncluded
          ? this.course.whetherAssignmentTestIncluded
          : 'false',
        Validators.required,
      ],
      whetherStudyMaterialIncluded: [
        this.course.whetherStudyMaterialIncluded
          ? this.course.whetherStudyMaterialIncluded
          : 'false',
        Validators.required,
      ],
      displayOrder: [this.course.displayOrder],
      isCertificateIncluded: [
        this.course.isCertificateIncluded
          ? this.course.isCertificateIncluded.toString()
          : 'false',
        Validators.required,
      ],
      paymentType: [
        this.course.paymentType ? this.course.paymentType : 'offline',
        Validators.required,
      ],
      isCourseDetailsCompleted: [this.course.isCourseDetailsCompleted],
      categoryIds: [this.course.categoryIds],
      subCategoryIds: [this.course.subCategoryIds],
      subSubCategoryIds: [
        this.course.subSubCategoryIds ? this.course.subSubCategoryIds : [],
      ],
      hasTest: [
        this.course.hasTest ? this.course.hasTest.toString() : 'false',
        Validators.required,
      ],
    });
    this.fetchSubCategories();
    this.fetchSubSubCategories();
    this.handlePaymentType();
  }

  fetchMostDisplayOrder() {
    this.courseService.fetchMostDisplayOrder().subscribe({
      next: (data: any) => {
        this.courseForm.get('displayOrder')?.setValue(data);
      },
      error: (error: HttpErrorResponse) => {},
    });
  }

  get getControls() {
    return this.courseForm.controls;
  }

  showWarning() {
    return Swal.fire({
      title: 'Warning',
      text: 'Warning message',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Do You Want To Continue?',
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      } else {
        return false;
      }
    });
  }

  fetchCategories() {
    this.loader.showLoader(this.courseService.fetchCategories()).subscribe({
      next: (data: CategoryVO[]) => {
        this.courseCategories = data;
      },
      error: (error: HttpErrorResponse) => {},
    });
  }

  async submitBasicInfo() {
    this.courseForm
      .get('subSubCategoryIds')
      ?.addValidators(Validators.required);
    this.courseForm.get('subSubCategoryIds')?.updateValueAndValidity();
    if (this.metaTags.length == 0) {
      this.courseForm.get('metaTags')?.addValidators(Validators.required);
      this.courseForm.get('metaTags')?.updateValueAndValidity();
    }
    this.isSubmit = true;
    if (
      this.courseForm.get('courseName')?.invalid ||
      this.courseForm.get('paymentType')?.invalid ||
      this.courseForm.get('courseImage')?.invalid
    ) {
      return;
    }
    const isError = Object.keys(this.courseForm.controls).find((key) => {
      if (this.courseForm.get(key)?.invalid == true) {
        return true;
      }
      return false;
    });
    this.course = this.courseForm.value;
    if (isError) {
      if (
        (await this.showWarning().catch((obj: boolean) => {
          return obj;
        })) == false
      ) {
        return;
      } else {
        this.course.isCourseDetailsCompleted = false;
      }
    } else {
      this.course.isCourseDetailsCompleted = true;
    }
    this.course.idInstitution = +AuthService.getInstituteId;
    if (this.imageName) this.convertBase64ToFile();
    this.loader
      .showLoader(
        this.courseService.createCourse(this.course, this.image, this.video)
      )
      .subscribe({
        next: (data: Course) => {
          this.courseWizard.setCourse(data);
          this.courseWizard.courseSubject$.next(true);
          if (this.course.id == undefined) {
            this.router.navigate([], {
              relativeTo: this.activatedRoute,
              queryParams: { id: data.id },
            });
          }
          this.courseWizard.next(2);
          this.courseWizard.enableEditMode(true);
        },
        error: (error: HttpErrorResponse) => {
          Swal.fire('error', 'Something went wrong', 'error');
        },
      });
  }

  // onImageChange($event: any) {
  //   let file = $event.target.files[0];
  //   if (this.isFileImage(file)) {
  //     this.image = file;
  //     this.courseForm.get('courseImage')?.setValue(this.image.name)
  //   } else {
  //     this.imageSelect.nativeElement.value = '';
  //     Swal.fire('Please select video or change material type.', '', 'error');
  //     return;
  //   }
  // }

  isFileVedio(file: File) {
    const acceptedVideoTypes = ['video/mp4', 'video/ogg'];
    return file && acceptedVideoTypes.includes(file['type']);
  }

  onVideoSelect($event: any) {
    let file = $event.target.files[0];
    if (this.isFileVedio(file)) {
      this.video = file;
      this.courseForm.get('demoVideo')?.setValue(this.video.name);
    } else {
      this.videoSelect.nativeElement.value = '';
      Swal.fire('Please select video or change material type.', '', 'error');
      return;
    }
  }

  isFileImage(file: File) {
    const acceptedImageTypes = ['image/jpeg', 'image/png'];
    return file && acceptedImageTypes.includes(file['type']);
  }

  add(event: any): void {
    const value = (event.value || '').trim();
    if (value) {
      this.metaTags.push({ name: value });
      this.courseForm.get('metaTags')?.value.push(value);
    }
    event.chipInput!.clear();
  }

  remove(tag: any): void {
    const index = this.metaTags.indexOf(tag);
    if (index >= 0) {
      this.metaTags.splice(index, 1);
      this.courseForm.get('metaTags')?.value.splice(index, 1);
    }
  }

  fetchSubCategories() {
    if (this.courseForm.get('categoryIds')?.value) {
      this.loader
        .showLoader(
          this.courseService.fetchSubCategories(
            this.courseForm.get('categoryIds')?.value
          )
        )
        .subscribe({
          next: (data: CourseCategoryMappingVO[]) => {
            this.subCategories = data;
          },
          error: (error: HttpErrorResponse) => {},
        });
    }
  }

  fetchSubSubCategories() {
    if (this.courseForm.get('subCategoryIds')?.value) {
      this.loader
        .showLoader(
          this.courseService.fetchSubSubCategories(
            this.courseForm.get('subCategoryIds')?.value
          )
        )
        .subscribe({
          next: (data: CourseCategoryMappingVO[]) => {
            this.subSubCategories = data;
          },
          error: (error: HttpErrorResponse) => {},
        });
    }
  }

  onSelectionChange(event: any) {
    if (event == false) {
      this.courseForm.get('categoryIds')?.value.length;
      this.fetchSubCategories();
      this.searchCategories.nativeElement.value = '';
    }
  }

  onSubCategorySelectionChange(event: any) {
    if (event == false) {
      this.fetchSubSubCategories();
      this.searchSubCategories.nativeElement.value = '';
    }
  }

  onSubSubCategorySelectionChange(event: any) {
    if (event == false) {
      this.searchSubSubCategories.nativeElement.value = '';
    }
  }

  convertBase64ToFile() {
    const arr = this.croppedImage.split(',');
    // const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    this.image = new File([u8arr], this.imageName, { type: this.imageFormat });
  }
}

export interface CourseCategoryMappingVO {
  name: string;
  categories: CategoryVO[];
}

export interface CategoryVO {
  name: string;
  id: string;
}
