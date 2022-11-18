import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { LoaderService } from 'src/app/loader.service';
import { Roles } from 'src/app/model/Roles';
import { RolesService } from 'src/app/services/roles/roles.service';
import Swal from 'sweetalert2';
import { RolesComponent } from '../roles/roles.component';

@Component({
  selector: 'app-add-edit-roles',
  templateUrl: './add-edit-roles.component.html',
  styleUrls: ['./add-edit-roles.component.scss'],
})
export class AddEditRolesComponent implements OnInit {
  role: Roles = new Roles();
  isRoleNameEmpty: boolean = false;
  isRoleTypeEmpty: boolean = false;
  submitted: boolean = false;
  uploadSuccess = new EventEmitter<number | Roles>();
  initialValueOfRoleName!: string;
  initialValueOfRoleType!: string;
  constructor(
    private dialogRef: MatDialogRef<RolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { role: Roles },
    private roleService: RolesService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.initialValueOfRoleName = this.data.role.roleName;
  }

  submit() {
    this.submitted = true;
    if (this.data.role.roleName == '') {
      this.isRoleNameEmpty = true;
      return;
    }
    this.loader.showLoader(this.roleService.addRole(this.data.role)).subscribe({
      next: (data: Roles) => {
        this.uploadSuccess.emit(data);
        this.dialogRef.close();
      },
      error: (data: HttpErrorResponse) => {
        this.uploadSuccess.emit(undefined);
        Swal.fire(
          'Error',
          data.error.body ? data.error.body : 'Internal Server Error',
          'error'
        );
      },
    });
  }
  cancel() {
    this.uploadSuccess.emit(undefined);
    this.data.role.roleName = this.initialValueOfRoleName;
    this.dialogRef.close();
  }

  showWarning() {
    return Swal.fire({
      title: 'Warning',
      text: 'Do you want to delete this role.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Do You Want To Continue?',
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      } else {
        return false;
      }
    });
  }

  async delete(id: number) {
    await this.showWarning().then((value: boolean) => {
      if (value) {
        this.loader.showLoader(this.roleService.delete(id)).subscribe({
          next: (data: any) => {
            this.uploadSuccess.emit(id);
            this.dialogRef.close();
          },
          error: (error: HttpErrorResponse) => {
            Swal.fire('Error', error.error.message, 'error');
          },
        });
      }
    });
  }
}
