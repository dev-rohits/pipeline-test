import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/ApiResponse';
import { CourseRes } from '../model/CourseVO';
import { PricingPlanVO } from '../model/PricingPlanVO';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PricingPlanService {
  constructor(private http: HttpClient) { }

  fetchPricingPlans(courseId: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    let params = new HttpParams()
      .append('courseId', courseId)
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/fetchCoursePricingPlans`,
        {
          headers: headers,
          params: params,
        }
      )
      .pipe(map((res) => res.body));
  }

  fetchPricingPlansForBatches(courseId: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    let params = new HttpParams()
      .append('courseId', courseId)
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/fetchCoursePricingPlansForBatches`,
        {
          headers: headers,
          params: params,
        }
      )
      .pipe(map((res) => res.body));
  }

  savePricingPlan(data: PricingPlanVO) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.post<ApiResponse>(
      `${environment.apiEndpoint}/users/v2/api/savePricingPlan`,
      data,
      {
        headers: headers,
      }
    ).pipe(map((res) => res.body));
  }

  fetchPricingPlan(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    let params = new HttpParams().append('id', id);
    return this.http.get<ApiResponse>(
      `${environment.apiEndpoint}/users/v2/api/fetchCoursePricingPlan`,
      {
        headers: headers,
        params: params,
      }
    ).pipe(map((res) => res.body));
  }

  updatePlanActiveFlag(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    let params = new HttpParams().append('id', id);
    return this.http.post<ApiResponse>(
      `${environment.apiEndpoint}/users/v2/api/updatePlanActiveFlag`, '',
      {
        headers: headers,
        params: params,
      }
    ).pipe(map((res) => res.body));
  }

  delete(id:number){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    let params = new HttpParams().append('id', id);
    return this.http.delete<ApiResponse>(
      `${environment.apiEndpoint}/users/v2/api/disablePricingPlan`,
      {
        headers: headers,
        params: params,
      }
    ).pipe(map((res) => res.body));
  }
}
