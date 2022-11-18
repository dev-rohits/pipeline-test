import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTeacherComponent } from 'src/app/common/add-teacher/add-teacher.component';
import { AddUserComponent } from 'src/app/common/add-user/add-user.component';
import { LoaderService } from 'src/app/loader.service';
import { BatchVO } from 'src/app/model/BatchVO';
import { PricingPlanVO } from 'src/app/model/PricingPlanVO';
import { BatchService } from 'src/app/services/batch.service';
import { CourseWizardService } from 'src/app/services/course/course-wizard.service';
import Swal from 'sweetalert2';
import { CourseWizardComponent } from '../../course-wizard.component';

@Component({
  selector: 'app-add-edit-batches',
  templateUrl: './add-edit-batches.component.html',
  styleUrls: ['./add-edit-batches.component.scss'],
})
export class AddEditBatchesComponent implements OnInit {
  pricingPlans: PricingPlanVO[] = [];
  now: any;
  isSubmit: boolean = false;
  teachers: { id: number; name: string; image: string }[] = [];
  batchForm!: FormGroup;
  batchVO!: BatchVO;
  constructor(
    private courseWizard: CourseWizardService,
    private fb: FormBuilder,
    private batchService: BatchService,
    private loader: LoaderService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const datePipe = new DatePipe('en-Us');
    this.now = datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.pricingPlans = this.courseWizard.getPricingPlans;
    this.teachers = this.courseWizard.getTeachers;
    this.courseWizard.batchSubject$.subscribe((data: BatchVO | boolean) => {
      if (typeof data != 'boolean') {
        this.batchVO = data;
      }
      this.createAndUpdateForm();
    });
  }

  get getControls() {
    return this.batchForm.controls;
  }

  createAndUpdateForm() {
    this.batchForm = this.fb.group({
      idBatch: [this.batchVO?.idBatch],
      idPricingPlan: [this.batchVO?.idPricingPlan, Validators.required],
      batchName: [this.batchVO?.batchName, Validators.required],
      maxNoOfEnrollments: [
        this.batchVO?.maxNoOfEnrollments,
        Validators.required,
      ],
      startDate: [
        this.batchVO?.startDate.toString().split('T')[0],
        Validators.required,
      ],
      endDate: [
        this.batchVO?.endDate.toString().split('T')[0],
        Validators.required,
      ],
      teacherIds: [this.batchVO?.teacherIds],
      batchCode: [this.batchVO?.batchCode],
    });
  }

  cancel() {
    this.courseWizard.batchSubject$.next(true);
  }

  submit() {
    this.isSubmit = true;
    if (this.batchForm.invalid) {
      return;
    }
    this.batchVO = this.batchForm.value;
    this.loader
      .showLoader(this.batchService.createBatch(this.batchVO))
      .subscribe({
        next: (data: BatchVO) => {
          this.batchVO.idBatch
            ? this.courseWizard.editBatch(data)
            : this.courseWizard.addBatch(data);
          this.courseWizard.batchSubject$.next(true);
          
        },
        error: (error: HttpErrorResponse) => {
          Swal.fire('Error', 'Somthing Went Wrong', 'error');
        },
      });
  }

  openAddTeacherDialog() {
    let dialogRef = this.dialog.open(AddTeacherComponent, {
      width: '700px',
      maxHeight: '800px',
      disableClose: true,
      data: {
        fromBatch: true,
      },
    });
    dialogRef.componentInstance.uploadSuccess.subscribe(
      (res: { id: number; name: string; image: string }) => {
        if (res) {
          this.teachers.unshift(res);
          dialogRef.close();
        }
      }
    );
  }
}
