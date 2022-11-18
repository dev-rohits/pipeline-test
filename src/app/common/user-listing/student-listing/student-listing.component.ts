import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, map, Observable, of, Subject } from 'rxjs';
import { LoaderService } from 'src/app/loader.service';
import { MappingType } from 'src/app/model/MappingType';
import { AuthService } from 'src/app/services/auth.service';
import { InstituteService } from 'src/app/services/institute/institute.service';
import Swal from 'sweetalert2';
import { UserFormVO } from '../../add-user/add-user.component';
import { MappingPageComponent } from '../../mapping-page/mapping-page.component';

@Component({
  selector: 'app-student-listing',
  templateUrl: './student-listing.component.html',
  styleUrls: ['./student-listing.component.scss'],
})
export class StudentListingComponent implements OnInit {
  page: number = 0;
  size: number = 10;
  totalStudents = 0;
  subject = new Subject();
  result$!: Observable<any>;
  students: UserFormVO[] = [];
  searchParam: string = '';

  constructor(
    private loader: LoaderService,
    private instituteService: InstituteService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.refresh(this.page);
    this.applyFilter();
  }

  refresh(page: number) {
    this.loader
      .showLoader(
        this.instituteService.fetchInstituteUsers(
          AuthService.getInstituteId,
          'Student',
          page,
          this.size,
          this.searchParam
        )
      )
      .subscribe(
        (res) => {
          this.students = res.users;
          this.totalStudents = res.totalCount;
        },
        (err) => {
          Swal.fire(
            'Something went wrong!',
            'Error while fetching students list',
            'error'
          );
        }
      );
  }

  disableUser(element: any, event: any) {
    this.authService.disableUser(element.id).subscribe({
      next: (data: any) => {},
      error: (error: HttpErrorResponse) => {
        element.featured = !event.target.checked;
        Swal.fire('Error', 'Somthing Went Wrong', 'error');
      },
    });
  }

  search(evt: any) {
    if (evt.target.value == '') {
      this.refresh(this.page);
    } else {
      const searchText = evt.target.value;
      this.subject.next(searchText);
    }
  }

  mapStudent(userId: any) {
    this.dialog.open(MappingPageComponent, {
      data: {
        id: userId,
        mappingType: MappingType.STUDENT,
      },
      width: '100%',
      height: '99%',
    });
  }

  applyFilter() {
    this.subject
      .pipe(
        debounceTime(1000),
        map((searchText) =>
          searchText !== ''
            ? this.instituteService.fetchInstituteUsers(
                AuthService.getInstituteId,
                'Student',
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
          this.students = value?.users;
          this.totalStudents = value.totalCount;
        });
      });
  }

  pageChange(event: any) {
    this.refresh(event);
  }
  changeSize(event: any) {
    this.size = event;
    this.refresh(0);
  }

  // disableUser(id: string) {
  //   Swal.fire({
  //     title: 'Are you sure you want to delete the user?',
  //     showDenyButton: true,
  //     confirmButtonText: 'Yes',
  //     denyButtonText: 'No',
  //     customClass: {
  //       actions: 'my-actions',
  //       cancelButton: 'order-1 right-gap',
  //       confirmButton: 'order-2',
  //       denyButton: 'order-3',
  //     },
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.authService.disableUser(id).subscribe(
  //         (res) => {
  //           Swal.fire('User Deleted Successfully', '', 'success');
  //           this.refresh(0);
  //         },
  //         (err) => {}
  //       );
  //     }
  //   });
  // }
}
