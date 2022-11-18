import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime, map, Observable, of, Subject } from 'rxjs';
import { MappingPageComponent } from 'src/app/common/mapping-page/mapping-page.component';
import { LoaderService } from 'src/app/loader.service';
import { assignmentVO } from 'src/app/model/assignmentVO';
import { MappingType } from 'src/app/model/MappingType';
import { AssignmentService } from 'src/app/services/assignment/assignment.service';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss'],
})
export class AssignmentComponent implements OnInit {
  assignments!: assignmentVO[];
  searchParam: string = '';
  totalCount!: number;
  page: number = 0;
  size: number = 5;
  subject = new Subject<string>();
  result$!: Observable<any>;
  constructor(
    private dialog: MatDialog,
    private assignmentService: AssignmentService,
    private loader: LoaderService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getAssignments();
    this.applyFilter();
  }
  getAssignments() {
    this.loader
      .showLoader(this.assignmentService.getAssignments(this.size,
        this.page,
        this.searchParam))
      .subscribe((res: any) => {
        this.assignments = res.body.assignmentVO;
        this.totalCount = res.body.total_count;
      });
  }
  addassignment() {
    var instituteId = JSON.parse(
      localStorage.getItem('auth') as string
    ).selectedInstitute;
    let dialogRef = this.dialog.open(AddAssignmentComponent, {
      height: '90%',
      width: '70%',
      data: {
        isEdit: false,
        instituteId: instituteId,
      },
    });
    dialogRef.componentInstance.refresh.subscribe((res: any) => {
      if (res) {
        this.getAssignments();
        dialogRef.close();
      }
    });
  }

  editAssignment(element: assignmentVO) {
    var instituteId = JSON.parse(
      localStorage.getItem('auth') as string
    ).selectedInstitute;
    let dialogRef = this.dialog.open(AddAssignmentComponent, {
      height: '90%',
      width: '70%',
      data: {
        body: element,
        isEdit: true,
        instituteId: instituteId,
      },
    });
    dialogRef.componentInstance.refresh.subscribe((res: any) => {
      if (res) {
        this.getAssignments();
        dialogRef.close();
      }
    });
  }
  assignmentSubmitBy(element: assignmentVO){
    this.router.navigate(['/teacher/submit-by', element.id]);
  }
  search(evt: any) {
    if (evt.target.value == '') {
      this.getAssignments();
    } else {
      const searchText = evt.target.value;
      this.subject.next(searchText);
    }
  }

  assignmentMapping(id: number) {
    this.dialog.open(MappingPageComponent, {
      data: {
        id: id,
        mappingType: MappingType.ASSIGNMENT,
      },
      width: '100%',
      height: '99%',
    });
  }




  applyFilter() {
    this.subject
      .pipe(
        debounceTime(1000),
        map((searchText: string) =>
          searchText !== ''
            ? this.loader.showLoader(
              this.assignmentService.getAssignments(
                  this.size,
                  this.page,
                  this.searchParam
                )
              )
            : of([])
        )
      )
      .subscribe((res) => {
        this.result$ = res;
        this.result$.subscribe((value: any) => {
          this.assignments = value?.body.assignmentVO;
          this.totalCount=value?.body.total_count
        });
      });
  }


  changeSize(size:number){
    this.size=size
    this.getAssignments();
  }

  pageChange(page:number){
    this.page=page
    this.getAssignments()
  }

}
