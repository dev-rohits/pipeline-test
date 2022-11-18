import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/ApiResponse';
import { Auth } from '../model/Auth';
import { QuizUpdate } from '../model/Quiz';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuizApiService {

  constructor(private http: HttpClient) { }

  saveQuiz(quiz: QuizUpdate, files: Map<string, File>) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    let data = new FormData();
    data.append('quiz', JSON.stringify(quiz));
    for (let [key, value] of files) {
      data.append('files', value, key)
    }
    return this.http
      .post<ApiResponse>(
        `${environment.apiEndpoint}/users/v1/api/addExam`,
        data,
        {
          headers: headers,
        }
      )
      .pipe(map((res: ApiResponse) => res.body));
  }

  fetchAllQuizes(page: number, size: number,searchString:string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    const params=new HttpParams().append('search',searchString)
    return this.http.get<ApiResponse>(`${environment.apiEndpoint}/users/v1/api/fetchAllQuizes/${AuthService.getInstituteId}/${page}/${size}`, { headers: headers,params:params })
      .pipe(map((response: ApiResponse) => response.body))
  }

  fetchQuiz(id: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.get<ApiResponse>(`${environment.apiEndpoint}/users/v1/api/fetchQuiz/${id}`, { headers: headers })
      .pipe(map((response: ApiResponse) => response.body))
  }

  deleteSection(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    const params = new HttpParams().append('sectionId', id);
    return this.http
      .delete(
        `${environment.apiEndpoint}/users/v1/api/deleteSection`,
        { headers: headers, params: params }
      )
  }

  deleteQuestion(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    const params = new HttpParams().append('questionId', id);
    return this.http
      .delete(
        `${environment.apiEndpoint}/users/v1/api/deleteQuestion`,
        { headers: headers, params: params }
      )
  }

  deleteOption(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    const params = new HttpParams().append('optionId', id);
    return this.http
      .delete(
        `${environment.apiEndpoint}/users/v1/api/deleteOption`,
        { headers: headers, params: params }
      )
  }

  deleteQuizImages(id: number, type: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    const params = new HttpParams().append('id', id).append('type', type);
    return this.http
      .delete(
        `${environment.apiEndpoint}/users/v1/api/deleteQuizImages`,
        { headers: headers, params: params }
      )
  }

  deleteQuiz(id:number){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.delete(`${environment.apiEndpoint}/users/v1/api/deleteQuiz/${id}`,{headers:headers})
  }


}
