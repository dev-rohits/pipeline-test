import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  catchError,
  throwError,
  tap,
  BehaviorSubject,
  map,
  shareReplay,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { UserFormVO } from '../common/add-user/add-user.component';
import { ApiResponse } from '../model/ApiResponse';
import { Auth } from '../model/Auth';
import { Menu } from '../model/Menu';
import { Profile } from '../model/Profile';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedInSubject = new BehaviorSubject<Boolean>(false);
  isLogin: boolean = false;
  static instituteId: any;
  nameSubject = new BehaviorSubject<string>('');
  profileImageSubject = new BehaviorSubject<string>('');
  statesSubject$ = new BehaviorSubject<{ id: number; stateName: string }[]>([]);
  nameSubjectObs$ = this.nameSubject.asObservable();
  profileImageSubjectObs$ = this.profileImageSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loggedInSubject.subscribe((value: any) => {
      this.isLogin = value;
    });
  }

  public static get getUserFirstName(): string {
    return JSON.parse(localStorage.getItem('auth') as string)?.first_name;
  }

  getAccessToken() {
    if (this.parseAuth()) {
      return this.parseAuth().access_token;
    }
    return null;
  }

  public static get getFilePath(): string {
    return localStorage.getItem('path') as string;
  }
  public static get getUserId(): number {
    return +JSON.parse(localStorage.getItem('auth') as string)?.user_id;
  }

  public static get getMobileNumber(): string {
    return JSON.parse(localStorage.getItem('auth') as string)?.mobile_number;
  }

  public static get getEmail(): number {
    return +JSON.parse(localStorage.getItem('auth') as string)?.email;
  }

  public static get getRoleType(): string {
    return JSON.parse(localStorage.getItem('auth') as string)?.role?.roleType;
  }

  public static get getModulePrefix(): string {
    const roleType = String(
      JSON.parse(localStorage.getItem('auth') as string)?.role?.roleType
    ).toLowerCase();
    return roleType == ('instituteadmin' || 'admin')
      ? 'admin'
      : roleType == 'teacher'
      ? 'teacher'
      : roleType == 'student'
      ? 'student'
      : 'master';
  }

  parseAuth() {
    if (localStorage.getItem('auth') && localStorage.getItem('auth') != null) {
      return JSON.parse(localStorage.getItem('auth') as string);
    }
    return null;
  }

  validLoginToken() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAccessToken()}`,
      loginToken: this.getSingleLoginValidateToken,
    });

    return this.http
      .get<Menu[]>(`${environment.apiEndpoint}/users/v1/api/user/login/valid`, {
        headers: headers,
      })
      .pipe(shareReplay());
  }

  getUserMenuBar(instituteId: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAccessToken()}`,
    });

    return this.http.get<Menu[]>(
      `${environment.apiEndpoint}/users/v1/api/fetchScreenMapping/${instituteId}`,
      { headers: headers }
    );
  }

  getUserRoles(userid: any, instituteid: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAccessToken()}`,
    });
    return (
      this.http
        .get(
          `${environment.apiEndpoint}/users/v1/api/getUserRoles/${userid}/${instituteid}`
        )
        .pipe(),
      { headers: headers }
    );
  }

  get getSingleLoginValidateToken(): string {
    return this.parseAuth()?.user_unique_login_token;
  }

  isLoggin() {
    let auth = localStorage.getItem('auth');
    if (auth) {
      return true;
    }
    return false;
  }

  logout() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAccessToken()}`,
    });
    return this.http.post(
      `${environment.apiEndpoint}/users/v2/api/logout`,
      '',
      {
        headers: headers,
      }
    );
  }

  updateUserOnlineStatus(online: boolean) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAccessToken()}`,
    });
    return this.http.post(
      `${environment.apiEndpoint}/chat/update/user/online/status`,
      { status: online },
      {
        headers: headers,
      }
    );
  }

  createUser(data: Profile, file1: File, file2: File) {
    const formdata: FormData = new FormData();
    formdata.append('userDetails', JSON.stringify(data));
    if (file1 !== undefined || file1 !== null) {
      formdata.append('profilePic', file1);
    }
    if (file2 !== undefined || file2 !== null) {
      formdata.append('teaserVideo', file2);
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAccessToken()}`,
    });
    return this.http
      .post<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/createUser`,
        formdata,
        { headers: headers }
      )
      .pipe(map((res) => res?.body));
  }

  addUser(data: UserFormVO, file: File) {
    const formdata: FormData = new FormData();
    formdata.append('userDetails', JSON.stringify(data));
    if (file !== undefined || file !== null) {
      formdata.append('profilePic', file);
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAccessToken()}`,
    });
    return this.http
      .post<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/addUser`,
        formdata,
        { headers: headers }
      )
      .pipe(map((res) => res.body));
  }

  editUser(data: UserFormVO, file: File) {
    const formdata: FormData = new FormData();
    formdata.append('userDetails', JSON.stringify(data));
    if (file !== undefined || file !== null) {
      formdata.append('profilePic', file);
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAccessToken()}`,
    });
    return this.http
      .post<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/editUser`,
        formdata,
        { headers: headers }
      )
      .pipe(map((res) => res.body));
  }

  disableUser(id: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAccessToken()}`,
    });
    return this.http.post(
      `${environment.apiEndpoint}/users/v2/api/deleteUser`,
      id,
      { headers: headers }
    );
  }

  getProfile() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAccessToken()}`,
    });
    return this.http
      .get<ApiResponse>(`${environment.apiEndpoint}/users/v2/api/getProfile`, {
        headers: headers,
      })
      .pipe(map((res) => res.body));
  }

  getUserProfile(id: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAccessToken()}`,
    });
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/getUserProfile?id=${id}`,
        {
          headers: headers,
        }
      )
      .pipe(map((res) => res.body));
  }

  getInstituteImage() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAccessToken()}`,
    });
    return this.http
      .get<ApiResponse>(
        `${
          environment.apiEndpoint
        }/users/v2/api/getInstituteImage?instituteId=${+AuthService.getInstituteId}`,
        {
          headers: headers,
        }
      )
      .pipe(map((res) => res.body));
  }

  verifyEmail(email: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAccessToken()}`,
    });
    return this.http.post(
      `${environment.apiEndpoint}/users/v2/api/verifyEmail`,
      email,
      { headers: headers }
    );
  }

  completeEmailVerification(id: string) {
    return this.http.post(
      `${environment.apiEndpoint}/users/v2/api/completeVerification`,
      id
    );
  }

  createTeacher(data: any) {
    return this.http.post(
      `${environment.apiEndpoint}/users/v1/api/addTeacher`,
      data
    );
  }

  checkOTP(data: any) {
    return this.http
      .post(`${environment.apiEndpoint}/users/v1/api/otp`, data)
      .pipe();
  }

  // resendOtp(email: string) {
  //   return this.http
  //     .post(`${environment.apiEndpoint}/users/v1/api/resendOtp`, {
  //       email: email,
  //     })
  //     .pipe();
  // }

  signInWithOtpSent(data: string) {
    return this.http.post(
      `${environment.apiEndpoint}/users/v2/api/mobileAuthentication`,
      {
        mobile: data,
      }
    );
  }

  resendOtp(data: string) {
    return this.http.post(`${environment.apiEndpoint}/users/v2/api/resendOtp`, {
      mobile: data,
    });
  }

  getMyIpAddress() {
    this.http
      .get<any>('https://geolocation-db.com/json/')
      .pipe(
        catchError((err) => {
          return throwError(err);
        }),
        tap((response: { IPv4: string }) => {
          localStorage.setItem('MY_IP', response.IPv4);
        })
      )
      .subscribe();
  }

  public static get getAccessToken(): string {
    return JSON.parse(localStorage.getItem('auth') || '{}')?.access_token;
  }

  public static get getBucketName(): string {
    return JSON.parse(localStorage.getItem('auth') || '{}').bucketName;
  }

  public static get username(): string {
    return JSON.parse(localStorage.getItem('auth') || '{}')?.first_name;
  }

  public static get email(): string {
    return JSON.parse(localStorage.getItem('auth') || '{}')?.email;
  }

  public static get mobileNumber(): string {
    return JSON.parse(localStorage.getItem('auth') || '{}')?.mobile_number;
  }
  public static get userId(): number {
    return JSON.parse(localStorage.getItem('auth') || '{}')?.user_id;
  }

  public static get isLogin(): boolean {
    return this.isLogin;
  }
  public static get getUserRoleName(): string {
    return JSON.parse(localStorage.getItem('auth') || '{}')?.role?.authority;
  }

  public static get getUserRoleType(): string {
    return JSON.parse(localStorage.getItem('auth') || '{}')?.role?.roleType;
  }

  public static get getUserName(): string {
    return JSON.parse(localStorage.getItem('auth') || '{}')?.first_name;
  }

  public static get getInstituteId(): string {
    return JSON.parse(localStorage.getItem('auth') || '{}')?.selectedInstitute;
  }

  login(username: string, password: string, withOtp: boolean) {
    this.getMyIpAddress();
    let httpParams = new HttpParams();
    httpParams = httpParams.set('grant_type', 'password');
    httpParams = httpParams.set('username', username);
    httpParams = httpParams.set('password', password);
    httpParams = httpParams.set('withotp', withOtp);
    let headers = {
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization:
        'Basic ' +
        btoa(
          '$2y$12$eUovJt3tV2DxfQEspaPxcucmYcPYPBGGojGoiI1vt4Oic3hfm62w6:$2y$12$QEK/vqmxWmO3ANBpH/5IQ.b1piR3dlk/NPn/ECvdiElK/yvOzStyq'
        ),
    };
    return this.http.post<Auth>(
      `${environment.apiEndpoint}/login`,
      httpParams.toString(),
      { headers: headers }
    );
  }

  enrollInstituesListRes() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/getUserInstitutes`,
        {
          headers: headers,
        }
      )
      .pipe(map((response: ApiResponse) => response.body));
  }
  forgotPassword(email: string) {
    return this.http.post(
      `${environment.apiEndpoint}/users/v1/api/forgotPassword?email=${email}`,
      ''
    );
  }

  assignStudentRole() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http.post(
      `${environment.apiEndpoint}/users/v2/api/student/assign/role`,
      '',
      { headers: headers }
    );
  }

  assignAdminRole() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${AuthService.getAccessToken}`,
    });
    return this.http
      .post(`${environment.apiEndpoint}/users/v2/api/admin/assign/role`, '', {
        headers: headers,
      })
      .pipe(map((res: ApiResponse) => res.body));
  }

  savePassword(data: any) {
    return this.http.post(
      `${environment.apiEndpoint}/users/v2/api/savePassword`,
      data
    );
  }

  confirmOtp(email: any, otp: any) {
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndpoint}/users/v2/api/confirmOtp?email=${email}&otp=${otp}`
      )
      .pipe(map((response: ApiResponse) => response.body));
  }
  getTeacherId(email: string) {
    return this.http.get(
      `${environment.apiEndpoint}/users/v1/api/getTeacherId?email=${email}`
    );
  }
}
