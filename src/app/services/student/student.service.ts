import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiResponse } from 'src/app/model/ApiResponse';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  getCouresOfStudent() {
    const instituteId = JSON.parse(
      localStorage.getItem('auth') as string
    ).selectedInstitute;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.get<any>(
      `${environment.apiEndpoint}/users/v2/api/fetchStudentCourses?instituteId=${instituteId}`,
      { headers: headers }
    );
  }

  fetchAssignments(batchId: any, pageSize: any, pageNumber: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.get<any>(
      `${environment.apiEndpoint}/users/v2/api/fetchTeacherAssignmentsOfBatch?batchId=${batchId}&size=${pageSize}&page=${pageNumber}`,
      { headers: headers }
    );
  }

  fetchAssignmentsToStudent(batchId: any, size: any, page: any, type: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.get<any>(
      `${environment.apiEndpoint}/users/v2/api/fetchStudentAssignmentsOfBatch?batchId=${batchId}&size=${size}&page=${page}&type=${type}`,
      { headers: headers }
    );
  }

  fetchStudentDashboardDetails(instituteId: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.get<any>(
      `${environment.apiEndpoint}/users/v2/api/fetchStudentDashboardDetails?instituteId=${instituteId}`,
      { headers: headers }
    );
  }

  fetchBatchMaterial(batchId: any, page: number, size: any, searchParam: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.get<any>(
      `${environment.apiEndpoint}/users/v2/api/fetchBatchMaterial?batchId=${batchId}&page=${page}&size=${size}&searchParam=${searchParam}`,
      { headers: headers }
    );
  }

  saveVideoResumeTiming(data: {
    userId: number;
    materialId: number;
    videoResumeTiming: number;
    watchTime: number;
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

  fetchQuizResultById(quizId: number, studentId: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });
    const params = new HttpParams()
      .append('quizId', quizId)
      .append('studentId', studentId);
    return this.http
      .get<any>(`${environment.apiEndpoint}/users/v1/api/fetchQuizResultById`, {
        headers: headers,
        params: params,
      })
      .pipe(map((res) => res?.data));
  }

  getFeedBackComment(quizId: number, userId: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });
    return this.http.get(
      `${environment.apiEndpoint}/users/v1/api/getFeedback/${userId}/${quizId}`,
      {
        headers: headers,
      }
    );
  }
}
