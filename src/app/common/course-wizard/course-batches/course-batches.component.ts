import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { BatchVO } from 'src/app/model/BatchVO';
import { BatchService } from 'src/app/services/batch.service';
import { CourseWizardService } from 'src/app/services/course/course-wizard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-batches',
  templateUrl: './course-batches.component.html',
  styleUrls: ['./course-batches.component.scss']
})
export class CourseBatchesComponent implements OnInit {
  batches: BatchVO[] = []
  constructor(private courseWizard: CourseWizardService,private batchService:BatchService) { }

  ngOnInit(): void {
    this.batches = this.courseWizard.getBatches
  }

  addBatch() {
    this.courseWizard.batchSubject$.next(false)
  }

  edit(batch: BatchVO) {
    this.courseWizard.batchSubject$.next(batch)
  }


  showWarning() {
    return Swal.fire({
      title: 'Do you want to delete this batch.',
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

  async delete(id: number,index:number) {
    await this.showWarning().then(
      (value: boolean) => {
        if(value){
          this.batchService.disableBatch(id).subscribe(
            {
              next:(data:any)=>{
                this.courseWizard.deleteBatch(index)
              },
              error:(error:HttpErrorResponse)=>{
                Swal.fire('Error','Something went wrong','error')
              }
            }
          )
        }
      }
    )
  }

}
