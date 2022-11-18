import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { LoaderService } from 'src/app/loader.service';
import { ClassList } from 'src/app/model/ClassList';
import { MappingList } from 'src/app/model/MappingList';
import { InstituteService } from 'src/app/services/institute/institute.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-material-class-mapping',
  templateUrl: './material-class-mapping.component.html',
  styleUrls: ['./material-class-mapping.component.scss'],
})
export class MaterialClassMappingComponent implements OnInit {
  todo: any[] = [];
  done: any[] = [];
  filteredToDo: any[] = [];
  dropdownListClass: any[] = [];
  dropdownListMaterial: any[] = [];
  constructor(
    private instituteService: InstituteService,
    private loader: LoaderService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      materialId: any;
      isEdit: boolean;
      teacherId: any;
      mappingList: any[];
    }
  ) {}

  ngOnInit(): void {
    scrollTo(0, 0);
    let selectedInstitute = Number.parseInt(
      JSON.parse(localStorage.getItem('auth') || '{}').selectedInstitute
    );
    if (this.data.isEdit) {
      let list$ = this.instituteService.fetchMaterialMappingList(
        this.data.materialId,
        this.data.teacherId,
        selectedInstitute
      );
      this.loader.showLoader(list$).subscribe((res) => {
        this.todo = res.classScheduleVOList.map((element) => {
          return {
            classId: element.idClassSchedule,
            className:
              element.classTitle +
              ' : ' +
              element.classLiveId +
              ' : ' +
              moment(element.startDate).format('MMMM Do YYYY, h:mm:ss a'),
          };
        });
        this.filteredToDo = this.todo;
        this.done = res.mappingList.map((element) => {
          return {
            classId: element.idClassSchedule,
            className:
              element.classObject.classTitle +
              ' : ' +
              element.classObject.classLiveId +
              ' : ' +
              moment(element.classObject.startDate).format(
                'MMMM Do YYYY, h:mm:ss a'
              ),
          };
        });
      });
    }
  }

  mapSuccess = new EventEmitter<boolean>();
  pipe = new DatePipe('en-US');

  refresh() {
    let selectedInstitute = Number.parseInt(
      JSON.parse(localStorage.getItem('auth') || '{}').selectedInstitute
    );
    let refresh$ = this.instituteService.fetchMaterialForMapping(
      JSON.parse(localStorage.getItem('auth') || '{}').user_id,
      selectedInstitute
    );
    this.loader.showLoader(refresh$).subscribe((res) => {
      this.dropdownListClass = res.classes.map((element) => {
        return {
          classId: element.idClassSchedule,
          className:
            element.classTitle +
            ' : ' +
            moment(element.startDate).format('MMMM Do YYYY, h:mm:ss a'),
        };
      });
      this.todo = this.dropdownListClass;
    });
  }

  onSubmit() {
    let mapping: MappingList[] = [];
    this.done.forEach((element) => {
      mapping.push({
        idClassSchedule: element.classId,
        idClassMaterial: this.data.materialId,
      });
    });

    let refresh$ = this.instituteService.addClassMaterial({
      mappingList: mapping,
    });
    this.loader.showLoader(refresh$).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Material mapped successfully!',
          text: 'Success',
        });
        this.mapSuccess.emit(true);
      },
      (err: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.message,
        });
      }
    );
  }

  onEdit() {
    this.instituteService
      .delteMaterialMappingList(this.data.materialId)
      .subscribe(
        (res) => {
          let mapping: MappingList[] = [];
          this.done.forEach((element) => {
            mapping.push({
              idClassSchedule: element.classId,
              idClassMaterial: this.data.materialId,
            });
          });

          let refresh$ = this.instituteService.addClassMaterial({
            mappingList: mapping,
          });
          this.loader.showLoader(refresh$).subscribe(
            (res) => {
              Swal.fire({
                icon: 'success',
                title: 'Material mapped successfully!',
                text: 'Success',
              });
              this.mapSuccess.emit(true);
            },
            (err: HttpErrorResponse) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.error.message,
              });
            }
          );
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      );
  }

  searchData(event: any) {
    this.filteredToDo = this.todo.filter((todo: ClassList) => {
      if (
        todo.className
          ?.toLocaleLowerCase()
          .includes(event.target.value.toLocaleLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
