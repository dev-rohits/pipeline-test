import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CourseCategoryVO, FetchCategories } from 'src/app/model/categories.model';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  fetchCategoryList(page:number,size:number,searchParam:any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });

    return this.http
      .get<FetchCategories>(
        `${
          environment.apiEndpoint
        }/users/v2/api/fetchCourseCategoryList?size=${size}&page=${page}&searchParam=${searchParam}`,
        { headers: headers }
      );
  }


  updateFetatureCategory(id: any,type: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });
    return this.http.get(
      `${environment.apiEndpoint}/users/v2/api/updateFeatureField/${id}?type=${type}`,
      {
        headers: headers,
      }
    );
  }

  updatePrivate(id: any, type: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });
    return this.http.get(
      `${environment.apiEndpoint}/users/v2/api/updatePrivateField/${id}?type=${type}`,
      {
        headers: headers,
      }
    );
  }


  createCourseCategory(data:any,file: File) {
    const formdata: FormData = new FormData();
    formdata.append('courseCategoryVO', JSON.stringify(data));
    if (file !== undefined || file !== null) {
      formdata.append('categoryImage', file);
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });
    return this.http.post(
      `${environment.apiEndpoint}/users/v2/api/createCourseCategory`,
      formdata,
      {
        headers: headers,
      }
    );
  }

  
  createSubCourseCategory(data:CourseCategoryVO,file: any) {
    const formdata: FormData = new FormData();
    formdata.append('courseCategoryVO', JSON.stringify(data));
    if (file !== undefined || file !== null) {
      formdata.append('SubCategoryImage', file);
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });
    return this.http.post(
      `${environment.apiEndpoint}/users/v2/api/createSubCategory`,
      formdata,
      {
        headers: headers,
      }
    );
  }
  createSubSubCourseCategory(data:any,file: File) {
    const formdata: FormData = new FormData();
    formdata.append('courseCategoryVO', JSON.stringify(data));
    if (file !== undefined || file !== null) {
      formdata.append('categoryImage', file);
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });
    return this.http.post(
      `${environment.apiEndpoint}/users/v2/api/createSubSubCategory`,
      formdata,
      {
        headers: headers,
      }
    );
  }

  getSubCategories(categoryId:any,page:number,size:number,searchParam:any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });

    return this.http
      .get<FetchCategories>(
        `${
          environment.apiEndpoint
        }/users/v2/api/getSubCategories?categoryId=${categoryId}&size=${size}&page=${page}&searchParam=${searchParam}`,
        { headers: headers }
      );
  }

  getSubSubCategories(subCategoryId:number,page:number,size:number,searchParam:any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });

    return this.http
      .get<FetchCategories>(
        `${
          environment.apiEndpoint
        }/users/v2/api/getSubSubCategories?subCategoryId=${subCategoryId}&size=${size}&page=${page}&searchParam=${searchParam}`,
        { headers: headers }
      );
  }

  deleteCategory(id: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });
    return this.http.delete(
      `${environment.apiEndpoint}/users/v2/api/deleteCourseCategory?idCourseCategory=${id}`,
      {
        headers: headers,
      }
    );
  }

  deleteSubCategory(id: any, type: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });
    return this.http.delete(
      `${environment.apiEndpoint}/users/v2/api/deleteSubAndSubSubCategory?id=${id}&type=${type}`,
      {
        headers: headers,
      }
    );
  }


}
