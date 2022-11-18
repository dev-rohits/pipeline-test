import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from 'src/app/loader.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common/common.service';
import { InstituteService } from 'src/app/services/institute/institute.service';
import Swal from 'sweetalert2';
import { InstituteImageCropComponent } from '../institute-image-crop/institute-image-crop.component';

@Component({
  selector: 'app-add-edit-institute',
  templateUrl: './add-edit-institute.component.html',
  styleUrls: ['./add-edit-institute.component.scss'],
})
export class AddEditInstituteComponent implements OnInit {
  instituteForm!: FormGroup;
  isSubmit: boolean = false;
  imageSrc!: any;
  file!: File;
  disableField: boolean = false;
  instituteId!: number;
  @ViewChild('fileSelect') fileSelect!: ElementRef;
  countryList: string[] = [];
  stateList: string[] = [];
  instituteFormVO: InstituteFormVO = new InstituteFormVO();
  cropedFile!: string;
  imageName!: string;
  imageFormat!: string;
  isImageCroped: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loader: LoaderService,
    private instituteService: InstituteService,
    private dialog: MatDialog,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.commonService.fetchStatesAndCountries().subscribe((data) => {
      this.countryList = data.countries;
      this.stateList = data.states;
    });
    this.createInstituteForm();
    this.refresh();
  }

  refresh() {
    this.instituteId = +AuthService.getInstituteId;
    this.loader
      .showLoader(this.instituteService.getInstituteDetails(this.instituteId))
      .subscribe(
        (res: InstituteFormVO) => {
          this.instituteFormVO.instituteName = res.instituteName;
          this.instituteFormVO.mobileNumber = res.mobileNumber;
          this.instituteFormVO.address = res.address;
          this.instituteFormVO.aboutUs = res.aboutUs;
          this.instituteFormVO.country = res.country;
          this.instituteFormVO.email = res.email;
          this.instituteFormVO.ownerName = res.ownerName;
          this.instituteFormVO.state = res.state;
          this.imageSrc = res.instituteImagePath;
          this.instituteFormVO.latitude = res.latitude;
          this.instituteFormVO.longitude = res.longitude;
          this.createInstituteForm();
        },
        (err: any) => {
          Swal.fire(
            'Something went wrong!',
            'Error while fetching institute details',
            'error'
          );
        }
      );
  }

  createInstituteForm() {
    this.instituteForm = this.fb.group({
      instituteName: [this.instituteFormVO?.instituteName, Validators.required],
      ownerName: [this.instituteFormVO?.ownerName],
      email: [
        this.instituteFormVO?.email,
        [Validators.required, Validators.email],
      ],
      address: [this.instituteFormVO?.address, Validators.required],
      mobileNumber: [
        this.instituteFormVO?.mobileNumber,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      aboutUs: [this.instituteFormVO?.aboutUs],
      country: [this.instituteFormVO?.country, Validators.required],
      state: [this.instituteFormVO?.state, Validators.required],
      latitude: [this.instituteFormVO?.latitude, Validators.required],
      longitude: [this.instituteFormVO?.longitude, Validators.required],
    });
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.instituteForm.invalid) {
      return;
    }
    this.instituteFormVO = this.instituteForm.value;

    if (this.isImageCroped == true) {
      this.convertBase64ToFile();
    }
    this.instituteFormVO.instituteId = this.instituteId;
    this.loader
      .showLoader(
        this.instituteService.saveInstituteDetails(
          this.instituteFormVO,
          this.file
        )
      )
      .subscribe(
        (res: any) => {
          Swal.fire('Details updated successfully!', '', 'success');
          this.refresh();
          if (this.file) {
            window.location.reload();
          }
        },
        (err: any) => {
          Swal.fire(
            'Something went wrong!',
            'Error while updating institute details',
            'error'
          );
        }
      );
  }

  getGeoLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.instituteForm.patchValue({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
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
    return this.instituteForm.controls;
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

  openDialog(imageFile: any) {
    let dialogRef = this.dialog.open(InstituteImageCropComponent, {
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
    // const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    this.file = new File([u8arr], this.imageName, { type: this.imageFormat });
  }
}

export class InstituteFormVO {
  instituteId!: number;
  instituteName!: string;
  address!: string;
  ownerName!: string;
  mobileNumber!: string;
  aboutUs!: string;
  email!: string;
  country!: string;
  state!: string;
  instituteImagePath!: string;
  latitude!: string;
  longitude!: string;
}
