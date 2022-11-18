import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/loader.service';
import { PricingPlanVO } from 'src/app/model/PricingPlanVO';
import { CourseWizardService } from 'src/app/services/course/course-wizard.service';
import { CourseService } from 'src/app/services/course/course.service';
import { PricingPlanService } from 'src/app/services/pricing-plan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-pricingplan',
  templateUrl: './add-edit-pricingplan.component.html',
  styleUrls: ['./add-edit-pricingplan.component.scss'],
})
export class AddEditPricingplanComponent implements OnInit, OnDestroy {
  pricingPlanVO!: PricingPlanVO;
  pricingPlanForm!: FormGroup;
  isSubmit: boolean = false;
  priceError: boolean = false;
  constructor(
    private courseWizard: CourseWizardService,
    private pricingPlanService: PricingPlanService,
    private fb: FormBuilder,
    private loader: LoaderService
  ) {}
  ngOnDestroy(): void {
    this.courseWizard.planSubject$.next(true);
  }

  ngOnInit(): void {
    this.createForm();
    this.courseWizard.planSubject$.subscribe(
      (data: PricingPlanVO | boolean) => {
        if (typeof data != 'boolean') {
          this.pricingPlanVO = data;
        }
        this.createForm();
      }
    );
  }

  createForm() {
    this.pricingPlanForm = this.fb.group({
      idPricingPlan: [this.pricingPlanVO?.idPricingPlan],
      idCourse: [
        this.pricingPlanVO?.idCourse
          ? this.pricingPlanVO?.idCourse
          : this.courseWizard.getCourse?.id,
        Validators.required,
      ],
      pricingPlanName: [
        this.pricingPlanVO?.pricingPlanName,
        Validators.required,
      ],
      price: [this.pricingPlanVO?.price, Validators.required],
      discountPrice: [this.pricingPlanVO?.discountPrice],
      discountOfferName: [this.pricingPlanVO?.discountOfferName],
      // planDescription: [this.pricingPlanVO?.planDescription, Validators.required],
      planLabel: [this.pricingPlanVO?.planLabel, Validators.required],
    });
  }

  onSubmit() {
    this.isSubmit = true;

    if (this.pricingPlanForm.invalid) {
      return;
    }
    this.pricingPlanVO = this.pricingPlanForm.value;
    if(this.pricingPlanVO.price < this.pricingPlanVO.discountPrice) {
      this.priceError = true;
      return;
    }
    this.loader
      .showLoader(this.pricingPlanService.savePricingPlan(this.pricingPlanVO))
      .subscribe({
        next: (data: PricingPlanVO) => {
          Swal.fire('Sucess', 'Plan Updated Sucessfully');
          this.pricingPlanVO.idPricingPlan
            ? this.courseWizard.updatePricingPlan(this.pricingPlanVO)
            : this.courseWizard.addPricingPlan(data);
          this.courseWizard.planSubject$.next(true);
        },
        error: (error: HttpErrorResponse) => {
          Swal.fire('Error', 'Somethind went wrong', 'error');
        },
      });
  }

  showPlanList() {
    this.courseWizard.planSubject$.next(true);
  }

  get getControls() {
    return this.pricingPlanForm.controls;
  }
}
