import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { InstituteRoles } from 'src/app/enums/InstituteRoles';
import { LoaderService } from 'src/app/loader.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output('desktopHamburgerClick')
  desktopHamburgerClick: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  emitValue: boolean = false;
  scrHeight!: number;
  userName: any;
  instituteImageSrc: string = '';
  imgSrc: string = '';
  hasImage: boolean = false;
  hidesidebar!: boolean;

  constructor(
    public authService: AuthService,
    private router: Router,
    private loader: LoaderService
  ) {
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.instituteImageSrc = '../../../assets/svg/logo.svg';
    var auth = JSON.parse(localStorage.getItem('auth') as string);

    this.authService.getInstituteImage().subscribe({
      next: (res) => {
        res ? (this.instituteImageSrc = res) : this.instituteImageSrc;
      },
      error: (err) => {},
    });

    this.authService.getUserProfile('').subscribe(
      (res: any) => {
        this.imgSrc = res.userImagePath;
        this.userName = res.name ? res.name : auth.mobile_number;
        this.authService.nameSubject.next(
          res.name ? res.name : auth.mobile_number
        );
        this.authService.profileImageSubject.next(res.userImagePath);
        this.imgSrc?.length > 0
          ? (this.hasImage = true)
          : (this.hasImage = false);
      },
      (err: any) => {}
    );
  }
  openslider() {
    this.emitValue = !this.emitValue;

    this.desktopHamburgerClick.emit(this.emitValue);
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.scrHeight = window.innerHeight;

    if (window.innerWidth <= 900) {
      this.emitValue = true; //md
      this.hidesidebar = true;
    } else {
      this.emitValue = false;
      this.hidesidebar = false;
    }
  }
  scrWidth(scrHeight: number, scrWidth: any) {
    throw new Error('Method not implemented.');
  }

  openProfile() {
    JSON.parse(localStorage.getItem('auth') || '{}').role.authority ===
      InstituteRoles.Admin ||
    JSON.parse(localStorage.getItem('auth') || '{}').role.authority ===
      InstituteRoles.InstituteAdmin
      ? this.router.navigateByUrl('/admin/profile')
      : JSON.parse(localStorage.getItem('auth') || '{}').role.authority ===
        InstituteRoles.Teacher
      ? this.router.navigateByUrl('/teacher/profile')
      : this.router.navigateByUrl('/student/profile');
  }

  logout() {
    this.loader.loadingOn();
    this.authService.logout().subscribe({
      next: (data: any) => {
        localStorage.clear();
        this.loader.loadingOff();
        this.router.navigateByUrl('/auth/login');
      },
      error: (error: HttpErrorResponse) => {
        this.loader.loadingOff();
        Swal.fire('Error', 'Error While Logout', 'error');
      },
    });
    // this.router.navigate(['/marketing/home']);
  }
}
