import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderService } from 'src/app/loader.service';
import { addOnPlan, addOnPlanFeatures } from 'src/app/model/add-0nn.model';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import Swal from 'sweetalert2';
import { AddEditCouponComponent } from '../../coupon-code/add-edit-coupon/add-edit-coupon.component';

@Component({
  selector: 'app-add-edit-addonns',
  templateUrl: './add-edit-addonns.component.html',
  styleUrls: ['./add-edit-addonns.component.scss']
})
export class AddEditAddonnsComponent implements OnInit {

  addonForm!: FormGroup;
  features!: FormArray;
  submitted: boolean = false;
  isSuccess = new EventEmitter<boolean>();
  minDate = new Date;

  constructor(
    private planService: SubscriptionService,
    private fb: FormBuilder,
    private loader: LoaderService,
   
    private dialogRef: MatDialogRef<AddEditCouponComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { row: addOnPlan; isEdit: boolean }
  ) {}

  ngOnInit(): void {
    if (this.data.isEdit == true) {
      this.addonForm = this.fb.group({
        id: [this.data.row?.id],
        addOnPlanName: [this.data.row?.addOnPlanName, Validators.required],
        price: [this.data.row?.price, Validators.required],
        discountPrice: [this.data.row?.discountPrice],
        allowedStudents: [this.data.row?.allowedStudents],
        allowedStorage: [this.data.row?.allowedStorage],
        allowedTeachers: [this.data.row?.allowedTeachers],
        startDate: [this.data.row?.startDate.split('T')[0], Validators.required],
        endDate: [this.data.row?.endDate.split('T')[0], Validators.required],
        allowedConcurrentClasses: [this.data.row?.allowedConcurrentClasses],
        displayOrder: [this.data.row?.displayOrder, Validators.required],
        type:[this.data.row?.type,Validators.required],
        features: new FormArray(
          this.data.row.features.map((value: addOnPlanFeatures) => {
            return this.updateItem(value);
          })
        ),
      });
    } else {
      this.addonForm = this.fb.group({
        addOnPlanName: ['', Validators.required],
        price: ['', Validators.required],
        discountPrice: [''],
        allowedStudents: [''],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        allowedStorage: [''],
        allowedTeachers: [''],
        allowedConcurrentClasses: [''],
        displayOrder: ['', Validators.required], 
        type:['',Validators.required],
        features: new FormArray([this.createItem()]),
      });
    }
  }
  
  createItem(): FormGroup {
    return this.fb.group({
      featureDescription: ['', Validators.required],
      displayOrder: ['', Validators.required],
    });
  }

  updateFeatures(module: addOnPlanFeatures[]): void {
    this.features = this.addonForm.get('features') as FormArray;
    module.forEach((value: addOnPlanFeatures) => {
      this.features.push(this.updateItem(value));
    });
  }

  updateItem(module: addOnPlanFeatures): FormGroup {
    return this.fb.group({
      featureDescription: [module.featureDescription, Validators.required],
      displayOrder: [module.displayOrder, Validators.required],
      id: [module.id],
    });
  }

  addFeatures(): void {
    this.features = this.addonForm.get('features') as FormArray;
    this.features.push(this.createItem());
  }
  get form() {
    return this.addonForm.controls;
   
  }
  getControls(){
  return (this.addonForm.get('features') as FormArray).controls;
}
  close() {
    this.dialogRef.close();
  }

  delete(index: number) {
    (this.addonForm.get('features') as FormArray).removeAt(index);
  }

  createPlan() {
    const date = new Date();
    const CurrentDate = new Date;
   
    if (this.addonForm.invalid) {
      this.submitted = true;
      Swal.fire('Info', 'Please Fill All The Required Fields.', 'error');
      return;
    }else{
      if(this.data.isEdit !== true){
      if(this.addonForm.value.startDate >= this.addonForm.value.endDate){
        Swal.fire('Error', 'start Date must be less then End Date', 'error');
      } else {
    this.loader
      .showLoader(this.planService.addAddon(this.addonForm.value))
      .subscribe(
        (data: any) => {
          this.isSuccess.emit(true);
          this.dialogRef.close();
          Swal.fire('Success', 'Addonn created successfully', 'success');
        },
        (error: any) => {
          Swal.fire('error', 'Something went wrong', 'error');
        }
      );
    }
    }else{
      this.loader
        .showLoader(this.planService.addAddon(this.addonForm.value))
        .subscribe(
          (data: any) => {
            this.isSuccess.emit(true);
            this.dialogRef.close();
            Swal.fire('Success', 'Addonn created successfully', 'success');
          },
          (error: any) => {
            Swal.fire('error', 'Something went wrong', 'error');
          }
        );
      }
  }
  }
}
