import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiResponse } from 'src/app/model/ApiResponse';
import { Roles } from 'src/app/model/Roles';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  authService: any;
  constructor(private http: HttpClient) { }

  fetchCourseDetails() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/fetchRolesOfInstitute/${AuthService.getInstituteId}`,
        { headers: headers }
      )
      .pipe(map((res) => res.body));
  }

  addRole(role: Roles) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .post<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/addRole/${AuthService.getInstituteId}`, role,
        { headers: headers }
      )
      .pipe(map((res) => res.body));
  }

  fetchScreenMapping(roleId: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/fetchScreens/${roleId}`,
        { headers: headers }
      )
      .pipe(map((res) => res.body));
  }

  saveScreenMapping(roleId: number, screenMappingIds: number[]) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    const params = new HttpParams().append("screenIds", screenMappingIds.toString())
    return this.http
      .post<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/saveScreenMapping/${roleId}`, '',
        {
          headers: headers,
          params: params
        }
      )
      .pipe(map((res) => res.body));
  }

  delete(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .delete<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/deleteRole/${id}`,
        {
          headers: headers,
        }
      )
      .pipe(map((res) => res.body));
  }

  hasSignUpAccess(){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .post<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/hasSignUpAccess`,'',
        {
          headers: headers,
        }
      )
      .pipe(map((res) => res.body));
  }


}
