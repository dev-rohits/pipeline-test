import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderService } from 'src/app/loader.service';
import { SubscriptionPricingPlans, SubscriptionPricingPlansFeatures } from 'src/app/model/subscriptionplan.model';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-plan',
  templateUrl: './add-edit-plan.component.html',
  styleUrls: ['./add-edit-plan.component.scss']
})
export class AddEditPlanComponent implements OnInit {
  createPlanForm!: FormGroup;
  features!: FormArray;
  submitted:boolean=false
  minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  // isSubmit: boolean = false;
  constructor(
    private planService: SubscriptionService,
    private fb: FormBuilder,
    private loader: LoaderService,
    public dialogRef: MatDialogRef<AddEditPlanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { row: SubscriptionPricingPlans ; isEdit: boolean },
    private datePipe:DatePipe,
  ) {}

  ngOnInit(): void {
    if (this.data.isEdit == true) {
   
      this.createPlanForm = this.fb.group({
        id: [this.data.row?.id],
        pricingPlanName: [this.data.row?.pricingPlanName, Validators.required],
        frequency: [this.data.row?.frequency, Validators.required],
        noOfDays:[this.data.row.noOfDays,Validators.required],
        price: [this.data.row?.price, Validators.required],
        type:[this.data.row?.type,Validators.required],
        discountPrice: [this.data.row?.discountPrice],
        allowedStudents: [this.data.row?.allowedStudents, Validators.required],
        allowedStorage: [this.data.row?.allowedStorage, Validators.required],
        allowedTeachers: [this.data.row?.allowedTeachers, Validators.required],
        allowedConcurrentClasses: [
          this.data.row?.allowedConcurrentClasses,
          Validators.required,
        ],
        displayOrder: [this.data.row?.displayOrder, Validators.required],
        // active: [this.data.row?.active, Validators.required],
        startDate:[this.data.row.startDate.toString().split('T')[0],Validators.required],
        endDate:[this.data.row?.endDate.toString().split('T')[0],Validators.required],
        features:new FormArray(this.data.row.features.map(
          (value:SubscriptionPricingPlansFeatures)=>{
            return this.updateItem(value)
          }
        ))
      });
    } else {
      this.createPlanForm = this.fb.group({
        pricingPlanName: ['', Validators.required],
        frequency: ['', Validators.required],
        price: ['', Validators.required],
        type:['',Validators.required],
        noOfDays:['',Validators.required],
        discountPrice: [''],
        startDate:['',Validators.required],
        endDate:['',Validators.required],
        allowedStudents: ['', Validators.required],
        allowedStorage: ['', Validators.required],
        allowedTeachers: ['', Validators.required],
        allowedConcurrentClasses: ['', Validators.required],
        displayOrder: ['', Validators.required],
    features:new FormArray([this.createItem()])
      });
    }
  }
  createItem(): FormGroup {
    return this.fb.group({
      featureDescription: ['',Validators.required],
      displayOrder:['',Validators.required]
    });
  }

  updateFeatures(module:SubscriptionPricingPlansFeatures[]):void{
    this.features = this.createPlanForm.get('features') as FormArray;
    module.forEach(
      (value:SubscriptionPricingPlansFeatures)=>{
        this.features.push(this.updateItem(value));
      }
    )
  }

  updateItem(module:SubscriptionPricingPlansFeatures): FormGroup {
    return this.fb.group({
      featureDescription: [module.featureDescription,Validators.required],
      displayOrder:[module.displayOrder,Validators.required],
      id:[module.id]
    });
  }

  addFeatures(): void {
    this.features = this.createPlanForm.get('features') as FormArray;
    this.features.push(this.createItem());

  }
  get form() {
    return this.createPlanForm.controls;
  }
  getControls(){
    return (this.createPlanForm.get('features') as FormArray).controls;
  }

  close() {
    this.dialogRef.close();
  }

  delete(index:number){
   (this.createPlanForm.get('features') as FormArray).removeAt(index)
  }

  createPlan() {
    const date = new Date();
    const CurrentDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    if(this.createPlanForm.invalid){
    this.submitted=true;}else{
    if (this.createPlanForm.status == 'VALID') {
      if(this.data.isEdit !== true){
    if(this.createPlanForm.value.startDate >= this.createPlanForm.value.endDate){
      Swal.fire('Error', 'Start Date must be less then End Date', 'error');
    }else{
   
      this.loader.showLoader(
      this.planService.addPlan(this.createPlanForm.value)).subscribe(
        (data) => {
          this.close();
       
          Swal.fire('Success', 'Plan created successfully', 'success');
        },
        (error: any) => {
          this.loader.loadingOff();
          Swal.fire('Error', error.error.message, 'error');
        }
      );
    }}else{
   
      this.loader.showLoader(
      this.planService.addPlan(this.createPlanForm.value)).subscribe(
        (data) => {
          this.close();
          Swal.fire('Success', 'Plan created successfully', 'success');
        },
        (error: any) => {
          Swal.fire('Error', error.error.message, 'error');
        }
      );
    }}}
  }
}

