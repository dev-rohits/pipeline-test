import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { LoaderService } from 'src/app/loader.service';
import { S3FileInfo, S3StorageDetails } from 'src/app/model/S3StorageDetails';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { HttpErrorResponse } from '@angular/common/http';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ApiResponse } from 'src/app/model/ApiResponse';
import { MatDialog } from '@angular/material/dialog';
import { PreviewComponent } from './preview/preview.component';

@Component({
  selector: 'app-file-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.scss'],
})
export class FileManagementComponent implements OnInit {
  searchParam: string = '';
  bucketSize!: number;
  usedSpace!: number;
  files: S3FileInfo[] = [];
  selectedFiles: S3FileInfo[] = [];
  selectedSize: number = 0;
  filePath: string = '';
  videoTypes: string[] = ['mp4', 'mov', 'avi', 'mkv'];
  imageTypes: string[] = ['jpeg', 'jpg', 'png'];
  otherTypes: string[] = ['pdf', 'doc', 'docx'];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dataObs$!: Observable<any>;

  constructor(
    private subscriptionService: SubscriptionService,
    private loader: LoaderService,
    private _changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    let api$ = this.subscriptionService.gets3BucketProperties();
    this.loader.showLoader(api$).subscribe({
      next: (res: S3StorageDetails) => {
        this.bucketSize = res?.bucketSize;
        this.usedSpace = res?.usedSpace / 1024 / 1024 / 1024;
        this.files = res?.uploadedFiles;
        this.setPagination(this.files);
      },
      error: (error) => {},
    });
  }

  searchFile(event: any) {
    // this.filteredCourses = this.courses.filter(
    //   (newMapMaterial: CourseBatchMapVO) => {
    //     if (
    //       newMapMaterial.name
    //         .toLocaleLowerCase()
    //         .includes(event.target.value.toLocaleLowerCase())
    //     ) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   }
    // );
  }

  // selectAll(event: any) {
  //   if (event.target.checked) {
  //     this.dataObs$.subscribe({
  //       next: (res: S3FileInfo[]) => {
  //         res.forEach((file) => {
  //           file.selected = true
  //           this.selectedFiles.push(file);
  //         })
  //       },
  //       error: (err) => {

  //       }
  //     });
  //   }
  // }

  addToSelected(data: S3FileInfo, event: any) {
    if (event.target.checked) {
      data.selected = true;
      this.selectedFiles.push(data);
      this.selectedSize += data.size;
    } else {
      const index = this.selectedFiles.findIndex((c) => c.etag == data.etag);
      if (index > -1) {
        this.selectedFiles[index].selected = false;
        this.selectedSize -= data.size;
        this.selectedFiles.splice(index, 1);
      }
    }
  }

  showPreview(key: string) {
    const filePath = this.filePath + key;
    const type = this.getFileType(filePath);
    this.dialog.open(PreviewComponent, {
      data: {
        path: filePath,
        type: type,
      },
    });

    // Swal.fire({
    //   html:
    //     this.getFileType(filePath) == 'image'
    //       ? `<img class="class="img-thumbnail" style="object-fit:contain" src="${filePath}" alt="Girl in a jacket" width="200" height="200">
    //      `
    //       : this.getFileType(filePath) == 'video'
    //       ? `<video src="${filePath}" width="400" height="200">`
    //       : ``,
    //   showCloseButton: true,
    //   showCancelButton: true,
    //   focusConfirm: false,
    // });
  }

  getFileType(filePath: string) {
    return this.imageTypes.includes(
      filePath.substring(filePath.lastIndexOf('.') + 1)
    )
      ? 'image'
      : this.videoTypes.includes(
          filePath.substring(filePath.lastIndexOf('.') + 1)
        )
      ? 'video'
      : 'file';
  }

  downloadFile(eTag: string, key: string, bucketName: string) {
    this.subscriptionService.downloadFile(eTag, key, bucketName).subscribe(
      (data: any) => {
        const blob = new Blob([data], { type: data.type });
        let FileSaver = saveAs(blob);
      },
      (error: HttpErrorResponse) => {
        Swal.fire('You are not allowed to download the resources');
      }
    );
  }

  deleteFiles() {
    Swal.fire({
      title: 'Do you want to delete the files.?',
      showDenyButton: true,
      confirmButtonText: `Delete`,
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        let keys = this.selectedFiles.map((value: S3FileInfo) => value.key);
        this.loader.loadingOn();
        this.subscriptionService
          .deleteFiles(keys, AuthService.getBucketName)
          .subscribe(
            (data: ApiResponse) => {
              this.loader.loadingOff();
              this.refresh();
            },
            (error: HttpErrorResponse) => {
              this.loader.loadingOff();
              Swal.fire('Error', 'Something went wrong', 'error');
            }
          );
      } else if (result.isDenied) {
        Swal.fire('Files not deleted', '', 'info');
      }
    });
  }

  setPagination(tableData: S3FileInfo[]) {
    this.dataSource = new MatTableDataSource<any>(tableData);
    this._changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataObs$ = this.dataSource.connect();
  }
}
