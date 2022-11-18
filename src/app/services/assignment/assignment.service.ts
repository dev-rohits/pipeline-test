import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiResponse } from 'src/app/model/ApiResponse';
import { assignmentVO, CompletedAssignmentList } from 'src/app/model/assignmentVO';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAssignments(size: number, page: number, searchParam: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });
    const instituteId = JSON.parse(
      localStorage.getItem('auth') as string
    ).selectedInstitute;
    return this.http.get<any>(
      `${environment.apiEndpoint}/users/v2/api/fetchAssignmentsToTeacher?instituteId=${instituteId}&size=${size}&page=${page}&searchParam=${searchParam}`,
      {
        headers: headers,
      }
    );
  }

  createAssignment(data: assignmentVO,file:any[]) {
    const formdata: FormData = new FormData();
    formdata.append('assignment', JSON.stringify(data));
    if (file.length > 0) {
         for(var i = 0; i< file.length; i++){
          formdata.append('file', file[i]);
         }
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });
    return this.http
      .post<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/createAssignment`,
        formdata,
        {
          headers: headers,
        }
      )
      .pipe(map((res) => res?.body));
  }

  // editAssignment(data: any) {
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${this.authService.getAccessToken()}`,
  //   });
  //   return this.http.post(
  //     `${environment.apiEndpoint}/users/v1/api/assignment`,
  //     data
  //   );
  // }

  fetchSubmittedAssignmentList(
    assignmentId: any,
    size: number,
    page: number,
    searchParam: string
  ) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });
    return this.http.get<any>(
      `${environment.apiEndpoint}/users/v2/api/fetchSubmittedAssignmentList?assignmentId=${assignmentId}&page=${page}&size=${size}&searchParam=${searchParam}`,
      {
        headers: headers,
      }
    );
  }

  evaluateAssignment(data: {
    assignmentId: string;
    idUser: string;
    grade: string;
    marks: string;
  }) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });
    return this.http.post(
      `${environment.apiEndpoint}/users/v2/api/evaluateAssignment`,
      data,
      { headers: headers }
    );
  }

  saveStudentAssignment(data: CompletedAssignmentList,file:any[]
  ) {
    const formdata: FormData = new FormData();
    formdata.append('studentAssignment', JSON.stringify(data));
    if (file.length > 0) {
         for(var i = 0; i< file.length; i++){
          formdata.append('files', file[i]);
         }
    }
const instituteId = JSON.parse(
      localStorage.getItem('auth') as string
    ).selectedInstitute;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });
    return this.http
      .post(
        `${environment.apiEndpoint}/users/v2/api/saveStudentAssignment?instituteId=${instituteId}`,
        formdata,
        {
          headers: headers,
        }
      );
      
  }

  requestForReevaluation(assignmentId: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });
    return this.http.post(
      `${environment.apiEndpoint}/users/v2/api/requestForAssignmentReevaluation?assignmentId=${assignmentId}`,
      '',
      { headers: headers }
    );
  }
}
