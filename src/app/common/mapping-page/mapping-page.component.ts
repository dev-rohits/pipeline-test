import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from 'src/app/loader.service';
import { BatchMapping, CourseBatchMapVO } from 'src/app/model/CourseBatchMapVO';
import { CommonService } from 'src/app/services/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mapping-page',
  templateUrl: './mapping-page.component.html',
  styleUrls: ['./mapping-page.component.scss'],
})
export class MappingPageComponent implements OnInit {
  courses: CourseBatchMapVO[] = [];
  filteredCourses: CourseBatchMapVO[] = [];
  batches: BatchMapping[] = [];
  selectedBatch: CourseBatchMapVO[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number; mappingType: string },
    private commonService: CommonService,
    private loader: LoaderService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loader
      .showLoader(
        this.commonService.getBatchMapping(this.data.id, this.data.mappingType)
      )
      .subscribe({
        next: (data: CourseBatchMapVO[]) => {
          this.courses = data;
          this.filteredCourses = data;
        },
        error: (error: HttpErrorResponse) => {
          Swal.fire(
            'Something went wrong!',
            'Error while fetching list',
            'error'
          );
        },
      });
  }

  courseSelectUpdate(event: any, id: number) {
    const index = this.filteredCourses.findIndex((course) => course.id == id);
    if (index != -1) {
      this.filteredCourses[index].selected = event.target.checked;
    }
  }

  removeSelectedBatches(course: CourseBatchMapVO, event: any) {
    if (!event.target.checked) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to unselect this course and its selected batches!',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          let callApi = false;
          course.batches.map((batch) => {
            if (batch.selected) {
              callApi = true;
              batch.selected = false;
            }
          });
          if (callApi) {
            this.removeBatchMapping(course);
          }
        } else {
          const index = this.filteredCourses.findIndex(
            (c) => c.id == course.id
          );
          if (index != -1) {
            this.filteredCourses[index].selected = true;
          }
        }
      });
    }
  }

  removeBatchMapping(course: CourseBatchMapVO) {
    this.selectedBatch.push(course);
    this.loader
      .showLoader(
        this.commonService.saveBatchMapping(
          this.data.mappingType,
          this.data.id,
          this.selectedBatch,
          null
        )
      )
      .subscribe({
        next: (res: any) => {},
        error: (error: HttpErrorResponse) => {
          Swal.fire('Something went wrong!', 'Internal Server Error', 'error');
        },
      });
  }

  saveBatchMapping(event: any, course: CourseBatchMapVO, id: number) {
    const index = course.batches.findIndex((batch) => batch.id == id);
    course.batches.forEach((b) => {
      if (b.id != id) {
        b.preSelected = b.selected;
      }
    });
    course.batches[index].selected = event.target.checked;
    course.batches[index].preSelected = !event.target.checked;
    this.selectedBatch.push(course);
    this.loader
      .showLoader(
        this.commonService.saveBatchMapping(
          this.data.mappingType,
          this.data.id,
          this.selectedBatch,
          null
        )
      )
      .subscribe({
        next: (data) => {
          this.openSnackBar(course.batches[index].name, event.target.checked);
          this.selectedBatch = [];
        },
        error: (error) => {
          Swal.fire(
            'Something went wrong!',
            'Error while saving mapping',
            'error'
          );
        },
      });
  }

  searchCourse(event: any) {
    this.filteredCourses = this.courses.filter(
      (newMapMaterial: CourseBatchMapVO) => {
        if (
          newMapMaterial.name
            .toLocaleLowerCase()
            .includes(event.target.value.toLocaleLowerCase())
        ) {
          return true;
        } else {
          return false;
        }
      }
    );
  }

  openSnackBar(name: string, event: boolean) {
    var batchName = name.split('|');
    event
      ? this._snackBar.open('Mapped with ' + batchName[0], '', {
          duration: 2000,
        })
      : this._snackBar.open('Mapping removed with ' + batchName[0], '', {
          duration: 2000,
        });
  }
}
