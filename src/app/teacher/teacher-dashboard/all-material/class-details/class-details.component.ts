import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { LoaderService } from 'src/app/loader.service';
import { ClassVOObj, Material, recordedClassDetails } from 'src/app/model/ClassList';
import { ClassVO, VideoTimeTracking } from 'src/app/model/classVO';
import { ClassMaterialObject } from 'src/app/model/material-mapping-list';
import { AuthService } from 'src/app/services/auth.service';
import { ClassService } from 'src/app/services/Classes/class.service';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {
  date = new Date();
  classId!: number;
  assignments!: Material[];
  tests!: Material[];
  referenceMaterial!: Material[];
  classVOObj!: recordedClassDetails[];
  liveRecordings!: Material[];
  pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  updatedTime: number = 0;
  startFrom: number = 0;
  subscription!: Subscription[];
  subscriptionMap = new Map<number, Subscription>();
  apiMap = new Map<number, VideoTimeTracking>();
  filePath!: string;
  constructor(  private route: ActivatedRoute,
    private classService: ClassService,
    private loader: LoaderService) { }

  ngOnInit(): void {

    this.filePath=AuthService.getFilePath
    let classId = this.route.snapshot.paramMap.get('classId');
    if (classId) {
      this.classId = Number.parseInt(classId);
      let detail$ = this.classService.getRecordedClassesMaterial(
        this.classId
      );
      this.loader.showLoader(detail$).subscribe(
        (res:any) => {
          this.classVOObj=res.body;
        },
        (err) => {
        }
      );
    }
  }

  updateSeekBar(
    materialId: number,
    classMaterialObj: ClassMaterialObject,
    index: number
  ) {
    const video = document.getElementById(
      'liveClassVideo' + index.toString()
    ) as HTMLVideoElement;
    if (classMaterialObj.resumeTiming != null) {
      video.currentTime = classMaterialObj.resumeTiming.videoResumeTime;
      video.ontimeupdate = classMaterialObj.resumeTiming.videoResumeTime;
    }
  }
  saveVideoTimeDetails(
    materialId: number,
    classMaterialObj: ClassMaterialObject,
    index: number
  ) {
    let updatedTime: number = 0;
    const video = document.getElementById(
      'liveClassVideo' + index.toString()
    ) as HTMLVideoElement;
    const videoTimeTracking = new VideoTimeTracking();
    videoTimeTracking.materialId = materialId;
    videoTimeTracking.userId = +JSON.parse(localStorage.getItem('auth') as string).user_id;
    const $sub = interval(100).subscribe((value) => {
      videoTimeTracking.videoResumeTiming = updatedTime;
      videoTimeTracking.watchTime = (value * 100) / 1000;
    });
    this.apiMap.set(materialId, videoTimeTracking);
    this.subscriptionMap.set(materialId, $sub);
    video.ontimeupdate = (event) => {
      updatedTime = video.currentTime;
    };
  }

  ngOnDestroy(): void {
    this.apiMap.forEach((value: VideoTimeTracking) => {
      this.classService
        .saveVideoResumeTiming({
          userId: +JSON.parse(localStorage.getItem('auth') as string).user_id,
          materialId: value.materialId,
          videoResumeTiming: value.videoResumeTiming,
          watchTime: value.watchTime,
        })
        .subscribe(
          (data: any) => {
          },
          (error: any) => {
          }
        );
    });
    this.subscriptionMap.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
    //    this.watchedTimeSubscription.unsubscribe()
  }

  clearSubscription(materialId: number) {
    let videoTimeDetails = this.apiMap.get(materialId);
    this.classService
      .saveVideoResumeTiming({
        userId: +JSON.parse(localStorage.getItem('auth') as string).user_id,
        materialId: videoTimeDetails?.materialId,
        videoResumeTiming: videoTimeDetails?.videoResumeTiming,
        watchTime: videoTimeDetails?.watchTime,
      })
      .subscribe(
        (data: any) => {
        },
        (error: any) => {
        }
      );
    this.apiMap.delete(materialId);
    this.subscriptionMap.get(materialId)?.unsubscribe()
    // this.watchedTimeSubscription.unsubscribe()
  }

  @HostListener('window:beforeunload')
  beforeunloadHandler() {
    this.apiMap.forEach((value: VideoTimeTracking) => {
      this.classService
        .saveVideoResumeTiming({
          userId: +JSON.parse(localStorage.getItem('auth') as string).user_id,
          materialId: value.materialId,
          videoResumeTiming: value.videoResumeTiming,
          watchTime: value.watchTime,
        })
        .subscribe(
          (data: any) => {
          },
          (error: any) => {
          }
        );
    });
    this.subscriptionMap.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

}
