import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Role } from 'aws-sdk/clients/glue';
import { InstituteRoles } from 'src/app/enums/InstituteRoles';
import { LoaderService } from 'src/app/loader.service';
import { Roles } from 'src/app/model/Roles';
import { RolesService } from 'src/app/services/roles/roles.service';
import Swal from 'sweetalert2';
import { AddEditRolesComponent } from '../add-edit-roles/add-edit-roles.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  roles: Roles[] = []
  constructor(public dialog: MatDialog, private role: RolesService, private router: Router, private loader: LoaderService) { }

  ngOnInit(): void {
    this.loader.showLoader(
      this.role.fetchCourseDetails()).subscribe({
        next: (data: Roles[]) => {
          this.roles = data
        },
        error: (error: HttpErrorResponse) => {
          Swal.fire("Error", "Something Went Wrong", 'error')
        }
      })
  }

  addRole(role?: Roles): void {
    const dialogRef = this.dialog.open(AddEditRolesComponent, {
      data: {
        role: role ? role : new Roles()
      }
    });
    dialogRef.componentInstance.uploadSuccess.subscribe((data: Roles | number) => {
      if (typeof (data) != 'number' && data != undefined) {
        const index = this.roles.findIndex((value: Roles) => value.id == data?.id)
        if (index != -1) {
          this.roles[index] = data
          return
        }
        this.roles.unshift(data)
        return
      }
      if (typeof (data) == 'number') {
        this.roles.splice(this.roles.findIndex((role: Roles) => data == role.id), 1)
      }
    })
  }


  checkEditAccess(element: Roles): boolean {
    return (element.roleName === InstituteRoles.Admin && element.roleType === InstituteRoles.Admin) || (element.roleName === InstituteRoles.Teacher && element.roleType === InstituteRoles.Teacher) || (element.roleName === InstituteRoles.Student && element.roleType === InstituteRoles.Student) || (element.roleName === InstituteRoles.InstituteAdmin && element.roleType === InstituteRoles.InstituteAdmin) ?
      false : true
  }
  screenmapping(element: Roles) {
    this.router.navigate(['/admin/screen-mapping'], { queryParams: { id: element.id } })
  }


}
