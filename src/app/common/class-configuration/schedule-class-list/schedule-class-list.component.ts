import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, map, Observable, of, Subject } from 'rxjs';
import { LoaderService } from 'src/app/loader.service';
import { MappingType } from 'src/app/model/MappingType';
import { ScheduleClassVO } from 'src/app/model/schedule-class-list.model';
import { InstituteService } from 'src/app/services/institute/institute.service';
import Swal from 'sweetalert2';
import { ClassMappingPageComponent } from '../../class-mapping-page/class-mapping-page.component';
import { CreateEditClassConfigurationComponent } from '../../create-edit-class-configuration/create-edit-class-configuration.component';
import { MappingPageComponent } from '../../mapping-page/mapping-page.component';

@Component({
  selector: 'app-schedule-class-list',
  templateUrl: './schedule-class-list.component.html',
  styleUrls: ['./schedule-class-list.component.scss'],
})
export class ScheduleClassListComponent implements OnInit {
  classScheduledList: ScheduleClassVO[] = [];
  today: Date = new Date();
  totalCount!: number;
  page: number = 0;
  size: number = 5;
  disabledOnAllClasses: boolean = true;
  subject = new Subject<string>();
  searchParam: string = '';
  result$!: Observable<any>;
  role: any;
  constructor(
    private loader: LoaderService,
    private activatedRoute: ActivatedRoute,
    private instituteService: InstituteService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParams['id'] != null) {
      this.disabledOnAllClasses = false;
    }
    this.refresh(this.page);
    this.applyFilter();
  }
  refresh(page: number) {
    let loader$ = this.instituteService.fetchAllClassSchedule(
      JSON.parse(localStorage.getItem('auth') as string).selectedInstitute,
      JSON.parse(localStorage.getItem('auth') as string).user_id,
      this.activatedRoute.snapshot.queryParams['id'] == null
        ? null
        : this.activatedRoute.snapshot.queryParams['id'],
      this.size,
      page,
      this.searchParam
    );
    this.loader.loadingOn();
    this.loader.showLoader(loader$).subscribe(
      (res: any) => {
        this.classScheduledList = res.body.courseScheduleListVO;
        this.totalCount = res.body.total_count;

        this.loader.loadingOff();
      },
      (error: any) => {
        this.loader.loadingOff();
      }
    );
  }

  EditClassConfiguration(element: any) {
    let dialogRef = this.dialog.open(CreateEditClassConfigurationComponent, {
      width: '700px',
      maxHeight: '800px',
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
        mappingType: MappingType.CLASS_SCHEDULE,
      },
      width: '100%',
      height: '99%',
    });
  }

  delete(idAttach: any) {
    Swal.fire({
      title: 'Do you want to delete the Class?',
      showDenyButton: true,
      confirmButtonText: `Delete`,
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.loader
          .showLoader(this.instituteService.deleteClass(idAttach))
          .subscribe(
            (res) => {
              this.refresh(this.page);
              Swal.fire({
                icon: 'success',
                title: 'Good job',
                text: 'Deleted',
              });
            },
            (err) => {
              Swal.fire({
                icon: 'error',
                title: err.error.message,
                text: 'Something went wrong!',
              });
            }
          );
      }
    });
  }

  cancel(idClassSchedule: number, active: boolean) {
    Swal.fire({
      title: `Do you want to ${
        active == true ? 'rescedule' : 'cancel'
      }  the Class`,
      showDenyButton: true,
      confirmButtonText: `${active == true ? 'Rescedule' : 'Cancel Class'}`,
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        const api$ = this.instituteService.cancelClasss(
          idClassSchedule,
          active
        );
        this.loader.showLoader(api$).subscribe(
          (data: any) => {
            this.refresh(this.page);
            Swal.fire(data.message, 'DONE', 'success');
          },
          (error: any) => {
            Swal.fire('Error Occured!', error?.error?.message, 'error');
          }
        );
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
                this.instituteService.fetchAllClassSchedule(
                  JSON.parse(localStorage.getItem('auth') as string)
                    .selectedInstitute,
                  JSON.parse(localStorage.getItem('auth') as string).user_id,
                  this.activatedRoute.snapshot.queryParams['id'] == null
                    ? null
                    : this.activatedRoute.snapshot.queryParams['id'],
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
          this.classScheduledList = value?.body.courseScheduleListVO;
          this.totalCount = value?.body.total_count;
        });
      });
  }

  backToLastPage() {
    this.role = JSON.parse(
      localStorage.getItem('auth') as string
    ).role.roleType;
    if (this.role == 'Teacher') {
      this.router.navigate(['/teacher/classes']);
    } else {
      this.router.navigate(['/admin/classes']);
    }
  }
}
