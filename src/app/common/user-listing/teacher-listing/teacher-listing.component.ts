import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime, map, Observable, of, Subject } from 'rxjs';
import { LoaderService } from 'src/app/loader.service';
import { MappingType } from 'src/app/model/MappingType';
import { AuthService } from 'src/app/services/auth.service';
import { InstituteService } from 'src/app/services/institute/institute.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import Swal from 'sweetalert2';
import { UserFormVO } from '../../add-user/add-user.component';
import { MappingPageComponent } from '../../mapping-page/mapping-page.component';

@Component({
  selector: 'app-teacher-listing',
  templateUrl: './teacher-listing.component.html',
  styleUrls: ['./teacher-listing.component.scss'],
})
export class TeacherListingComponent implements OnInit {
  searchParam: string = '';
  instituteId!: number;
  page: number = 0;
  size: number = 10;
  totalTeachers = 0;
  subject = new Subject();
  result$!: Observable<any>;
  teachers: UserFormVO[] = [];

  constructor(
    private loader: LoaderService,
    private instituteService: InstituteService,
    private dialog: MatDialog,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.refresh(this.page);
    this.applyFilter();
  }

  search(evt: any) {
    if (evt.target.value == '') {
      this.refresh(this.page);
    } else {
      const searchText = evt.target.value;
      this.subject.next(searchText);
    }
  }

  refresh(page: number) {
    this.loader
      .showLoader(
        this.instituteService.fetchInstituteUsers(
          AuthService.getInstituteId,
          'Teacher',
          page,
          this.size,
          this.searchParam
        )
      )
      .subscribe(
        (res) => {
          this.teachers = res.users;
          this.totalTeachers = res.totalCount;
        },
        (err) => {
          Swal.fire(
            'Something went wrong!',
            'Error while fetching teachers list',
            'error'
          );
        }
      );
  }

  changeDisplayOrder(displayOrder: string, teacherId: string) {
    this.loader
      .showLoader(
        this.teacherService.updateDisplayOrder(displayOrder, teacherId)
      )
      .subscribe({
        next: (res: any) => {},
        error: (error: HttpErrorResponse) => {
          Swal.fire('Error', 'Internal Server Error', 'error');
        },
      });
  }

  mapTeacher(teacherId: any) {
    this.dialog.open(MappingPageComponent, {
      data: {
        id: teacherId,
        mappingType: MappingType.TEACHER,
      },
      width: '100%',
      height: '99%',
    });
  }

  // mapTeacher(userId: any, teacherId: any) {
  //   this.dialog.open(UserBatchMappingComponent, {
  //     data: {
  //       userId: userId,
  //       teacherId: teacherId,
  //       instituteId: Number.parseInt(
  //         JSON.parse(localStorage.getItem('auth') || '{}').selectedInstitute
  //       ),
  //     },
  //     width: '100%',
  //     height: '95%',
  //   });
  // }

  pageChange(event: any) {
    this.refresh(event);
  }
  changeSize(event: any) {
    this.size = event;
    this.refresh(0);
  }

  applyFilter() {
    this.subject
      .pipe(
        debounceTime(1000),
        map((searchText) =>
          searchText !== ''
            ? this.instituteService.fetchInstituteUsers(
                AuthService.getInstituteId,
                'Teacher',
                this.page,
                this.size,
                this.searchParam
              )
            : of([])
        )
      )
      .subscribe((response) => {
        this.result$ = response;
        this.result$.subscribe((value) => {
          this.teachers = value?.users;
          this.totalTeachers = value?.totalCount;
        });
      });
  }

  changeVisibility(element: any, event: any) {
    this.instituteService.changeVisibility(element.teacherId).subscribe({
      next: (data: any) => {},
      error: (error: HttpErrorResponse) => {
        element.featured = !event.target.checked;
        Swal.fire('Error', 'Somthing Went Wrong', 'error');
      },
    });
  }
}
