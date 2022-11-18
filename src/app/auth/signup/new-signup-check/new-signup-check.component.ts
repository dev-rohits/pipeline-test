import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstituteRoles } from 'src/app/enums/InstituteRoles';
import { LoaderService } from 'src/app/loader.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-signup-check',
  templateUrl: './new-signup-check.component.html',
  styleUrls: ['./new-signup-check.component.scss'],
})
export class NewSignupCheckComponent implements OnInit {
  role: string = '';
  class1: string = 'non-active';
  class2: string = 'non-active';

  constructor(
    private authService: AuthService,
    private router: Router,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {}

  setActiveClass(val: number) {
    if (val == 1) {
      this.class1 = 'active';
      this.class2 = 'non-active';
    } else {
      this.class2 = 'active';
      this.class1 = 'non-active';
    }
  }

  checkRole() {
    if (this.role == 'student') {
      this.assignStudentRole();
      return;
    }
    this.assignAdminRole();
  }

  assignStudentRole() {
    this.loader.loadingOn();
    if (!JSON.parse(localStorage.getItem('auth') || '{}').isProfileCompleted) {
      this.authService.assignStudentRole().subscribe(
        (res) => {
          this.loader.loadingOff();
          var auth = JSON.parse(localStorage.getItem('auth') || '{}');
          var role = { authority: 'Student', roleType: InstituteRoles.Student };
          auth.role = role;
          auth.selectedInstitute = 1;
          localStorage.setItem('auth', JSON.stringify(auth));
          this.router.navigate(['/auth/profile'], {
            queryParams: { type: 'student' },
          });
        },
        (err) => {
          this.loader.loadingOff();
          Swal.fire('Something went wrong!', 'Internal Server Error', 'error');
        }
      );
    }
  }

  assignAdminRole() {
    this.loader.loadingOn();
    if (!JSON.parse(localStorage.getItem('auth') || '{}').isProfileCompleted) {
      this.authService.assignAdminRole().subscribe(
        (res) => {
          this.loader.loadingOff();
          var auth = JSON.parse(localStorage.getItem('auth') || '{}');
          var role = {
            authority: InstituteRoles.InstituteAdmin,
            roleType: InstituteRoles.InstituteAdmin,
          };
          auth.role = role;
          auth.selectedInstitute = res;
          localStorage.setItem('auth', JSON.stringify(auth));
          this.router.navigate(['/auth/profile'], {
            queryParams: { type: 'admin' },
          });
        },
        (err) => {
          this.loader.loadingOff();
          Swal.fire('Something went wrong!', 'Internal Server Error', 'error');
        }
      );
    }
  }
}
