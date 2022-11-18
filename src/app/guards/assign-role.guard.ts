import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { RolesService } from '../services/roles/roles.service';

@Injectable({
  providedIn: 'root',
})
export class AssignRoleGuard implements CanActivate, CanDeactivate<unknown> {
  constructor(private roleService: RolesService) {}
  canActivate(): Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.checkAccess(true))
    return this.checkAccess(true);
  }

  checkAccess(condition:boolean): Promise<boolean> {
    return new Promise((res) => {
      this.roleService.hasSignUpAccess().subscribe({
        next: (data: any) => {
          return res(condition);
        },
        error: (error: HttpErrorResponse) => {
          return res(condition);
        },
      });
    });
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAccess(false);
  }
}
