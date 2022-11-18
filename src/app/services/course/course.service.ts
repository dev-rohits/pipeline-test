import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiResponse } from 'src/app/model/ApiResponse';
import { Auth } from 'src/app/model/Auth';
import { BatchRes } from 'src/app/model/BatchVO';
import { FetchCategories } from 'src/app/model/categories.model';
import { Course } from 'src/app/model/Course';
import { CourseReviewsAndRatingsRes } from 'src/app/model/CourseReviewsAndRatingsVO';
import { CourseRes, CourseVO } from 'src/app/model/CourseVO';
import { DemoClassRes } from 'src/app/model/DemoClass';
import { MobileCoursesRes } from 'src/app/model/MobileCourseVO';
import { PricingPlanRes } from 'src/app/model/PricingPlanVO';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) { }

  fetchCourseDetails(idCourse: number) {
    return this.http
      .get<CourseRes>(
        `${environment.apiEndpoint}/users/v2/api/fetchCourseDetails?idCourse=${idCourse}`
      )
      .pipe(map((res) => res.body));
  }

  fetchPricingPlan(idCourse: number) {
    return this.http
      .get<PricingPlanRes>(
        `${environment.apiEndpoint}/users/v2/api/fetchPricingPlan?idCourse=${idCourse}`
      )
      .pipe(map((res) => res.body));
  }

  fetchRecommendedCourses(idCourse: number) {
    return this.http
      .get<MobileCoursesRes>(
        `${environment.apiEndpoint}/users/v2/api/fetchRecommendedCourses?idCourse=${idCourse}`
      )
      .pipe(map((res) => res.body));
  }

  fetchDemoClasses(idCourse: number) {
    if (AuthService.getAccessToken == undefined) {
      return this.http
        .get<DemoClassRes>(
          `${environment.apiEndpoint}/users/v2/api/demoClassesbyCourseId?idCourse=${idCourse}`
        )
        .pipe(map((res) => res.body));
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get<DemoClassRes>(
        `${environment.apiEndpoint}/users/v2/api/demoClassesbyCourseId?idCourse=${idCourse}`,
        { headers: headers }
      )
      .pipe(map((res) => res.body));
  }

  fetchWebinars() {
    // if (AuthService.getAccessToken == undefined) {
    return this.http
      .get<DemoClassRes>(
        `${environment.apiEndpoint}/users/v2/api/fetchWebinars`
      )
      .pipe(map((res) => res.body));
    // }
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${AuthService.getAccessToken}`,
    // });
    // return this.http
    //   .get<DemoClassRes>(
    //     `${environment.apiEndpoint}/users/v2/api/fetchWebinars`,
    //     { headers: headers }
    //   )
    //   .pipe(map((res) => res.body));
  }

  fetchRelatedCourses(idCourse: number) {
    return this.http
      .get<MobileCoursesRes>(
        `${environment.apiEndpoint}/users/v2/api/fetchRelatedCourses?idCourse=${idCourse}`
      )
      .pipe(map((res) => res.body));
  }

  fetchCourseReviewsAndRatings(idCourse: number) {
    return this.http
      .get<CourseReviewsAndRatingsRes>(
        `${environment.apiEndpoint}/users/v2/api/getCourseReviewsAndRatings?idCourse=${idCourse}`
      )
      .pipe(map((res) => res.body));
  }

  fetchBatches(idPricingPlan: number) {
    return this.http
      .get<BatchRes>(
        `${environment.apiEndpoint}/users/v2/api/getBatches?idPricingPlan=${idPricingPlan}`
      )
      .pipe(map((res) => res.body));
  }

  bookDemoClass(data: {
    classId: number;
    courseName: string;
    description: string;
  }) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .post<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/requestDemoClass`,
        data,
        { headers: headers }
      )
      .pipe(map((res) => res.body));
  }

  fetchFeatureCategoryList(isFeatured: boolean) {
    return this.http
      .get<FetchCategories>(
        `${environment.apiEndpoint
        }/users/v1/api/fetchCourseCategoryList?ipAddress=${localStorage.getItem(
          'MY_IP'
        )}&isFeature=${isFeatured}`
      )
      .pipe(map((res) => res.data.courseCategoryVO));
  }

  getSubCategories(category: number, isFeature: boolean) {
    return this.http
      .get<FetchCategories>(
        `${environment.apiEndpoint
        }/users/v1/api/getSubCategories?ipAddress=${localStorage.getItem(
          'MY_IP'
        )}&categoryId=${category}&isFeature=${isFeature}`
      )
      .pipe(map((res) => res.data));
  }

  getSubSubCategories(subCategoryId: number, isFeature: boolean) {
    return this.http
      .get<FetchCategories>(
        `${environment.apiEndpoint
        }/users/v1/api/getSubSubCategories?ipAddress=${localStorage.getItem(
          'MY_IP'
        )}&subCategoryId=${subCategoryId}&isFeature=${isFeature}`
      )
      .pipe(map((res) => res.data));
  }

  fetchCategoryCourses(categoryId: number, subSubCategoryId: number, name: string, page: number, size: number) {
    let params = new HttpParams().append("page", page).append("size", size)
    if (categoryId) params = params.append('categoryId', categoryId)
    if (subSubCategoryId) params = params.append('subSubCategoryId', subSubCategoryId)
    if (name) params = params.append('name', name)
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/fetchCoursesByCategory`
        ,
        { params: params }
      )
      .pipe(map((res:ApiResponse) => res.body));
  }

  fetchTwoNewCourses(page: number) {
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v1/api/getNewestCourses?pageNumber=${page}`
      )
      .pipe(map((res) => res.body.courses));
  }

  fetchFreeCourses() {
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v1/api/getFreeCourses`
      )
      .pipe(map((res) => res.body.courses));
  }

  fetchFreeCoursesWithPagination(pageNumber: number) {
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v1/api/getFreeCourses?pageNumber=${pageNumber}`
      )
      .pipe(map((res) => res.body));
  }

  fetchNewCourses() {
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v1/api/getNewestCourses`
      )
      .pipe(map((res) => res.body.courses));
  }

  fetchNewCoursesWithPagination(pageNumber: number) {
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v1/api/getNewestCourses?pageNumber=${pageNumber}`
      )
      .pipe(map((res) => res.body));
  }

  fetchTrendingCourses() {
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v1/api/getMostSellingCourses`
      )
      .pipe(map((res) => res.body.courses));
  }

  fetchTrendingCoursesWithPagination(pageNumber: number) {
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v1/api/getMostSellingCourses?pageNumber=${pageNumber}`
      )
      .pipe(map((res) => res.body));
  }

  fetchPopularCourses() {
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v1/api/getMostRatedCourses`
      )
      .pipe(map((res) => res.body.courses));
  }

  fetchPopularCoursesWithPagination(pageNumber: number) {
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v1/api/getMostRatedCourses?pageNumber=${pageNumber}`
      )
      .pipe(map((res) => res.body));
  }

  fetchAllCoursesWithPagination(pageNumber: Number) {
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint
        }/users/v2/api/fetchAllCourses?page=${pageNumber}&size=${9}`
      )
      .pipe(map((res) => res.body));
  }

  saveStudentFeedback(form: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.post(
      `${environment.apiEndpoint}/users/v1/api/courseReviewsAndRatings`,
      form,
      { headers: headers }
    );
  }

  contactUs(inquiryForm: any) {
    return this.http.post(
      `${environment.apiEndpoint}/users/v2/api/contactUs`,
      inquiryForm
    );
  }

  searchCourse(courseName: string) {
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/searchCourses?name=${courseName}`
      )
      .pipe(map((res: ApiResponse) => res.body));
  }

  fetchTeachersForCourseMapping() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/fetchTeachersForCourseMapping`,
        {
          headers: headers,
          params: new HttpParams().append(
            'instituteId',
            AuthService.getInstituteId
          ),
        }
      )
      .pipe(map((res: ApiResponse) => res.body));
  }

  fetchCourses(page: number, size: number, name?: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    let params = name == undefined ?
      new HttpParams()
        .append('instituteId', AuthService.getInstituteId)
        .append('page', page)
        .append('size', size)
      :
      new HttpParams()
        .append('instituteId', AuthService.getInstituteId)
        .append('page', page)
        .append('size', size).append('name', name)
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/fetchCourses`,
        {
          headers: headers,
          params: params,
        }
      )
      .pipe(map((res: ApiResponse) => res.body));
  }

  createCourse(course: Course, image: File, video: File) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    let data = new FormData();
    data.append('course', JSON.stringify(course));
    if (image) data.append("image", image);
    if (video) data.append('video', video);
    return this.http
      .post<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/createCourse`,
        data,
        {
          headers: headers,
        }
      )
      .pipe(map((res: ApiResponse) => res.body));
  }

  fetchCourse(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    let params = new HttpParams().append('courseId', id);
    return this.http
      .get<ApiResponse>(`${environment.apiEndpoint}/users/v2/api/fetchCourse`, {
        headers: headers,
        params: params,
      })
      .pipe(map((res: ApiResponse) => res.body));
  }

  fetchCategories() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/fetchCategories`,
        {
          headers: headers,
        }
      )
      .pipe(map((res: ApiResponse) => res.body));
  }

  fetchSubCategories(id: string[]) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    let params = new HttpParams().append('ids', id.toString());
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/fetchSubCategories`,
        {
          headers: headers,
          params: params,
        }
      )
      .pipe(map((res: ApiResponse) => res.body));
  }

  fetchSubSubCategories(id: string[]) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    let params = new HttpParams().append('ids', id.toString());
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/fetchSubSubCategories`,
        {
          headers: headers,
          params: params,
        }
      )
      .pipe(map((res: ApiResponse) => res.body));
  }

  updateDisplayOrder(displayOrder: string, id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    let params = new HttpParams()
      .append('displayOrder', displayOrder.toString())
      .append('id', id.toString());
    return this.http
      .post<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/updateDisplayOrder`,
        '',
        {
          headers: headers,
          params: params,
        }
      )
      .pipe(map((res: ApiResponse) => res.body));
  }

  fetchMostDisplayOrder() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    let params = new HttpParams().append(
      'instituteId',
      AuthService.getInstituteId
    );
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/fetchMostDisplayOrder`,
        {
          headers: headers,
          params: params,
        }
      )
      .pipe(map((res: ApiResponse) => res.body));
  }

  updateFeaturedFlag(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    let params = new HttpParams().append(
      'id',
      id
    );
    return this.http
      .post<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/updateFeaturedFlag`, '',
        {
          headers: headers,
          params: params,
        }
      )
      .pipe(map((res: ApiResponse) => res.body));
  }

  fetchCourseBatches(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/fetchBatches/${id}`,
        {
          headers: headers,
        }
      )
      .pipe(map((res: ApiResponse) => res.body));
  }

  fetchEnrolledStudents(courseId: number, page: number, size: number, batchId?: number, search?: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    let params = new HttpParams().append(
      'courseId',
      courseId
    );
    if (batchId)
      params = params.append("batchId", batchId)
    if (search)
      params = params.append("search", search)
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/fetchCourseStudents/${page}/${size}`,
        {
          headers: headers,
          params: params
        }
      )
      .pipe(map((res: ApiResponse) => res.body));
  }

  unenroll(idStudentEnrollment: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.delete(
      `${environment.apiEndpoint}/users/v1/api/deleteStudentEnrollment?idStudentEnrollment=${idStudentEnrollment}`,
      { headers: headers }
    );
  }

  deleteCourse(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.delete<ApiResponse>(
      `${environment.apiEndpoint}/users/v2/api/deleteCourse/${id}`,
      { headers: headers }
    ).pipe(
      map((res: ApiResponse) => { res.body })
    )
  }

  offlineEnrollmentApplicationRequest(batchId:number,pricingplanId:number){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.post<ApiResponse>(
      `${environment.apiEndpoint}/users/v2/api/offlineEnrollmentApplication`,
      {
        batchId:batchId,
        pricingPlanId:pricingplanId
      },
      { headers: headers }
    )
  }
}
