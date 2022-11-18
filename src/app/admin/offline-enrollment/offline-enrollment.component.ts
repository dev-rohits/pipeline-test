import { Component, OnInit } from '@angular/core';
import { debounceTime, map, Observable, of, Subject } from 'rxjs';
import { OfflineEnrollmentApplication } from 'src/app/model/OfflineEnrollmentApplication';
import { InstituteService } from 'src/app/services/institute/institute.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-offline-enrollment',
  templateUrl: './offline-enrollment.component.html',
  styleUrls: ['./offline-enrollment.component.scss'],
})
export class OfflineEnrollmentComponent implements OnInit {
  page: number = 0;
  size: number = 10;
  totalEnrollments: number = 0;
  searchParam: string = '';
  offlineEnrollmentsList: OfflineEnrollmentApplication[] = [];
  applicationCount: number = 0;
  subject = new Subject();
  result$!: Observable<any>;

  constructor(private instituteService: InstituteService) {}

  ngOnInit(): void {
    this.refresh(this.page);
    this.applyFilter();
  }

  refresh(page: number) {
    this.instituteService
      .getOfflineApplications(this.page, this.size, this.searchParam)
      .subscribe(
        (data) => {
          this.offlineEnrollmentsList = data.applicationDetails;
          this.applicationCount = data?.applicationCount;
        },
        (error) => {
          Swal.fire(
            'Something went wrong!',
            'Error while fetching enrollment list',
            'error'
          );
        }
      );
  }

  paymentRecieved(application: OfflineEnrollmentApplication) {
    Swal.fire({
      title: 'Are you sure you want to confirm this transaction?',
      showDenyButton: true,
      confirmButtonText: `Payment Recieved`,
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.instituteService
          .paymentRecieved(application.id.toString())
          .subscribe(
            (data: any) => {
              Swal.fire(
                'Success',
                application.name +
                  'successfully enrolled in ' +
                  application.batchName,
                'success'
              );
              this.refresh(this.page);
            },
            (error) => {
              Swal.fire('Something went wrong!', '', 'error');
            }
          );
      } else if (result.isDenied) {
        Swal.fire('Cancel', '', 'info');
      }
    });
  }

  applyFilter() {
    let idTeacher = JSON.parse(localStorage.getItem('auth') || '{}').user_id;

    this.subject
      .pipe(
        debounceTime(1000),
        map((searchText) =>
          searchText !== ''
            ? this.instituteService.getOfflineApplications(
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
          this.offlineEnrollmentsList = value?.applicationDetails;
        });
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

  pageChange(event: any) {
    this.refresh(event);
  }

  changeSize(event: any) {
    this.size = event;
    this.refresh(0);
  }
}
