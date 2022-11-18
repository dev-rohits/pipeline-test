import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/ApiResponse';
import { BatchVO } from '../model/BatchVO';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BatchService {
  constructor(private http: HttpClient) { }

  fetchBatches(courseId: number) {
    let params = new HttpParams()
      .append('courseId', courseId)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/fetchBatches`,
        { headers: headers, params: params }
      )
      .pipe(map((res) => res.body));
  }

  fetchBatch(batchId: number) {
    let params = new HttpParams()
      .append('id', batchId)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/fetchBatch`,
        { headers: headers, params: params }
      )
      .pipe(map((res) => res.body));
  }

  createBatch(batch: BatchVO) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .post<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/createBatch`,
        batch,
        { headers: headers }
      )
      .pipe(map((res) => res.body));
  }

  fetchTeacherForBatchMapping() {
    let params = new HttpParams().append('instituteId', AuthService.getInstituteId)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.get<ApiResponse>(
      `${environment.apiEndpoint}/users/v2/api/fetchTeachersForCourseMapping`,
      {
        headers: headers,
        params: params
      }
    ).pipe(map((res) => res.body));
  }

  disableBatch(id: number) {
    let params = new HttpParams().append('id', id)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.delete<ApiResponse>(
      `${environment.apiEndpoint}/users/v2/api/disableBatch`,
      {
        headers: headers,
        params: params
      }
    ).pipe(map((res) => res.body));
  }
}
