import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { LoaderService } from 'src/app/loader.service';
import { PricingPlanVO } from 'src/app/model/PricingPlanVO';
import { CourseWizardService } from 'src/app/services/course/course-wizard.service';
import { PricingPlanService } from 'src/app/services/pricing-plan.service';
import Swal from 'sweetalert2';
import { CourseWizardComponent } from '../course-wizard.component';

@Component({
  selector: 'app-course-pricing-plans',
  templateUrl: './course-pricing-plans.component.html',
  styleUrls: ['./course-pricing-plans.component.scss'],
})
export class CoursePricingPlansComponent implements OnInit {
  pricingPlans: PricingPlanVO[] = [];
  constructor(private loader: LoaderService, private courseWizardService: CourseWizardService, private planService: PricingPlanService) { }

  ngOnInit(): void {
    this.pricingPlans = this.courseWizardService.getPricingPlans
  }

  showPlanForm() {
    this.courseWizardService.planSubject$.next(false)
  }

  editPlanForm(plan: PricingPlanVO) {
    this.courseWizardService.planSubject$.next(plan)
  }

  next() {
     this.courseWizardService.nextFromTab(3)
  }

  updateActiveFlag(element: PricingPlanVO, event: any) {
    this.loader.showLoader(this.planService.updatePlanActiveFlag(element.idPricingPlan)).subscribe({
      next: (data: any) => { },
      error: (error: HttpErrorResponse) => {
        element.isPlanActive = (!(event.target.checked)).toString()
        Swal.fire('Error', 'Somthing Went Wrong', 'error')
      }
    })
  }

  showWarning() {
    return Swal.fire({
      title: 'Do you want to delete this plan.',
      text: 'All mappings will be deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete?',
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      } else {
        return false;
      }
    });
  }

  async delete(id:number,index:number) {
    await this.showWarning().then(
      (value: boolean) => {
        if(value){
          this.planService.delete(id).subscribe({
            next:(data:any)=>{
              this.courseWizardService.deletePricingPlan(index)
            },
            error:(error:HttpErrorResponse)=>{Swal.fire("Error","Something Went Wrong",'error')}
          })
        }
      }
    )
  }

}
