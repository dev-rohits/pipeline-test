import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { debounceTime, map, Observable, of, Subject } from 'rxjs';
import { LoaderService } from 'src/app/loader.service';
import { UserVO } from 'src/app/model/userVO';
import { AuthService } from 'src/app/services/auth.service';
import { InstituteService } from 'src/app/services/institute/institute.service';
import Swal from 'sweetalert2';
import { UserFormVO } from '../add-user/add-user.component';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss'],
})
export class UserListingComponent implements OnInit {
  tab: number = 1;
  csvRecords: any[] = [];
  usersData!: UserFormVO[];
  header = false;
  @ViewChild('inputFile')
  myInputVariable!: ElementRef;
  offlineEnrollmentsCount: number = 0;
  constructor(
    private loader: LoaderService,
    private instituteService: InstituteService
  ) {}

  ngOnInit(): void {
    this.loader
      .showLoader(this.instituteService.getOfflineApplicationsCount())
      .subscribe(
        (data) => {
          this.offlineEnrollmentsCount = data;
        },
        (error) => {
          Swal.fire(
            'Something went wrong!',
            'Error while fetching enrollment count',
            'error'
          );
        }
      );
  }
}
