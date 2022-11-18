import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { LoaderService } from 'src/app/loader.service';
import { ApiResponse } from 'src/app/model/ApiResponse';
import { MappingType } from 'src/app/model/MappingType';
import {
  BlueJeansMetaData,
  ScheduleClass,
} from 'src/app/model/schedule-class-list.model';
import { TeacherList } from 'src/app/model/teacher-info';
import { InstituteService } from 'src/app/services/institute/institute.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import Swal from 'sweetalert2';
import { ClassMappingPageComponent } from '../class-mapping-page/class-mapping-page.component';

@Component({
  selector: 'app-create-edit-class-configuration',
  templateUrl: './create-edit-class-configuration.component.html',
  styleUrls: ['./create-edit-class-configuration.component.scss'],
})
export class CreateEditClassConfigurationComponent implements OnInit {
  selected!: Date | null;
  time = { hour: 13, minute: 30 };
  selectedDate = new Date();
  form!: FormGroup;
  isTeacher: boolean = true;
  scheduleClass: ScheduleClass = new ScheduleClass();
  isSubmit: boolean = false;
  teacherList: any;
  blueJeansDetails!: BlueJeansMetaData;
  startTime = '00:01 pm';
  endTime = '00:01 pm';
  days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  date: Date = new Date();
  iswebinarShow: boolean = false;
  uploadSuccess = new EventEmitter<boolean>();
  classSchduleDays: number[] = [];
  new!: { value: string }[];
  constructor(
    private fb: FormBuilder,
    private instituteService: InstituteService,
    private router: Router,
    private teacherService: TeacherService,
    private el: ElementRef,
    private loader: LoaderService,
    private dialog: MatDialog,
    private location: Location,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      scheduleDTO: ScheduleClass;
      isEdit: boolean;
      from: boolean;
    }
  ) {}

  ngOnInit(): void {
    if (this.data.isEdit) {
      if (this.data.scheduleDTO.metaTags != null) {
        this.new = this.data.scheduleDTO.metaTags.map(function (e) {
          return { display: e, value: e };
        });
      }
      this.form = this.fb.group({
        idClassSchedule: [this.data.scheduleDTO.idClassSchedule],
        classConfigId: [this.data.scheduleDTO.classConfigId],
        startDate: [this.data.scheduleDTO.startDate],
        endDate: [this.data.scheduleDTO.endDate],
        idTeacher: [this.data.scheduleDTO.idTeacher],
        classTitle: [this.data.scheduleDTO.classTitle, Validators.required],
        classDescription: [
          this.data.scheduleDTO.classDescription,
          Validators.required,
        ],
        classSubject: [this.data.scheduleDTO.classSubject],
        videoToBeUploadedOrNot: [this.data.scheduleDTO.videoToBeUploadedOrNot],
        videoToBeRedirectType: [
          this.data.scheduleDTO.videoToBeRedirectToBlueJeans,
          Validators.required,
        ],
        start: [
          moment(this.data.scheduleDTO.startDate).utc().format('YYYY-MM-DD'),
          Validators.required,
        ],
        starttime: [
          moment(this.data.scheduleDTO.startDate).format('hh:mm'),
          Validators.required,
        ],
        endtime: [
          moment(this.data.scheduleDTO.endDate).format('hh:mm'),
          Validators.required,
        ],
        idCourse: [],
        idSubject: [],
        topicArray: [],
        classType: [this.data.scheduleDTO.classType, Validators.required],
        repeatMeeting: [false, Validators.required],
        meetingStartDate: ['', Validators.required],
        meetingEndDate: ['', Validators.required],
        endMeetingRadioInput: [false, Validators.required],
        noOfOccurence: ['', Validators.required],
        blueJeansMeetingId: [''],
        participantPasscode: [''],
        moderatorPasscode: [''],
        metaTags: ['', Validators.required],
      });
    } else {
      this.form = this.fb.group({
        startDate: [],
        endDate: [],
        idTeacher: [''],
        classTitle: ['', Validators.required],
        classDescription: ['', Validators.required],
        classSubject: [''],
        videoToBeUploadedOrNot: [''],
        videoToBeRedirectType: [''],
        start: ['', Validators.required],
        starttime: ['', Validators.required],
        endtime: ['', Validators.required],
        idCourse: [],
        idSubject: [],
        topicArray: [],
        classType: ['', Validators.required],
        repeatMeeting: [false, Validators.required],
        meetingStartDate: ['', Validators.required],
        meetingEndDate: ['', Validators.required],
        endMeetingRadioInput: [false, Validators.required],
        noOfOccurence: ['', Validators.required],
        blueJeansMeetingId: [''],
        participantPasscode: [''],
        moderatorPasscode: [''],
        metaTags: ['', Validators.required],
      });
    }

    if (this.data.isEdit) {
      this.scheduleClass = this.data.scheduleDTO;
      this.classSchduleDays = this.data.scheduleDTO.days;
    }

    this.fetchTeacherList();
  }

  get f() {
    return this.form.controls;
  }

  fetchTeacherList() {
    if (
      JSON.parse(localStorage.getItem('auth') as string).role.authority != 'Teacher'
    ) {
      this.isTeacher = false;
      this.teacherService
        .fetchTeacherList(
          '',
          JSON.parse(localStorage.getItem('auth') as string).selectedInstitute
        )
        .subscribe((res: any) => {
          this.teacherList = res.users as unknown as TeacherList;
        });
    } else {
      this.scheduleClass.idTeacher = JSON.parse(
        localStorage.getItem('auth') as string
      ).user_id;
      this.form
        .get('idTeacher')!
        .setValue(JSON.parse(localStorage.getItem('auth') as string).user_id);
    }
    this.startTime = moment(this.data.scheduleDTO.startDate).format('H:mm');
    this.endTime = moment(this.data.scheduleDTO.endDate).format('H:mm');
  }

  onSubmit() {
    this.isSubmit = true;
    if (!this.form.controls['repeatMeeting'].value) {
      this.form.get('meetingStartDate')!.clearValidators();
      this.form.get('meetingEndDate')!.clearValidators();
      this.form.get('endMeetingRadioInput')!.clearValidators();
      this.form.get('noOfOccurence')!.clearValidators();
      this.form.get('meetingStartDate')!.updateValueAndValidity();
      this.form.get('meetingEndDate')!.updateValueAndValidity();
      this.form.get('endMeetingRadioInput')!.updateValueAndValidity();
      this.form.get('noOfOccurence')!.updateValueAndValidity();
    } else {
      this.form.get('meetingStartDate')!.setValidators(Validators.required);
      this.form
        .get('meetingStartDate')
        ?.setValue(this.form.get('start')?.value);
      if (this.form.get('endMeetingRadioInput')!.value) {
        this.form.get('noOfOccurence')!.setValidators(Validators.required);
        this.form.get('noOfOccurence')!.updateValueAndValidity();
        this.form.get('meetingEndDate')!.clearValidators();
        this.form.get('meetingEndDate')!.updateValueAndValidity();
      } else {
        this.form.get('meetingEndDate')!.setValidators(Validators.required);
        this.form.get('meetingEndDate')!.updateValueAndValidity();
        this.form.get('noOfOccurence')!.clearValidators();
        this.form.get('noOfOccurence')!.updateValueAndValidity();
      }
      this.form.get('endMeetingRadioInput')!.setValidators(Validators.required);
      this.form.get('meetingStartDate')!.updateValueAndValidity();
      this.form.get('endMeetingRadioInput')!.updateValueAndValidity();
    }

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
    if (
      this.classSchduleDays.length == 0 &&
      this.form.get('repeatMeeting')!.value
    ) {
      Swal.fire('Info', 'Please Select Days', 'warning');
      return;
    }

    this.scheduleClass.startDate = moment(
      this.form.get('start')?.value + ' ' + this.form.get('starttime')?.value
    ).format('YYYY-MM-DD HH:mm:ss');
    this.scheduleClass.endDate = moment(
      this.form.get('start')?.value + ' ' + this.form.get('endtime')?.value
    ).format('YYYY-MM-DD HH:mm:ss');
    this.scheduleClass.startDateStr = this.scheduleClass.startDate;
    this.scheduleClass.endDateStr = this.scheduleClass.endDate;

    if (
      new Date(this.scheduleClass.startDateStr) >
      new Date(this.scheduleClass.endDateStr)
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Start Time must be less than End time',
      });
      return;
    }
    if (
      new Date(this.form.get('start')!.value).getDate() !=
        new Date(this.form.get('meetingStartDate')!.value).getDate() &&
      this.form.controls['repeatMeeting'].value
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Date and meeting start date must be same',
      });
      return;
    }

    this.loader
      .showLoader(
        this.instituteService.saveClassConfiguration({
          classTitle: this.form.get('classTitle')?.value,
          classSubject: this.form.get('classSubject')?.value,
          selectedDate: this.scheduleClass.selectedDate,
          classDescription: this.form.get('classDescription')?.value,
          startDateStr: this.scheduleClass.startDateStr,
          endDateStr: this.scheduleClass.endDateStr,
          classType: this.form.get('classType')?.value,
          idTeacher: this.form.get('idTeacher')?.value,
          isNew: this.scheduleClass.isNew,
          videoToBeUploadedOrNot: this.form.get('videoToBeUploadedOrNot')
            ?.value,
          videoToBeRedirectToBlueJeans: true,
          idInstitution: JSON.parse(localStorage.getItem('auth') as string)
            .selectedInstitute,
          meetingStartDate: this.form.controls['meetingStartDate'].value,
          meetingEndDate: this.form.controls['meetingEndDate'].value,
          days: this.classSchduleDays,
          repeatMeeting: this.form.controls['repeatMeeting'].value,
          blueJeansMetaData: this.blueJeansDetails,
          active: true,
          startDate: '',
          endDate: '',
          idClassSchedule: null,
          classConfigId: null,
          teacherName: '',
          metaTags: this.new.map(function (a) {
            return a['value'];
          }),
        })
      )
      .subscribe(
        (res: any) => {
          Swal.fire({
            title: 'Class Created Successfully!',
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Map To Batch',
          }).then((result) => {
            if (result.isConfirmed) {
              this.dialog.open(ClassMappingPageComponent, {
                data: {
                  id: res,
                  mappingType: MappingType.CLASS_CONFIGURATION,
                },
                width: '100%',
                height: '99%',
              });
              this.uploadSuccess.emit(true);
            } else {
              this.uploadSuccess.emit(true);
            }
          });
        },
        (err: HttpErrorResponse) => {
          this.uploadSuccess.emit(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err?.error?.message,
          });
        }
      );
  }

  onEdit() {
    this.isSubmit = true;
    if (!this.form.controls['repeatMeeting'].value) {
      this.form.get('meetingStartDate')!.clearValidators();
      this.form.get('meetingEndDate')!.clearValidators();
      this.form.get('endMeetingRadioInput')!.clearValidators();
      this.form.get('noOfOccurence')!.clearValidators();
      this.form.get('meetingStartDate')!.updateValueAndValidity();
      this.form.get('meetingEndDate')!.updateValueAndValidity();
      this.form.get('endMeetingRadioInput')!.updateValueAndValidity();
      this.form.get('noOfOccurence')!.updateValueAndValidity();
    }
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
    this.scheduleClass.startDate = moment(
      this.form.get('start')?.value + ' ' + this.form.get('starttime')?.value
    ).format('YYYY-MM-DD HH:mm:ss');
    this.scheduleClass.endDate = moment(
      this.form.get('start')?.value + ' ' + this.form.get('endtime')?.value
    ).format('YYYY-MM-DD HH:mm:ss');
    this.scheduleClass.startDateStr = this.scheduleClass.startDate;
    this.scheduleClass.endDateStr = this.scheduleClass.endDate;

    if (
      new Date(this.scheduleClass.startDateStr) >
      new Date(this.scheduleClass.endDateStr)
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Start Time must be less than End time',
      });
      return;
    }
    if (
      new Date(this.form.get('start')!.value).getDate() !=
        new Date(this.form.get('meetingStartDate')!.value).getDate() &&
      this.form.controls['repeatMeeting'].value
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Date and meeting start date must be same',
      });
      return;
    }
    this.loader
      .showLoader(
        this.instituteService.saveClassConfiguration({
          idClassSchedule: this.form.get('idClassSchedule')?.value,
          classConfigId: this.scheduleClass.classConfigId,
          classTitle: this.form.get('classTitle')?.value,
          classSubject: this.form.get('classSubject')?.value,
          selectedDate: this.scheduleClass.selectedDate,
          classDescription: this.form.get('classDescription')?.value,
          startDateStr: this.scheduleClass.startDateStr,
          endDateStr: this.scheduleClass.endDateStr,
          classType: this.form.get('classType')?.value,
          idTeacher: this.form.get('idTeacher')?.value,
          isNew: this.scheduleClass.isNew,
          videoToBeUploadedOrNot: this.form.get('videoToBeUploadedOrNot')
            ?.value,
          videoToBeRedirectToBlueJeans: true,
          idInstitution: JSON.parse(localStorage.getItem('auth') as string)
            .selectedInstitute,
          meetingStartDate: this.form.controls['meetingStartDate'].value,
          meetingEndDate: this.form.controls['meetingEndDate'].value,
          days: this.classSchduleDays,
          repeatMeeting: this.form.controls['repeatMeeting'].value,
          blueJeansMetaData: this.blueJeansDetails,
          active: true,
          startDate: '',
          endDate: '',
          teacherName: '',
          metaTags: this.new.map(function (a) {
            return a['value'];
          }),
        })
      )
      .subscribe(
        (res: any) => {
          Swal.fire('Good job!', res?.Message, 'success');

          this.uploadSuccess.emit(true);
        },
        (err: HttpErrorResponse) => {
          this.uploadSuccess.emit(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err?.error?.message,
          });
        }
      );
  }
  addDaysInList(day: any) {
    if (this.classSchduleDays.includes(day)) {
      this.classSchduleDays.forEach((value, index) => {
        if (value == day) this.classSchduleDays.splice(index, 1);
      });
      return;
    }
    this.classSchduleDays.push(day);
  }

  calculateDate(occ: any) {
    this.date = new Date();
    this.date = new Date(this.date.setDate(this.date.getDate() + occ * 7));
    this.form.controls['meetingEndDate'].setValue(this.date);
  }

  isWebinarEnableOrdesabled(isDemoClass: string) {
    if (isDemoClass == 'true') {
      this.iswebinarShow = false;
      this.form.get('isWebinar')!.clearValidators();
      this.form.get('isWebinar')!.updateValueAndValidity();
    } else {
      this.iswebinarShow = true;
      this.form.get('isWebinar')!.updateValueAndValidity();

      this.form.get('isWebinar')!.setValidators(Validators.required);
    }
  }
}
