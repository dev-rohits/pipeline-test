import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, map, Observable, of, Subject } from 'rxjs';
import { LoaderService } from 'src/app/loader.service';
import { MappingType } from 'src/app/model/MappingType';
import {
  ClassConfiguration,
  ClassScheduleList,
  ScheduleClass,
} from 'src/app/model/schedule-class-list.model';
import { InstituteService } from 'src/app/services/institute/institute.service';
import Swal from 'sweetalert2';

import { ClassMappingPageComponent } from '../class-mapping-page/class-mapping-page.component';
import { CreateEditClassConfigurationComponent } from '../create-edit-class-configuration/create-edit-class-configuration.component';

@Component({
  selector: 'app-class-configuration',
  templateUrl: './class-configuration.component.html',
  styleUrls: ['./class-configuration.component.scss'],
})
export class ClassConfigurationComponent implements OnInit {
  today: Date = new Date();
  result: ClassScheduleList[] = [];
  classConfiguration: ClassConfiguration[] = [];
  selectedIntitute!: any;
  ScheduleClass!: ScheduleClass;
  totalCount!: number;
  page: number = 0;
  size: number = 5;
  subject = new Subject<string>();
  searchParam: string = '';
  result$!: Observable<any>;
  userId: any;

  constructor(
    private dialog: MatDialog,
    private instituteService: InstituteService,
    private loader: LoaderService
  ) {}
  ngOnInit(): void {
    this.refresh(this.page);
    this.applyFilter();
  }

  refresh(page: number) {
    this.loader
      .showLoader(
        this.instituteService.getClassConfigurations(
          JSON.parse(localStorage.getItem('auth') as string).selectedInstitute,
          this.size,
          page,
          this.searchParam
        )
      )
      .subscribe((res: any) => {
        this.classConfiguration = res.body.classConfigurations;
        this.totalCount = res?.body.total_count;
      });
  }

  addClassConfiguration() {
    let dialogRef = this.dialog.open(CreateEditClassConfigurationComponent, {
      width: '800px',
      maxHeight: '900px',
      disableClose: true,
      data: {
        scheduleDTO: this.ScheduleClass,
        isEdit: false,
        from: true,
      },
    });
    dialogRef.componentInstance.uploadSuccess.subscribe((res) => {
      if (res) {
        this.refresh(this.page);
        dialogRef.close();
      }
    });
  }

  EditClassConfiguration(element: any) {
    let dialogRef = this.dialog.open(CreateEditClassConfigurationComponent, {
      width: '800px',
      maxHeight: '900px',
      disableClose: true,
      data: {
        scheduleDTO: element,
        isEdit: true,
      },
    });
    dialogRef.componentInstance.uploadSuccess.subscribe((res) => {
      if (res) {
        this.refresh(this.page);
        dialogRef.close();
      }
    });
  }

  classMapping(id: number) {
    this.dialog.open(ClassMappingPageComponent, {
      data: {
        id: id,
        mappingType: MappingType.CLASS_CONFIGURATION,
      },
      width: '100%',
      height: '99%',
    });
  }

  onDelete(element: any, id: number) {
    element.classConfigId = id;
    Swal.fire({
      title: 'Do you want to delete the Future Classes of this configuration ?',
      showDenyButton: true,
      confirmButtonText: `Delete`,
      denyButtonText: `Cancel`,
    }).then((result: { isConfirmed: any; isDenied: any }) => {
      if (result.isConfirmed) {
        this.loader
          .showLoader(this.instituteService.deleteFutureClasses(id))
          .subscribe(
            (data: any) => {
              Swal.fire('success', data.message);
              this.refresh(this.page);
            },
            (error: any) => {
              Swal.fire('Error', 'Something went wrong !', error);
            }
          );
      } else if (result.isDenied) {
      }
    });
  }

  // onTableDataChange() {
  //   this.page = this.page + 1;
  //   this.refresh();
  // }
  // previous() {
  //   this.page = this.page - 1;
  //   this.refresh();
  // }
  // onChange() {
  //   this.size;
  //   this.refresh();
  // }

  pageChange(event: any) {
    this.refresh(event);
  }

  changeSize(event: any) {
    this.size = event;
    this.refresh(0);
  }

  search(evt: any) {
    if (evt.target.value == '') {
      this.refresh(this.page);
    } else {
      const searchText = evt.target.value;
      this.subject.next(searchText);
    }
  }

  applyFilter() {
    this.subject
      .pipe(
        debounceTime(1000),
        map((searchText: string) =>
          searchText !== ''
            ? this.loader.showLoader(
                this.instituteService.getClassConfigurations(
                  JSON.parse(localStorage.getItem('auth') as string)
                    .selectedInstitute,
                  this.size,
                  this.page,
                  this.searchParam
                )
              )
            : of([])
        )
      )
      .subscribe((res) => {
        this.result$ = res;
        this.result$.subscribe((value: any) => {
          this.classConfiguration = value?.body.classConfigurations;
          this.totalCount = value?.body.total_count;
        });
      });
  }
}
