import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime, map, Observable, of, Subject } from 'rxjs';
import { LoaderService } from 'src/app/loader.service';
import { CourseCategoryVO } from 'src/app/model/categories.model';
import { CategoryService } from 'src/app/services/category/category.service';
import Swal from 'sweetalert2';
import { CreateCategoryComponent } from './create-category/create-category.component';

@Component({
  selector: 'app-course-category-management',
  templateUrl: './course-category-management.component.html',
  styleUrls: ['./course-category-management.component.scss']
})
export class CourseCategoryManagementComponent implements OnInit {

  CourseCategoryVO: CourseCategoryVO[] = [];
  totalCount!: number;
  page: number = 0;
  size: number = 5;
  searchParam: string = '';
  subject = new Subject<string>();
  result$!: Observable<any>;
  constructor(  private loader: LoaderService,
    private dialog: MatDialog,
    private categoryService:CategoryService,
    private router:Router) { }

  ngOnInit(): void {
    this.refresh(this.page);
    this.applyFilter();
  }

  refresh(page:number){
   this.categoryService.fetchCategoryList(page,this.size,this.searchParam).subscribe((res:any) => {
      this.CourseCategoryVO = res.body.FeaturedCourseCategories;
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
    let dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '800px',
      maxHeight: '900px',
      disableClose: true,
      data: {
        isEdit: false,
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
    let dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '800px',
      maxHeight: '900px',
      disableClose: true,
      data: {
        isEdit: true,
        categoryName: element.categoryName,
        categoryDescription: element.categoryDescription,
        idCourseCategory: element.idCourseCategory,
        categoryImage: element.categoryImage,
        displayOrder: element.displayOrder,
        isFeatured:element.isFeatured,
        isPrivate:element.isPrivate,
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
          .showLoader(this.categoryService.deleteCategory(id))
          .subscribe(
            (res) => {
              Swal.fire('Deleted', 'Deleted', 'success');
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

  updateFeatured(idCourseCategory: any) {
    this.loader
      .showLoader(
        this.categoryService.updateFetatureCategory(idCourseCategory ,'CATEGORY')
      )
      .subscribe();
  }

  updatePrivate(idCourseCategory: any) {
    this.loader
      .showLoader(
        this.categoryService.updatePrivate(idCourseCategory, 'CATEGORY')
      )
      .subscribe();
  }


  viewSubCategoryListing(categoryId:number) {
    this.router.navigate(['/admin/sub-category-management'],{ queryParams: { id: categoryId}})

  }

  applyFilter() {
    this.subject
      .pipe(
        debounceTime(1000),
        map((searchText: string) =>
          searchText !== ''
            ? this.loader.showLoader(
              this.categoryService.fetchCategoryList(this.page,
                  this.size,
                  this.searchParam
                )
              )
            : of([])
        )
      )
      .subscribe((res) => {
        this.result$ = res;
        this.result$.subscribe((value: any) => {
          this.CourseCategoryVO = value?.body.FeaturedCourseCategories;
          this.totalCount = value?.body.total_count;
        });
      });
  }
}
