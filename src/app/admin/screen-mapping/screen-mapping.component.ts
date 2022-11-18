import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Roles } from 'aws-sdk/clients/budgets';
import { LoaderService } from 'src/app/loader.service';
import { RolesService } from 'src/app/services/roles/roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-screen-mapping',
  templateUrl: './screen-mapping.component.html',
  styleUrls: ['./screen-mapping.component.scss']
})
export class ScreenMappingComponent implements OnInit {
  screenNames: ModuleSectionVO[] = []
  screenMappingIds: number[] = []
  constructor(private roleService: RolesService, private activatedRoute: ActivatedRoute, private loader: LoaderService) { }
  ngOnInit(): void {
    this.loader.showLoader(
      this.roleService.fetchScreenMapping(this.activatedRoute.snapshot.queryParams['id'])).subscribe({
        next: (data: ModuleSectionVO[]) => {
          this.screenNames = data
          this.screenNames.forEach((module: ModuleSectionVO) => {
            if (module.url != null && module.selected) {
              this.screenMappingIds.push(module.screenNameId)
            }
            module.subSections.forEach((subSection: ModuleSubSectionVO) => {
              if (subSection.selected) {
                this.screenMappingIds.push(subSection.screenNameId)
              }
            })
          })
        },
        error: (error: HttpErrorResponse) => {
          Swal.fire('Error', 'Somthing Went Wrong', 'error')
        }
      })
  }

  addMappingIds(id: number) {
    if (this.screenMappingIds.includes(id)) {
      this.screenMappingIds.splice(this.screenMappingIds.findIndex((value: number) => value == id), 1);
      return
    }
    this.screenMappingIds.push(id)
  }

  submit() {
    this.loader.showLoader(this.roleService.saveScreenMapping(this.activatedRoute.snapshot.queryParams['id'], this.screenMappingIds)).subscribe(
      {
        next: (data: any) => {
          Swal.fire('Success', 'Screen Mapping saved successfully.', 'success')
        },
        error: (error: HttpErrorResponse) => {
          Swal.fire('Error', 'Somthing Went Wrong', 'error')
        }
      }
    )
  }
}

export class ModuleSectionVO {
  screenNameId!: number;
  name!: string;
  url!: string;
  subSections!: ModuleSubSectionVO[];
  selected!: boolean;
}
export class ModuleSubSectionVO {
  screenNameId!: number;
  name!: string;
  url!: string;
  sectionName!: string;
  selected!: boolean
}
