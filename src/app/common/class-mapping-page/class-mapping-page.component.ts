import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InstituteRoles } from 'src/app/enums/InstituteRoles';
import { LoaderService } from 'src/app/loader.service';
import { BatchMapping, CourseBatchMapVO } from 'src/app/model/CourseBatchMapVO';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-class-mapping-page',
  templateUrl: './class-mapping-page.component.html',
  styleUrls: ['./class-mapping-page.component.scss'],
})
export class ClassMappingPageComponent implements OnInit {
  courses: CourseBatchMapVO[] = [];
  filteredCourses: CourseBatchMapVO[] = [];
  batches: BatchMapping[] = [];
  batchIds: number[] = [];
  teachers: CourseBatchMapVO[] = [];
  selectedBatch: CourseBatchMapVO[] = [];
  mapping: string = '';
  teacher: CourseBatchMapVO[] = [];
  flag: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number; mappingType: string },
    private commonService: CommonService,
    private loader: LoaderService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.mapping = this.data.mappingType;
    this.loader
      .showLoader(
        this.commonService.getBatchMapping(this.data.id, this.data.mappingType)
      )
      .subscribe({
        next: (data: CourseBatchMapVO[]) => {
          this.courses = data;
          this.filteredCourses = data;
        this.addToSelectedBatchIds();
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

  addToSelectedBatchIds() {
    this.courses.forEach((course) => {
      course.batches.forEach((batch) => {
        if (batch.selected) {
          this.batchIds.push(batch.id);
        }
      });
    });
    if (this.batchIds.length > 0) {
      this.findTeachers();
    }
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
        text: 'You want to unselect this course and its selected batches & teachers!',
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

  removeSelectedTeachers() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to unselect this batch and its selected teachers!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
      } else {
      }
    });
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

  saveMapping(teacherId: number) {
    this.loader
      .showLoader(
        this.commonService.saveBatchMapping(
          this.data.mappingType,
          this.data.id,
          this.courses,
          teacherId
        )
      )
      .subscribe({
        next: (data) => {
          if(this.flag)
            this.openSnackBar();
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

  saveBatchMapping(event: any, course: CourseBatchMapVO, id: number) {
    this.teachers = [];
    const index = course.batches.findIndex((batch) => batch.id == id);

    if (event.target.checked) {
      course.batches[index].selected = event.target.checked;
      this.batchIds.push(id);
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to unselect this batch and its selected teachers!',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          course.batches[index].selected = event.target.checked;
          this.batchIds.splice(
            this.batchIds.findIndex((i) => i == id),
            1
          );
        }
      });
    }
  }

  findTeachers() {
    this.loader
      .showLoader(
        this.commonService.fetchTeachers(
          this.data.id,
          this.data.mappingType,
          this.batchIds
        )
      )
      .subscribe({
        next: (response: CourseBatchMapVO[]) => {
          this.teachers = response;
          this.filterTeacher();
        },
        error: (error: HttpErrorResponse) => {
          Swal.fire(
            'Something went wrong!',
            'Error while fetching teachers',
            'error'
          );
        },
      });
  }

  filterTeacher() {
    if (AuthService.getRoleType == InstituteRoles.Teacher) {
      this.teacher = this.teachers.filter(
        (teacher) => teacher.id == AuthService.getUserId
      );
      this.saveMapping(this.teacher[0].id);
      this.flag = false;
      this.teachers = this.teacher;
    }
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

  openSnackBar() {
    this._snackBar.open('Mapping created successfully!', '', {
      duration: 2000,
    });
  }
}
