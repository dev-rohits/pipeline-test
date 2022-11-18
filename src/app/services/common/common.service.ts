import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { ApiResponse } from 'src/app/model/ApiResponse';
import { BlogsRes, BlogsVO } from 'src/app/model/BlogsVO';
import { CourseBatchMapVO } from 'src/app/model/CourseBatchMapVO';
import { ExpertVO } from 'src/app/model/ExpertVO';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  search(search: any) {
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/search/globalSearch?search=${search}`
      )
      .pipe(map((res) => res.body));
  }

  searchInstituteName(name: string) {
    return this.http.get<ApiResponse>(
      `${environment.apiEndpoint}/search/searchInstitutes?name=${name}`
    ).pipe(map((res:ApiResponse)=>res.body))
  }

  searchInstitutecategory(category: any) {
    return this.http.get<any>(
      `${environment.apiEndpoint}/search/searchInstitutes?category=${category}`
    );
  }

  searchInstitutelocation(location: any) {
    return this.http.get<any>(
      `${environment.apiEndpoint}/search/searchInstitutes?location=${location}`
    );
  }

  filterInstitute(instituteName: string, categoryId: number | undefined,page:number,size:number) {
    let params=new HttpParams().append("page",page).append("size",size)
    if(instituteName)
      params=params.append("name",instituteName)
    if(categoryId)
      params=params.append("categoryId",categoryId)
    return this.http.get<ApiResponse>(
      `${environment.apiEndpoint
      }/search/filterInstitutes`,
      {params:params}
    ).pipe(map((res:ApiResponse)=> res.body));
  }

  searchCourseName(CourseName: any) {
    return this.http
      .get<any>(
        `${environment.apiEndpoint}/search/searchCourses?name=${CourseName}`
      )
      .pipe(shareReplay());
  }

  fetchStatesAndCountries() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get<any>(`${environment.apiEndpoint}/users/v2/api/fetchStatesAndCountries`, {
        headers: headers,
      })
      .pipe(map((res) => res?.body));
  }

  getStates() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get<any>(
        `${environment.apiEndpoint}/users/v1/api/getStates`
        , { headers: headers })
      .pipe(map((res) => res?.body));
  }

  searchCourseCategory(categoryName: any) {
    return this.http
      .get<any>(
        `${environment.apiEndpoint}/search/searchCourses?category=${categoryName}`
      )
      .pipe(shareReplay());
  }

  searchCourseLocation(location: any) {
    return this.http
      .get<any>(
        `${environment.apiEndpoint}/search/searchCourses?location=${location}`
      )
      .pipe(shareReplay());
  }

  filterCourse(courseName: string, page: number, size: number, filterType: string, categoryId?: number) {
    let params = new HttpParams().append("filterType", filterType)
    if (categoryId)
      params = params.append("categoryId", categoryId);
    if (courseName)
      params = params.append('name', courseName)
    params = params.append('page', page).append('size', size)
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint
        }/search/filterCourses`, { params: params }
      )
      .pipe(map((res) => res?.body));
  }

  searchTeacherName(teacherName: any) {
    return this.http
      .get<any>(
        `${environment.apiEndpoint}/search/searchTeachers?name=${teacherName}`
      )
      .pipe(shareReplay());
  }

  searchTeacherCategory(categoryName: any) {
    return this.http
      .get<any>(
        `${environment.apiEndpoint}/search/searchTeachers?category=${categoryName}`
      )
      .pipe(shareReplay());
  }

  searchTeacherLocation(location: any) {
    return this.http
      .get<any>(
        `${environment.apiEndpoint}/search/searchTeachers?location=${location}`
      )
      .pipe(shareReplay());
  }

  filterTeacher(teacherName: string, categoryId: number | undefined, page: number, size: number) {
    let params = new HttpParams().append("page", page).append("size", size)
    if (teacherName)
      params = params.append("name", teacherName)
    if (categoryId)
      params = params.append("categoryId", categoryId)
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint
        }/search/filterTeachers`,
        {params:params}
      )
      .pipe(map((res: ApiResponse) => res.body));
  }

  saveInquiry(inquiryForm: any) {
    return this.http.post(
      `${environment.apiEndpoint}/users/v1/api/saveInquiry`,
      inquiryForm
    );
  }

  fetchBlogs() {
    return this.http
      .get<BlogsRes>(`${environment.apiEndpoint}/users/v1/api/fetchBlogsList`)
      .pipe(map((res: { body: any }) => res.body));
  }
  fetchBlogDetails(id: any) {
    return this.http.get<BlogsVO>(
      `${environment.apiEndpoint}/users/v1/api/fetchBlogDetails?id=${id}`
    );
  }

  fetchExperts() {
    return this.http.get<ExpertVO>(
      `${environment.apiEndpoint}/users/v2/api/fetchInstituteExpertsList`
    );
  }

  getBatchMapping(mappingForId: number, mappingType: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
      mappingType: mappingType,
    });
    let instituteId = AuthService.getInstituteId;
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/institute/` +
        instituteId +
        `/mappingForId/` +
        mappingForId +
        `/batch/mapping`,
        { headers: headers }
      )
      .pipe(map((res) => res?.body));
  }

  saveBatchMapping(
    mappingType: string,
    mappingForId: number,
    courseBatchMapVOList: CourseBatchMapVO[],
    teacherId: any
  ) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
      mappingType: mappingType,
    });

    let params = null;
    if (teacherId) {
      params = new HttpParams().append('teacherId', teacherId);
    } else {
      params = new HttpParams();
    }

    let instituteId = AuthService.getInstituteId;
    return this.http.post(
      `${environment.apiEndpoint}/users/v2/api/institute/` +
      instituteId +
      `/mappingForId/` +
      mappingForId +
      `/batch/mapping`,
      courseBatchMapVOList,
      { headers: headers, params: params }
    );
  }

  fetchTeachers(classId: number, mappingType: string, batchesId: number[]) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
      mappingType: mappingType,
    });
    let params = new HttpParams().append('batchesId', batchesId.join(','));
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/class/` +
        classId +
        `/common/teachers`,
        { headers: headers, params: params }
      )
      .pipe(map((res) => res?.body));
  }
}
