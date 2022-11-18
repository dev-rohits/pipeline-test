import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from 'src/app/loader.service';
import { Profile } from 'src/app/model/Profile';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common/common.service';
import Swal from 'sweetalert2';
import { ImageCropDialogComponent } from '../image-crop-dialog/image-crop-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  submitted: boolean = false;
  teaserVideoName: string = '';
  teaserVideo!: File;
  file!: File;
  imageSrc!: any;
  isVerified: boolean = false;
  containsEmail: boolean = false;
  isStudent: boolean = true;
  @ViewChild('fileSelect') fileSelect!: ElementRef;
  new: { value: string }[] = [];
  profile: Profile = new Profile();
  countryList: string[] = [];
  stateList: string[] = [];
  cropedFile!: string;
  isImageCroped: boolean = false;
  imageName!: string;
  imageFormat!: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loader: LoaderService,
    private dialog: MatDialog,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.commonService.fetchStatesAndCountries().subscribe((data:any) => {
      this.countryList = data.countries;
      this.stateList = data.states;
    });

    this.isStudent =
      JSON.parse(localStorage.getItem('auth') || '{}').role.authority ==
      'Student'
        ? true
        : false;

    this.createProfileForm();

    this.loader.showLoader(this.authService.getProfile()).subscribe(
      (res: Profile) => {
        this.profile = res;
        this.createProfileForm();
        this.imageSrc = res.userImagePath;
        this.teaserVideoName = res.teacherObj.teacherTeasorVideo;
        this.isVerified = res.verified;
        res?.email?.length > 0
          ? (this.containsEmail = true)
          : (this.containsEmail = false);
        this.new = this.profile.teacherObj?.metaTags.map(function (e) {
          return { display: e, value: e };
        });
      },
      (err: any) => {
        Swal.fire(
          'Something went wrong!',
          'Error while fetching profile',
          'error'
        );
      }
    );
  }

  createProfileForm() {
    this.profileForm = this.fb.group({
      name: [this.profile?.name, Validators.required],
      email: [
        this.profile?.email,
        [
          Validators.email,
          Validators.required,
          Validators.required,
          this.emailvalidate,
        ],
      ],
      dob: [
        this.profile?.dob?.toString().substring(0, 10),
        Validators.required,
      ],
      gender: [this.profile?.gender, Validators.required],
      address: [this.profile?.address, Validators.required],
      country: [this.profile?.country, Validators.required],
      state: [this.profile?.state, Validators.required],
      userImage: [this.profile?.userImage, Validators.required],
      teacherObj: this.fb.group({
        teacherName: [this.profile?.name, Validators.required],
        teacherImage: [this.profile?.userImage, Validators.required],
        facebookPage: [
          this.profile?.teacherObj?.facebookPage,
          Validators.required,
        ],
        instaPage: [this.profile?.teacherObj?.instaPage, Validators.required],
        youtubePage: [
          this.profile?.teacherObj?.youtubePage,
          Validators.required,
        ],
        teacherPage: [
          this.profile?.teacherObj?.teacherPage,
          Validators.required,
        ],
        linkedInPage: [
          this.profile?.teacherObj?.linkedInPage,
          Validators.required,
        ],
        teacherOneLineDescription: [
          this.profile?.teacherObj?.teacherOneLineDescription,
          Validators.required,
        ],
        metaTags: [this.profile?.teacherObj?.metaTags, Validators.required],
        metaDescription: [
          this.profile?.teacherObj?.metaDescription,
          Validators.required,
        ],
        experience: [this.profile?.teacherObj?.experience, Validators.required],
      }),
    });
  }

  submit() {
    this.submitted = true;
    if (
      this.profileForm.get('name')?.invalid ||
      this.profileForm.get('email')?.invalid ||
      this.profileForm.get('dob')?.invalid ||
      this.profileForm.get('gender')?.invalid ||
      this.profileForm.get('address')?.invalid ||
      this.profileForm.get('country')?.invalid ||
      this.profileForm.get('state')?.invalid
    ) {
      return;
    }
    this.loader.loadingOn();
    this.profile = this.profileForm.value;
    this.profile.email = this.profileForm.get('email')?.value;
    if (this.profileForm.get('teacherObj')?.valid) {
      this.profile.teacherObj.isPrivate = false;
    } else {
      this.profile.teacherObj.isPrivate = true;
    }
    this.profile.teacherObj.metaTags = this.new.map(function (a) {
      return a['value'];
    });
    this.profile.fromProfile = true;
    if (this.isImageCroped == true) {
      this.convertBase64ToFile();
    }
    this.authService
      .createUser(this.profile, this.file, this.teaserVideo)
      .subscribe(
        (res: any) => {
          this.loader.loadingOff();
          var auth = JSON.parse(localStorage.getItem('auth') || '{}');
          auth.first_name = this.profile.name;
          localStorage.setItem('auth', JSON.stringify(auth));
          this.authService.nameSubject.next(auth.first_name);
          if (this.file) {
            window.location.reload();
          }
          Swal.fire('Profile updated successfully!', '', 'success');
        },
        (err: any) => {
          this.loader.loadingOff();
          Swal.fire(
            'Something went wrong!',
            'Error while updating the profile',
            'error'
          );
        }
      );
  }

  get controls() {
    return this.profileForm.controls;
  }

  emailvalidate(control: AbstractControl): { [key: string]: any } | null {
    const regexp = new RegExp(
      '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$'
    );
    if (!regexp.test(control.value)) {
      return { emailvalidate: true };
    } else {
      return null;
    }
  }

  verifyEmail() {
    this.loader
      .showLoader(
        this.authService.verifyEmail(this.profileForm.get('email')?.value)
      )
      .subscribe(
        (res: any) => {
          Swal.fire('Email sent to your given email address', '', 'success');
        },
        (err: any) => {
          Swal.fire(
            'Something went wrong!',
            'Error while sending verification email',
            'error'
          );
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
  onTeasorVideoChange($event: any) {
    let file = $event.target.files[0];
    if (this.isFileVedio(file)) {
      this.teaserVideo = file;
    } else {
      this.fileSelect.nativeElement.value = '';
      Swal.fire(
        'Please select Teasor Video or change material type.',
        '',
        'error'
      );
      return;
    }
  }

  isFileVedio(file: any) {
    const acceptedVideoTypes = ['video/mp4', 'video/ogg'];
    return file && acceptedVideoTypes.includes(file['type']);
  }

  isFileImage(file: any) {
    const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
    return file && acceptedImageTypes.includes(file['type']);
  }
}
