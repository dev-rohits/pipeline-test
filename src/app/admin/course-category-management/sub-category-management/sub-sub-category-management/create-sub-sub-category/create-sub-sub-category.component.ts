import { Component, ElementRef, EventEmitter, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderService } from 'src/app/loader.service';
import { CourseCategoryVO } from 'src/app/model/categories.model';
import { CategoryService } from 'src/app/services/category/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-sub-sub-category',
  templateUrl: './create-sub-sub-category.component.html',
  styleUrls: ['./create-sub-sub-category.component.scss']
})
export class CreateSubSubCategoryComponent implements OnInit {

  form!: FormGroup;
  isSubmit: boolean = false;
  hasError: boolean = false;
  bsInlineValue = new Date();
  file!: File;
  progressValue: any;
  uploadSuccess = new EventEmitter<boolean>();
  @ViewChild('fileSelect')
  fileSelect!: ElementRef;
  courseCategoryVO!: CourseCategoryVO;

  constructor(
    private categoryService: CategoryService,
    private loader: LoaderService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateSubSubCategoryComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: string;
      isEdit: boolean;
      categoryName: string;
      categoryDescription: string;
      idCourseCategory: number;
      categoryImage: string;
      displayOrder: string;
      subCategoryId:number;
      subsubCategoryId:number;
      isPrivate:boolean;
      isFeatured:boolean;
    }
    
  ) {}

  ngOnInit(): void {
    console.log(this.data)
    if (this.data.isEdit) {
      this.initFormEdit();
    } else {
      this.initForm();
    }
  }
  initForm() {
    this.form = this.fb.group({
      categoryName: ['', Validators.required],
      categoryDescription: ['', Validators.required],
      displayOrder: ['', Validators.required],
    });
  }
  initFormEdit() {
    this.form = this.fb.group({
      categoryName: [this.data.categoryName, Validators.required],
      categoryDescription: [this.data.categoryDescription, Validators.required],
      displayOrder: [this.data.displayOrder, Validators.required],
    });
  }
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.form.invalid) {
      return;
    }
    if (!this.file && !this.data.categoryImage) {
      Swal.fire('Please Select image for uploading.', '', 'error');
      return;
    } else if (this.data.categoryImage && !this.file) {
      this.onEdit();
    } else {
      this.createCategory();
    }
  }

  onEdit() {
    this.courseCategoryVO = this.form.value;
    this.courseCategoryVO.subCategoryId=this.data.subCategoryId;
    this.courseCategoryVO.subsubCategoryId=this.data.subsubCategoryId;
    this.courseCategoryVO.categoryImage=this.data.categoryImage;
  
    this.loader
      .showLoader(
        this.categoryService.createSubSubCourseCategory(
          this.courseCategoryVO,
          this.file
        )
      )
      .subscribe(
        (res) => {
          Swal.fire({
            title: 'Course Category Created Successfully!',
            icon: 'success',
          });
          this.uploadSuccess.emit(true);
        },
        (error: any) => {
          Swal.fire({ icon: 'error', text: error.error.message });
        }
      );
  }

  createCategory() {
    this.courseCategoryVO = this.form.value;
    this.courseCategoryVO.subCategoryId=this.data.subCategoryId;
    this.courseCategoryVO.idCourseCategory =this.data.idCourseCategory;
    
    this.courseCategoryVO.categoryImage=this.data.categoryImage;
    this.loader
      .showLoader(
        this.categoryService.createSubSubCourseCategory(
          this.courseCategoryVO,
          this.file
        )
      )
      .subscribe(
        (res) => {
          Swal.fire({
            title: 'Course Category Created Successfully!',
            icon: 'success',
          });
          this.uploadSuccess.emit(true);
        },
        (error: any) => {
          Swal.fire({ icon: 'error', text: error.error.message });
        }
      );
  }

  close(){
    this.dialogRef.close();
  }

  onFileChange($event: any) {
    let file = $event.target.files[0];
    if (this.isFileImage(file)) {
      this.file = file;
    } else {
      this.fileSelect.nativeElement.value = '';
      Swal.fire('Please select image or change material type.', '', 'error');
      return;
    }
  }

  isFileImage(file: any) {
    const acceptedImageTypes = [
      'image/gif',
      'image/jpeg',
      'image/png',
      'image/svg+xml',
    ];
    return file && acceptedImageTypes.includes(file['type']);
  }

}
