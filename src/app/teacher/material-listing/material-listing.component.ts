import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime, map, Observable, of, Subject } from 'rxjs';
import { MappingPageComponent } from 'src/app/common/mapping-page/mapping-page.component';
import { InstituteRoles } from 'src/app/enums/InstituteRoles';
import { LoaderService } from 'src/app/loader.service';
import {
  FetchClassAndMaterialResult,
  MaterialFetch,
} from 'src/app/model/Material';
import { MappingType } from 'src/app/model/MappingType';
import { AuthService } from 'src/app/services/auth.service';
import { InstituteService } from 'src/app/services/institute/institute.service';
import { MaterialClassMappingComponent } from './material-class-mapping/material-class-mapping.component';

@Component({
  selector: 'app-material-listing',
  templateUrl: './material-listing.component.html',
  styleUrls: ['./material-listing.component.scss'],
})
export class MaterialListingComponent implements OnInit {
  page: number = 0;
  size: number = 10;
  material!: MaterialFetch[];
  searchParam: string = '';
  res!: FetchClassAndMaterialResult;
  subject = new Subject();
  result$!: Observable<any>;
  materialCount!: number;

  constructor(
    private loader: LoaderService,
    private instituteService: InstituteService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refresh(this.page);
    this.applyFilter();
  }

  refresh(page: number) {
    let selectedInstitute = Number.parseInt(
      JSON.parse(localStorage.getItem('auth') || '{}').selectedInstitute
    );
    let idTeacher = JSON.parse(localStorage.getItem('auth') || '{}').user_id;
    this.loader
      .showLoader(
        this.instituteService.fetchMaterial(
          idTeacher,
          selectedInstitute,
          page,
          this.size,
          this.searchParam
        )
      )
      .subscribe((res) => {
        this.material = res.material;
        this.materialCount = res.materialCount;
      });
  }

  editMaterial(materialId: number) {
    this.router.navigate([`/${AuthService.getModulePrefix}/add-material`],{queryParams:{id:materialId}});
  }

  addMaterial() {
    if (
      AuthService.getRoleType == InstituteRoles.Admin ||
      AuthService.getRoleType == InstituteRoles.InstituteAdmin
    ) {
      this.router.navigateByUrl('/admin/add-material');
    } else {
      this.router.navigateByUrl('/teacher/add-material');
    }
  }

  applyFilter() {
    let selectedInstitute = Number.parseInt(
      JSON.parse(localStorage.getItem('auth') || '{}').selectedInstitute
    );
    let idTeacher = JSON.parse(localStorage.getItem('auth') || '{}').user_id;
    this.subject
      .pipe(
        debounceTime(1000),
        map((searchText) =>
          searchText !== ''
            ? this.instituteService.fetchMaterial(
                idTeacher,
                selectedInstitute,
                this.page,
                this.size,
                this.searchParam
              )
            : of([])
        )
      )
      .subscribe((response) => {
        this.result$ = response;
        this.result$.subscribe((value) => {
          this.material = value?.material;
          this.materialCount = value?.materialCount;
        });
      });
  }

  search(evt: any) {
    if (evt.target.value == '') {
      this.refresh(this.page);
    } else {
      const searchText = evt.target.value;
      this.subject.next(searchText);
    }
  }

  mapToClass(element: MaterialFetch) {
    this.dialog.open(MaterialClassMappingComponent, {
      width: '100%',
      data: {
        res: this.res,
        materialId: element.idClassMaterial,
        isEdit: false,
      },
    });
  }

  editMapping(element: MaterialFetch) {
    this.dialog.open(MaterialClassMappingComponent, {
      width: '100%',
      data: {
        res: this.res,
        materialId: element.idClassMaterial,
        teacherId: element.idTeacher,
        isEdit: true,
      },
    });
  }

  newMapMaterial(element: any) {
    this.dialog.open(MappingPageComponent, {
      data: {
        id: element.idClassMaterial,
        mappingType: MappingType.MATERIAL,
      },
      width: '100%',
      height: '99%',
    });
  }

  pageChange(event: any) {
    this.refresh(event);
  }
  changeSize(event: any) {
    this.size = event;
    this.refresh(0);
  }
}
