import { Location } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ɵɵqueryRefresh,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LoaderService } from 'src/app/loader.service';
import { MappingType } from 'src/app/model/MappingType';
import { AuthService } from 'src/app/services/auth.service';
import { InstituteService } from 'src/app/services/institute/institute.service';
import Swal from 'sweetalert2';
import { ImageCropDialogComponent } from '../image-crop-dialog/image-crop-dialog.component';
import { MappingPageComponent } from '../mapping-page/mapping-page.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;
  isSubmit: boolean = false;
  userFormVO: UserFormVO = new UserFormVO();
  disableField: boolean = false;
  userId: string = '';
  imageSrc!: string;
  file!: File;
  roles: string[] = [];
  result$!: Observable<any>;
  imageName!: string;
  imageFormat!: string;

  @ViewChild('fileSelect') fileSelect!: ElementRef;
  cropedFile!: any;
  image!: File;
  isImageCroped: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private instituteService: InstituteService,
    private loader: LoaderService,
    private dialog: MatDialog,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getRoles();
    this.refresh();
  }
  refresh() {
    this.userId = this.route.snapshot.queryParams['id'];
    if (this.userId) {
      this.loader
        .showLoader(this.authService.getUserProfile(this.userId))
        .subscribe(
          (res: any) => {
            this.userFormVO.name = res.name;
            this.userFormVO.email = res.email;
            this.userFormVO.mobileNumber = res.mobileNumber;
            this.userFormVO.role = res.role;
            this.userFormVO.gender = res.gender;
            this.imageSrc = res.userImagePath;
            this.disableField = true;
            if (this.userFormVO.role.includes('Student')) {
              this.userForm.get('role')?.disable();
            }
            this.createForm();
          },
          (err: any) => {
            Swal.fire(
              'Something went wrong!',
              'Error while fetching user details',
              'error'
            );
          }
        );
    }
  }
  createForm() {
    this.userForm = this.fb.group({
      name: [this.userFormVO?.name, Validators.required],
      email: [this.userFormVO?.email, [Validators.required, Validators.email]],
      mobileNumber: [
        this.userFormVO?.mobileNumber,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      gender: [this.userFormVO?.gender, Validators.required],
      role: [this.userFormVO?.role, Validators.required],
    });
  }

  getRoles() {
    this.instituteService
      .fetchInstituteRoles(AuthService.getInstituteId)
      .subscribe(
        (res: any) => {
          this.roles = res;
        },
        (err: any) => {
          Swal.fire(
            'Something went wrong!',
            'Error while fetching roles',
            'error'
          );
        }
      );
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.userForm.invalid) {
      return;
    }

    this.userFormVO = this.userForm.value;
    if (this.isImageCroped == true) {
      this.convertBase64ToFile();
    }
    this.userFormVO.instituteId = AuthService.getInstituteId;
    this.loader
      .showLoader(this.authService.addUser(this.userFormVO, this.file))
      .subscribe(
        (res: any) => {
          if (
            this.userFormVO.role == 'Student' ||
            this.userFormVO.role == 'Teacher'
          ) {
            Swal.fire({
              title: 'User Created Successfully!',
              icon: 'success',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Map To Batch',
            }).then((result) => {
              if (result.isConfirmed) {
                this.dialog.open(MappingPageComponent, {
                  data: {
                    id: res?.teacherId ? res?.teacherId : res?.userId,
                    mappingType: res?.teacherId
                      ? MappingType.TEACHER
                      : MappingType.STUDENT,
                  },
                  width: '100%',
                  height: '99%',
                });
              } else {
                this._location.back();
              }
              this.userFormVO = new UserFormVO();
            });
          } else {
            Swal.fire('User Created Successfully!', '', 'success').then(() => {
              this.router.navigateByUrl('/admin/users');
            });
          }
        },
        (err: any) => {
          Swal.fire(err.error.message, '', 'error');
        }
      );
  }

  update() {
    this.isSubmit = true;
    if (this.userForm.invalid) {
      return;
    }
    this.userFormVO = this.userForm.value;
    this.userFormVO.id = this.userId;
    if (this.isImageCroped == true) {
      this.convertBase64ToFile();
    }
    this.userFormVO.instituteId = AuthService.getInstituteId;
    this.loader
      .showLoader(this.authService.editUser(this.userFormVO, this.file))
      .subscribe(
        (res: any) => {
          if (
            this.userFormVO.role == 'Student' ||
            this.userFormVO.role == 'Teacher'
          ) {
            Swal.fire({
              title: 'User Updated Successfully!',
              icon: 'success',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Map To Batch',
            }).then((result) => {
              if (result.isConfirmed) {
                this.dialog.open(MappingPageComponent, {
                  data: {
                    id: res?.teacherId ? res?.teacherId : res?.userId,
                    mappingType: res?.teacherId
                      ? MappingType.TEACHER
                      : MappingType.STUDENT,
                  },
                  width: '100%',
                  height: '99%',
                });
              } else {
                this.router.navigateByUrl('/admin/users');
              }
            });
          } else {
            this.router.navigateByUrl('/admin/users');
          }
        },
        (err: any) => {
          if (err.status == 403) {
            Swal.fire(
              'Error while updating user',
              'Remove mapping & try again',
              'error'
            );
          } else {
            Swal.fire(
              'Something went wrong!',
              'Error while updating user',
              'error'
            );
          }
        }
      );
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (this.isFileImage(file)) {
        this.imageName = file.name;
        this.imageFormat = file.type;
        this.openDialog(file);
      }
    } else {
      this.fileSelect.nativeElement.value = '';
      return;
    }
  }

  isFileImage(file: any) {
    const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
    return file && acceptedImageTypes.includes(file['type']);
  }

  get controls() {
    return this.userForm.controls;
  }

  onlyNumeric(event: any) {
    const keyCode = event.keyCode;
    if (
      (keyCode >= 48 && keyCode <= 57) ||
      keyCode === 8 ||
      keyCode === 46 ||
      (keyCode >= 37 && keyCode <= 40) ||
      (keyCode >= 96 && keyCode <= 105)
    )
      return true;
    return false;
  }

  goBack() {
    this._location.back();
  }

  openDialog(imageFile: any) {
    let dialogRef = this.dialog.open(ImageCropDialogComponent, {
      data: {
        imageFile: imageFile,
      },
    });
    dialogRef.componentInstance.cropedImageEvent.subscribe((image: string) => {
      this.imageSrc = image;
      this.isImageCroped = true;
    });
    dialogRef.afterClosed().subscribe((result: any) => {});
  }

  convertBase64ToFile() {
    const arr = this.imageSrc.split(',');
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    this.file = new File([u8arr], this.imageName, { type: this.imageFormat });
  }
}

export class UserFormVO {
  id!: string;
  name!: string;
  email!: string;
  mobileNumber!: string;
  gender!: string;
  role!: string;
  instituteId!: string;
  teacherId!: string;
  disabled!: boolean;
  registrationDate!: Date;
  registrationUser!: number;
  registrationMode!: string;
  privateTeacher!: boolean;
  displayOrder!: number;
}
