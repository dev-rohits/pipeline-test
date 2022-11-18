import { Injectable } from '@angular/core';
import { interval, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { MeetingInfo, SignatureModel } from 'src/app/model/MeetingInfo';
import { ZoomMtg } from '@zoomus/websdk';

@Injectable({
  providedIn: 'root',
})
export class ZoomService {
  private meetingInfo!: MeetingInfo;
  videobutton!: HTMLElement | null;
  audioButton!: HTMLElement | null;
  viewButton!: HTMLElement | null;
  constructor(private http: HttpClient, private authService: AuthService) {
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();

    // loads language files, also passes any error messages to the ui
    ZoomMtg.i18n.load('en-US');
    ZoomMtg.i18n.reload('en-US');

    ZoomMtg.setZoomJSLib('https://source.zoom.us/2.4.5/lib', '/av');
  }

  public set meeting(meetingInfo: MeetingInfo) {
    this.meetingInfo = meetingInfo;
  }

  getMeetingInfo(idClassSchedule: string, role?: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });

    let queryParams = new HttpParams();
    queryParams = queryParams.append('idClassSchedule', idClassSchedule);
    return this.http.get(
      `${environment.apiEndpoint}/users/v1/api/getMeetingDetails?Role=${role}`,
      {
        params: queryParams,
        headers: headers,
      }
    );
  }

  initializeWebSDK(zoomClient: MeetingInfo): void {
    ZoomMtg.init({
      leaveUrl: environment.leaveUrl,
      isSupportAV: true,
      disableInvite: true,
      success: (success: any) => {
        ZoomMtg.join({
          meetingNumber: String(zoomClient.meetingNumber),
          signature: zoomClient.signature as string,
          userName: zoomClient.userName, //zoomClient.userName as string,
          apiKey: environment.apiKey as string,
          userEmail: zoomClient.email, // zoomClient.email as string,
          passWord: zoomClient.passWord as string,
          success: (success: any) => {
            (
              (
                document.getElementsByClassName(
                  'meeting-info-icon__icon-wrap'
                ) as HTMLCollection
              )[0] as HTMLElement
            ).style.display = 'none';
            this.showAudioSelectOptions();
            this.showVideoSelectOptions();
            // this.showViewList()
          },
          error: (error: any) => {
            console.warn('Hey error ');
          },
        });
      },
      error: (error: any) => {},
    });
  }

  // showViewList(){
  //   interval(2000).pipe().subscribe((data:any)=>{
  //     this.viewButton=(document.getElementsByClassName("full-screen-widget__button") as HTMLCollection)[0] as HTMLElement
  //   })
  // }

  showVideoSelectOptions() {
    interval(2000)
      .pipe()
      .subscribe((data: any) => {
        this.videobutton = document.getElementById('videoOptionMenu');
        if (
          this.videobutton &&
          this.videobutton.getAttribute('videolistener') == null
        ) {
          this.videobutton.setAttribute('videolistener', 'true');
          this.videobutton.addEventListener('click', () => {
            const ul = (
              document.getElementsByClassName(
                'video-option-menu__pop-menu'
              ) as HTMLCollection
            )[0] as HTMLElement;
            ul.style.display = ul.style.display == 'block' ? 'none' : 'block';
          });
        }
      });
  }

  showAudioSelectOptions() {
    interval(2000)
      .pipe()
      .subscribe((data: any) => {
        this.audioButton = document.getElementById('audioOptionMenu');
        if (
          this.audioButton &&
          this.audioButton.getAttribute('audiolistener') == null
        ) {
          this.audioButton.setAttribute('audiolistener', 'true');
          this.audioButton.addEventListener('click', () => {
            const ul = (
              document.getElementsByClassName(
                'audio-option-menu__pop-menu'
              ) as HTMLCollection
            )[0] as HTMLElement;
            ul.style.display = ul.style.display == 'block' ? 'none' : 'block';
          });
        }
      });
  }

  genrateSignature(signatureModel: SignatureModel): Observable<string> {
    // alert(this.meetingInfo.meetingNumber);
    let signature = ZoomMtg.generateSignature({
      meetingNumber: String(this.meetingInfo.meetingNumber),
      apiKey: signatureModel.apiKey as string,
      apiSecret: signatureModel.apiSecret as string,
      role: signatureModel.role as string,
    });
    return of(signature);
  }
}
