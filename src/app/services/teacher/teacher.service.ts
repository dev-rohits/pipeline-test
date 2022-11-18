import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiResponse } from 'src/app/model/ApiResponse';
import { TeachersListRes } from 'src/app/model/feature-home-teacher.model';
import { FetchSubjectListForStudent } from 'src/app/model/fetchteacher.model';
import { InquiryFormVO } from 'src/app/model/InquiryFormVO';
import { MobileCoursesRes } from 'src/app/model/MobileCourseVO';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private http: HttpClient) {}

  saveInquiry(inquiryForm: InquiryFormVO) {
    return this.http.post(
      `${environment.apiEndpoint}/users/v2/api/saveInquiry`,
      inquiryForm
    );
  }

  fetchTeachersList() {
    return this.http
      .get<ApiResponse>(`${environment.apiEndpoint}/users/v2/api/fetchTeachers`)
      .pipe(map((res) => res.body));
  }

  fetchTeachersListWithPagination(pageNumber: number) {
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/fetchTeachers?page=${pageNumber}&size=10`
      )
      .pipe(map((res) => res.body));
  }

  getAllQuizes(batchId: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.get<ApiResponse>(
      `${environment.apiEndpoint}/users/v1/api/getAllQuizs/${batchId}`,
      {
        headers: headers,
      }
    );
  }

  fetchAllQuizes(batchId: number, page: number, size: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v1/api/getAllQuizs/${batchId}/${page}/${size}`,
        {
          headers: headers,
        }
      )
      .pipe(map((res) => res?.body));
  }

  fetchAllPendingQuizes(batchId: number, page: number, size: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v1/api/getAllPendingQuizs/${batchId}/${page}/${size}`,
        {
          headers: headers,
        }
      )
      .pipe(map((res) => res?.body));
  }

  updateDisplayOrder(displayOrder: string, id: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    let params = new HttpParams()
      .append('displayOrder', displayOrder.toString())
      .append('id', id.toString());
    return this.http
      .post<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/updateTeacherDisplayOrder`,
        '',
        {
          headers: headers,
          params: params,
        }
      )
      .pipe(map((res: ApiResponse) => res.body));
  }

  getTeacherDetails(id: number) {
    return this.http.get<any>(
      `${environment.apiEndpoint}/users/v2/api/fetchTeacherDetails?idTeacher=${id}`
    );
  }

  getTeacherCoures(id: number) {
    return this.http.get<any>(
      `${environment.apiEndpoint}/users/v2/api/fetchAllTeacherCourses?idTeacher=${id}`
    );
  }
  getCouresOfTeacher() {
    const instituteId = JSON.parse(
      localStorage.getItem('auth') as string
    ).selectedInstitute;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.get<any>(
      `${environment.apiEndpoint}/users/v2/api/fetchTeacherCourses?instituteId=${instituteId}`,
      { headers: headers }
    );
  }

  fetchSubjectListForStudent(batchid: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.get<FetchSubjectListForStudent>(
      `${environment.apiEndpoint}/users/v1/api/fetchSubjectListForStudent?idBatch=${batchid}`,
      {
        headers: headers,
      }
    );
  }
  getTeacherReviews(id: number) {
    return this.http.get<any>(
      `${environment.apiEndpoint}/users/v1/api/fetchTeacherReviewsAndRatings/${id}`
    );
  }

  savefeedback(form: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.post(
      `${environment.apiEndpoint}/users/v1/api/teacherReviewsAndRatings`,
      form,
      { headers: headers }
    );
  }

  getAllTeacherCourses() {
    return this.http
      .get<MobileCoursesRes>(
        `${environment.apiEndpoint}/users/v2/api/fetchTeacherCourses`
      )
      .pipe(map((res) => res.body));
  }
  fetchTeachersByInstituteId(instituteId: any) {
    return this.http.get<TeachersListRes>(
      `${environment.apiEndpoint}/users/v2/api/fetchTeachers?instituteId=${instituteId}`
    );
  }

  fetchTeacherList(name: string, idInstitution: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });

    return this.http.get(
      `${environment.apiEndpoint}/users/v1/api/fetchListOfTeachers/?name=${name}&idInstitute=${idInstitution}`,
      { headers: headers }
    );
  }
}
