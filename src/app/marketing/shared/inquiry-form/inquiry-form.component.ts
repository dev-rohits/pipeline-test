import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MobileCourseVO } from 'src/app/model/MobileCourseVO';
import { CommonService } from 'src/app/services/common/common.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-inquiry-form',
  templateUrl: './inquiry-form.component.html',
  styleUrls: ['./inquiry-form.component.scss'],
})
export class InquiryFormComponent implements OnInit,OnChanges {
  @Input('type') type!:string;
  @Input('courses') courses:MobileCourseVO[]=[]
  form!: UntypedFormGroup;
  isSubmit: boolean = false;
  constructor(
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private fb: UntypedFormBuilder
  ) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      mobileNumber: ['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      message: ['', Validators.required],
      id: [
        this.type=='course' ?
        this.activatedRoute.snapshot.queryParams['id'] : ''
        , Validators.required],
    });
  }
  ngOnInit(): void {}
  get controls() {
    return this.form.controls;
  }
  submit() {
    if (this.form.invalid) {
      this.isSubmit = true;
      return;
    }
    this.commonService
      .saveInquiry({ ...this.form.value, type: this.type })
      .subscribe((data: any) => {
        this.form.reset();
        this.isSubmit=false
      });
  }
}
