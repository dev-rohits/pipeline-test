import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/loader.service';
import { ApiResponse } from 'src/app/model/ApiResponse';
import { Auth } from 'src/app/model/Auth';
import { BatchVO } from 'src/app/model/BatchVO';
import { AuthService } from 'src/app/services/auth.service';
import { BuyCourseService } from 'src/app/services/Buycourse/buy-course.service';
import { CourseService } from 'src/app/services/course/course.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

declare var Razorpay: any;
@Component({
  selector: 'app-buy-course',
  templateUrl: './buy-course.component.html',
  styleUrls: ['./buy-course.component.scss'],
})
export class BuyCourseComponent implements OnInit {
  batches: BatchVO[] = [];
  batch!: BatchVO;
  paymentEnable: boolean = true;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      pricingPlanId: number;
    },
    private courseService: CourseService,
    private loader: LoaderService,
    public dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
    this.courseService
      .fetchBatches(this.data.pricingPlanId)
      .subscribe((res) => {
        this.batches = res;
      });
  }
  selectedBatch(element: BatchVO) {
    //this.paymentEnable = true;
    this.batch = element;
  }


  buyNow() {
    if (this.batch == undefined) {
      alert('please select batch');
    }
    this.loader.showLoader(
      this.courseService.offlineEnrollmentApplicationRequest(this.batch.idBatch, this.data.pricingPlanId)).subscribe({
        next: (data: ApiResponse) => {
          Swal.fire('Success', 'Your Application Request Has Been Sent Successfully !', 'success')
          this.dialogRef.close()
        },
        error: (error: HttpErrorResponse) => {
          Swal.fire('Error', error.error.body, 'error')
        }
      })
  }
}

export interface Order {
  amount: number;
  amount_paid: number;
  notes: any;
  created_at: number;
  amount_due: number;
  currency: string;
  receipt: string;
  id: string;
  entity: string;
  offer_id?: any;
  status: string;
  attempts: number;
}
