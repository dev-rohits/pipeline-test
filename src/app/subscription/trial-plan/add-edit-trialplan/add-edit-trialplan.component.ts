import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderService } from 'src/app/loader.service';
import { Triallist } from 'src/app/model/coupon.model';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-trialplan',
  templateUrl: './add-edit-trialplan.component.html',
  styleUrls: ['./add-edit-trialplan.component.scss']
})
export class AddEditTrialplanComponent implements OnInit {

  form!: FormGroup;
  trialList!: Triallist;
  constructor(
    public dialogRef: MatDialogRef<AddEditTrialplanComponent>,
    private fb: FormBuilder,
    private subscriptionplanservices: SubscriptionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    if (this.data.isEdit == true) {
      this.trialList = this.data.Body;
    
      this.form = this.fb.group({
        id: [this.trialList.id],
        createdDate: [this.trialList.createdDate],
        // active: [this.data.Body.active],
        allowedStorage: [this.trialList.allowedStorage],
        allowedConcurrentClasses : [this.trialList.allowedConcurrentClasses],
        name: [this.trialList.name],
        allowedTeachers: [this.trialList.allowedTeachers],
        allowedStudents: [this.trialList.allowedStudents],
      });
    } else {
      this.form = this.fb.group({
        createdDate: [null],
        allowedUser: [null],
        allowedStorage : [null],
        name: [null],
        allowedTeachers: [''],
        allowedConcurrentClasses: [''],
        allowedStudents: [''],
      });
    }

    if (this.data.isEdit == true) {
      this.trialList = this.data.body;
    }
  }
  get formcontrols() {
    return this.form.controls;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  submit() {
    this.loader.loadingOn();
    this.subscriptionplanservices.saveTrialplan(this.form.value).subscribe(
      (res) => {
        this.dialogRef.close();
        Swal.fire(res.message, '', 'success');
        this.loader.loadingOff();
      },
      (err: HttpErrorResponse) => {
        this.loader.loadingOff();
        Swal.fire(err.error.message, '', 'error');
      }
    );
  }
}

