import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable, debounceTime, map, of } from 'rxjs';
import { LoaderService } from 'src/app/loader.service';
import { CourseCategoryVO } from 'src/app/model/categories.model';
import { CategoryService } from 'src/app/services/category/category.service';
import Swal from 'sweetalert2';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { CreateSubCategoryComponent } from './create-sub-category/create-sub-category.component';

@Component({
  selector: 'app-sub-category-management',
  templateUrl: './sub-category-management.component.html',
  styleUrls: ['./sub-category-management.component.scss']
})
export class SubCategoryManagementComponent implements OnInit {

  CourseCategoryVO: CourseCategoryVO[] = [];
  categoryId!: number;
  totalCount!: number;
  page: number = 0;
  size: number = 5;
  searchParam: string = '';
  subject = new Subject<string>();
  result$!: Observable<any>;
  constructor(  private loader: LoaderService,
    private dialog: MatDialog,
    private categoryService:CategoryService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryId = +this.route.snapshot.queryParams['id'];
    this.refresh(this.page);
    this.applyFilter();
  }

  refresh(page:number){
   this.categoryService.getSubCategories(this.categoryId,page,this.size,this.searchParam).subscribe((res:any) => {
    this.CourseCategoryVO = res.body.SubCourseCategories;
    this.totalCount = res?.body.total_count;
    });
    
  }

  pageChange(event: any) {
    this.refresh(event);
  }

  changeSize(event: any) {
    this.size = event;
    this.refresh(0);
  }

  search(evt: any) {
    if (evt.target.value == '') {
      this.refresh(this.page);
    } else {
      const searchText = evt.target.value;
      this.subject.next(searchText);
    }
  }

  addCategory() {
    let dialogRef = this.dialog.open(CreateSubCategoryComponent, {
      width: '800px',
      maxHeight: '900px',
      disableClose: true,
      data: {
        isEdit: false,
        idCourseCategory: this.categoryId,
      },
    });
    dialogRef.componentInstance.uploadSuccess.subscribe((res: any) => {
      if (res) {
        this.refresh(this.page);
        dialogRef.close();
      }
    });
  }
  editCategory(element: CourseCategoryVO) {
    let dialogRef = this.dialog.open(CreateSubCategoryComponent, {
      width: '800px',
      maxHeight: '900px',
      disableClose: true,
      data: {
        isEdit: true,
        categoryName: element.categoryName,
        categoryDescription: element.categoryDescription,
        idCourseCategory: this.categoryId,
        subCategoryId: element.subCategoryId,
        categoryImage: element.categoryImage,
        category: this.categoryId,
        displayOrder: element.displayOrder,
        isFeatured:element.isFeatured,
        isPrivate:element.isPrivate
      },
    });
    dialogRef.componentInstance.uploadSuccess.subscribe((res: any) => {
      if (res) {
        this.refresh(this.page);
        dialogRef.close();
      }
    });
  }

  delete(id: any) {
    Swal.fire({
      title: 'Do you want to delete the Category?',
      showDenyButton: true,

      confirmButtonText: `Delete`,
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.loader
          .showLoader(
            this.categoryService.deleteSubCategory(id, 'SubCategory')
          )
          .subscribe(
            (res) => {
              Swal.fire('Deleted', 'Category Deleted', 'success');
              this.refresh(this.page);
            },
            (err) => {
              Swal.fire('Error Occured!', err.error.message, 'error');
            }
          );
      } else if (result.isDenied) {
        Swal.fire('Category not deleted', '', 'info');
      }
    });
  }

  applyFilter() {
    this.subject
      .pipe(
        debounceTime(1000),
        map((searchText: string) =>
          searchText !== ''
            ? this.loader.showLoader(
              this.categoryService.getSubCategories(this.categoryId,this.page,this.size,this.searchParam)
              )
            : of([])
        )
      )
      .subscribe((res) => {
        this.result$ = res;
        this.result$.subscribe((value: any) => {
          this.CourseCategoryVO = value?.body.SubCourseCategories;
          this.totalCount = value?.body.total_count;
        });
      });
  }


  updateFeatured(idCourseCategory: any) {
    this.loader
      .showLoader(
        this.categoryService.updateFetatureCategory(idCourseCategory, 'SUBCATEGORY')
      )
      .subscribe();
  }

  updatePrivate(idCourseCategory: any) {
    this.loader
      .showLoader(
        this.categoryService.updatePrivate(idCourseCategory, 'SUBCATEGORY')
      )
      .subscribe();
  }
}
