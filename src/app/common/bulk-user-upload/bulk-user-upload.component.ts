import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { LoaderService } from 'src/app/loader.service';
import { CsvUploadRecordsVO, UserCsvVO } from 'src/app/model/UserCsvVO';
import { InstituteService } from 'src/app/services/institute/institute.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { UserFormVO } from '../add-user/add-user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bulk-user-upload',
  templateUrl: './bulk-user-upload.component.html',
  styleUrls: ['./bulk-user-upload.component.scss']
})
export class BulkUserUploadComponent implements OnInit {
  csvRecords: any[] = [];
  // : CustomerLeads[];
  usersData!: UserCsvVO[];
  totalCount!: number;
  page: number = 0;
  size: number = 5;
  csvUploadRecordsVO: CsvUploadRecordsVO[] = [];
  header = false;
  @ViewChild('inputFile')
  myInputVariable!: ElementRef;
  FetchedRecord: any;
  role: any;
  constructor(private dialog: MatDialog,
    private ngxCsvParser: NgxCsvParser, 
    private loader: LoaderService,
    private instituteService:InstituteService,
    private subscriptionService:SubscriptionService,
    private router: Router
    
    ) {}

  ngOnInit(): void {
    this.refresh(this.page);
  }

  refresh(page: number) {
    this.loader
      .showLoader(
        this.instituteService.fetchAllCsvRecords(
          JSON.parse(localStorage.getItem('auth') as string).selectedInstitute,
          this.size,
          page,
        )
      )
      .subscribe((res: any) => {
        this.csvUploadRecordsVO = res.body.csvRecords;
        this.totalCount = res.body.total_count;
      });
  }

  pageChange(event: any) {
    this.refresh(event);
  }

  changeSize(event: any) {
    this.size = event;
    this.refresh(0);
  }
  
  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;
    if (!files[0].name.includes('.csv')) {
      alert('Please select the csv file.');
      return;
    }
    Swal.fire({
      title: 'Do you want  upload document?',
      showDenyButton: true,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
     }).then((result) => {
      if(result.isConfirmed) {
        this.loader.loadingOn();
     this.header = true;
     this.ngxCsvParser
      .parse(files[0], { header: this.header, delimiter: ',' })
      .pipe()
      .subscribe(
        (result: any) => {
          this.csvRecords = result;
          this.usersData = this.csvRecords
          this.instituteService.saveUsersCSV({usersDataList:this.usersData,instituteId:JSON.parse(localStorage.getItem('auth') as string).selectedInstitute}).subscribe(
            (data:any)=>{
              Swal.fire(data.body.message, 'success','success');
              this.FetchedRecord=data.body;
              this.loader.loadingOff()
              this.myInputVariable.nativeElement.value = '';
              this.refresh(this.page);
            },
            (error:any)=>{
              Swal.fire('Error Occured!',error.error.errorMessage, 'error');
              this.myInputVariable.nativeElement.value = '';
              this.loader.loadingOff();
            }
          )
        },
        (error: NgxCSVParserError) => {
        }
      );
    }
    else if(result.isDenied) {
      this.myInputVariable.nativeElement.value = '';
      Swal.fire('Document not Uploaded', '', 'info');
    }
  })
  }

//   downloadCSV(filePath:string){
// alert(filePath)
//   }
  // downloadCSV(data: any) {
  //   let link = document.createElement("a");
  //   link.download = data;
  //   link.href = data;
  //   link.click();
  // }
  downloadCSV(key: string) {

    this.subscriptionService.downloadFile(null, key, 'nrichvideo').subscribe(
      (data: any) => {
        const blob = new Blob([data], { type: data.type });
        let FileSaver = saveAs(blob);
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        });
      }
    );
  }

  backToLastPage() {
    this.role = JSON.parse(
      localStorage.getItem('auth') as string
    ).role.roleType;
    if (this.role == 'Teacher') {
      this.router.navigate(['/teacher/users']);
    } else {
      this.router.navigate(['/admin/users']);
    }
  }
 
}
