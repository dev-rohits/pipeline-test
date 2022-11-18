import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponse } from 'src/app/model/ApiResponse';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  fetchQuizById(quizId: any, studentId: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    const params = new HttpParams()
      .append('quizId', quizId)
      .append('studentId', studentId);
    return this.http.get(
      `${environment.apiEndpoint}/users/v1/api/fetchQuizById`,
      {
        headers: headers,
        params: params,
      }
    );
  }

  submitBy(quizId: number, page: number, size: number, name?: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    let params =
      name == undefined
        ? new HttpParams()
            .append('quizId', quizId)
            .append('page', page)
            .append('size', size)
        : new HttpParams()
            .append('quizId', quizId)
            .append('page', page)
            .append('size', size)
            .append('name', name);
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v1/api/quizSubmitBy`,
        {
          headers: headers,
          params: params,
        }
      )
      .pipe(map((res: ApiResponse) => res.body));
  }

  quizStartedOrEnded(data: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.post(
      `${environment.apiEndpoint}/users/v1/api/quizStartedOrEnded`,
      data,
      {
        headers: headers,
      }
    );
  }

  isQuizAttempted(userId: number, quizId: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.post(
      `${environment.apiEndpoint}/users/v1/api/isQuizAttempted/${userId}/${quizId}`,
      '',
      {
        headers: headers,
      }
    );
  }

  submitAnswers(
    quizId: number,
    userId: number,
    isSaved: boolean,
    feedBackComment: string,
    answers: any
  ) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.post(
      `${environment.apiEndpoint}/users/v1/api/submitAnswers/${quizId}/${userId}/${isSaved}/${feedBackComment}`,
      answers,
      { headers: headers }
    );
  }

  deleteStudentSubmittedAnswer(
    userId: number,
    quizId: number,
    questionId: number,
    answerId: number
  ) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.delete(
      `${environment.apiEndpoint}/users/v1/api/deleteStudentSubmittedAnswer/${userId}/${quizId}/${questionId}/${answerId}`,
      { headers: headers }
    );
  }
}
