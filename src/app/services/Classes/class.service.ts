import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ClassDetailRootObject } from 'src/app/model/ClassList';
import { classData, ClassRes } from 'src/app/model/classVO';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  fetchLiveClasses(batchId: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get<ClassRes>(
        `${environment.apiEndpoint}/users/v2/api/liveClasses?batchId=${batchId}&size=${10}&page=${0}`,
        { headers: headers }
      ).pipe(map((res) => res.body));
  }

  fetchTeacherLiveDemoClasses(batchId: any, size: number,
    page: number,
    searchParam: any, instituteId: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get<ClassRes>(
        `${environment.apiEndpoint}/users/v2/api/teacherLiveDemoClassesOfBatch?batchId=${batchId}&size=${size}&page=${page}&searchParam=${searchParam}&instituteId=${instituteId}`,
        { headers: headers }
      ).pipe(map((res) => res.body));
  }

  fetchLiveWebinarsOfBatch(batchId: number, size: number,
    page: number,
    searchParam: any, instituteId: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get<ClassRes>(
        `${environment.apiEndpoint}/users/v2/api/liveWebinarsOfBatch?batchId=${batchId}&size=${size}&page=${page}&searchParam=${searchParam}&instituteId=${instituteId}`,
        { headers: headers }
      ).pipe(map((res) => res.body));
  }

  fetchFutureWebinarsOfBatch(batchId: number, size: number,
    page: number,
    searchParam: any, instituteId: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get<ClassRes>(
        `${environment.apiEndpoint}/users/v2/api/futureWebinarsOfBatch?batchId=${batchId}&size=${size}&page=${page}&searchParam=${searchParam}&instituteId=${instituteId}`,
        { headers: headers }
      ).pipe(map((res) => res.body));
  }

  fetchAllFutureWebinars(size: number,
    page: number,
    searchParam: any,instituteId:any){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get<ClassRes>(
        `${environment.apiEndpoint}/users/v2/api/fetchAllFutureWebinars?size=${size}&page=${page}&searchParam=${searchParam}&instituteId=${instituteId}`,
        {headers: headers }
      ).pipe(map((res) => res.body));
  }

  fetchAllLiveWebinars(size: number,
    page: number,
    searchParam: any,instituteId:any){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get<ClassRes>(
        `${environment.apiEndpoint}/users/v2/api/fetchAllLiveWebinars?size=${size}&page=${page}&searchParam=${searchParam}&instituteId=${instituteId}`,
        {headers: headers }
      ).pipe(map((res) => res.body));
  }

  fetchLiveClassesOfBatch(batchId:number,pageSize:any,pageNumber:any,instituteId:any){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get<ClassRes>(
        `${environment.apiEndpoint}/users/v2/api/liveClassesOfBatch?batchId=${batchId}&page=${pageNumber}&size=${pageSize}&instituteId=${instituteId}`,
        { headers: headers }
      ).pipe(map((res) => res.body));
  }

  fetchFutureClassesOfBatch(batchId: number, pageSize: any, pageNumber: any, instituteId: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get<ClassRes>(
        `${environment.apiEndpoint}/users/v2/api/futureClassesOfBatch?batchId=${batchId}&page=${pageNumber}&size=${pageSize}&instituteId=${instituteId}`,
        { headers: headers }
      ).pipe(map((res) => res.body));
  }

  fetchTeacherFutureDemoClasses(batchId: any, size: number,
    page: number,
    searchParam: any, instituteId: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get<classData>(
        `${environment.apiEndpoint}/users/v2/api/teacherFutureDemoClassesOfBatch?batchId=${batchId}&size=${size}&page=${page}&searchParam=${searchParam}&instituteId=${instituteId}`,
        { headers: headers }
      ).pipe(map((res) => res.body));
  }

  getRecordedClassesMaterial(classId: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });
    return this.http
      .get<any>(
        `${environment.apiEndpoint}/users/v2/api/getRecordedClassesMaterial?classId=${classId}`,
        {
          headers: headers,
        }
      );


  }
  fetchFutureClasses(batchId: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get<ClassRes>(
        `${environment.apiEndpoint}/users/v2/api/futureClasses?batchId=${batchId}&size=${10}&page=${0}`,
        { headers: headers }
      ).pipe(map((res) => res.body));
  }

  fetchRecordedClasses(batchId: any, pageSize: any, pageNumber: any, instituteId: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get<classData>(
        `${environment.apiEndpoint}/users/v2/api/recordedClasses?batchId=${batchId}&pageSize=${pageSize}&pageNumber=${pageNumber}&instituteId=${instituteId}`,
        { headers: headers }
      ).pipe(map((res) => res.body));
  }

  saveVideoResumeTiming(data: {
    userId?: number;
    materialId?: number;
    videoResumeTiming?: number;
    watchTime?: number;
  }) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });
    return this.http.post(
      `${environment.apiEndpoint}/users/v1/api/saveVideoResumeTime`,
      data,
      {
        headers: headers,
      }
    );
  }

  redirectToZoom(classScheduleId: number) {
    window.open(`${environment.zoomUrl}/meeting` + '?' + classScheduleId.toString() + '&' + AuthService.getInstituteId + '&' + AuthService.getAccessToken)
  }
}
