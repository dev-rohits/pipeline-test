import { Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { Subscription, interval } from 'rxjs';
import { VideoTimeTracking } from 'src/app/model/classVO';
import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-document-preview',
  templateUrl: './document-preview.component.html',
  styleUrls: ['./document-preview.component.scss']
})
export class DocumentPreviewComponent implements OnInit {

  isPdf = false;
  isImg = false;
  isVideo = false;
  subscription!: Subscription;
  filePath:string=''
  videoTimeTracking = new VideoTimeTracking();
  @ViewChild(PdfViewerComponent, { static: false })
  private pdfComponent!: PdfViewerComponent;
  img: any;
  constructor(
    private dialogRef: MatDialogRef<DocumentPreviewComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      obj: any;
      type: string;
    },
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    if (this.data.type == 'pdf') {
      this.isPdf = true;
    }
    if (this.data.type == 'image') {
      this.img=this.data.obj.materialObj.materialFilePath
      this.isImg = true;
      
    }
    if (this.data.type == 'video') {
      this.videoTimeTracking.materialId = this.data?.obj?.idClassMaterial;
      this.videoTimeTracking.videoResumeTiming =
        this.data?.obj?.materialObj?.videoTimeTracking?.videoResumeTime;
      this.videoTimeTracking.watchTime=0;
      this.isVideo = true;
    }
    this.filePath=AuthService.getFilePath
  }
  removeDialog() {
    this.dialogRef.close();
  }
  updateSeekBar() {
    const video = document.getElementById('materialVideo') as HTMLVideoElement;
    if (this.data.obj.materialObj.videoTimeTracking != null) {
      video.currentTime =
        this.data.obj.materialObj.videoTimeTracking.videoResumeTime;
      video.ontimeupdate =
        this.data.obj.materialObj.videoTimeTracking.videoResumeTime;
    }
  }
  saveVideoTimeDetails() {
    let updatedTime: number = 0;
    const video = document.getElementById('materialVideo') as HTMLVideoElement;
    this.videoTimeTracking.materialId = this.data?.obj?.idClassMaterial;
    this.videoTimeTracking.userId = +JSON.parse(localStorage.getItem('auth') as string);
    this.subscription = interval(100).subscribe((value) => {
      this.videoTimeTracking.videoResumeTiming = updatedTime;
      this.videoTimeTracking.watchTime = (value * 100) / 1000;
    });
    video.ontimeupdate = (event) => {
      updatedTime = video.currentTime;
    };
  }
  ngOnDestroy(): void {
    if (this.data.type == 'video') {
      this.studentService
        .saveVideoResumeTiming({
          userId: +JSON.parse(localStorage.getItem('auth') as string).user_id,
          materialId: this.videoTimeTracking.materialId,
          videoResumeTiming: this.videoTimeTracking.videoResumeTiming,
          watchTime: this.videoTimeTracking.watchTime,
        })
        .subscribe(
          (data: any) => {
          },
          (error: any) => {
          }
        );
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }

    //    this.watchedTimeSubscription.unsubscribe()
  }

  clearSubscription() {
    if (this.data.type == 'video') {
      this.studentService
        .saveVideoResumeTiming({
          userId: +JSON.parse(localStorage.getItem('auth') as string).user_id,
          materialId: this.videoTimeTracking.materialId,
          videoResumeTiming: this.videoTimeTracking.videoResumeTiming,
          watchTime: this.videoTimeTracking.watchTime,
        })
        .subscribe(
          (data: any) => {
          },
          (error: any) => {
          }
        );
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.videoTimeTracking.watchTime=0
    }
    // this.watchedTimeSubscription.unsubscribe()
  }

  @HostListener('window:beforeunload')
  beforeunloadHandler() {
    if (this.data.type == 'video') {
      this.studentService
        .saveVideoResumeTiming({
          userId: +JSON.parse(localStorage.getItem('auth') as string).user_id,
          materialId: this.videoTimeTracking.materialId,
          videoResumeTiming: this.videoTimeTracking.videoResumeTiming,
          watchTime: this.videoTimeTracking.watchTime,
        })
        .subscribe(
          (data: any) => {
          },
          (error: any) => {
          }
        );
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
  }
}
