import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable, of, map, debounceTime } from 'rxjs';
import { LoaderService } from 'src/app/loader.service';
import { CompletedAssignmentList } from 'src/app/model/assignmentVO';
import { AssignmentService } from 'src/app/services/assignment/assignment.service';
import { EvaluateAssignmentComponent } from './evaluate-assignment/evaluate-assignment.component';

@Component({
  selector: 'app-assignment-sudmitby',
  templateUrl: './assignment-sudmitby.component.html',
  styleUrls: ['./assignment-sudmitby.component.scss'],
})
export class AssignmentSudmitbyComponent implements OnInit {
  completedAssignmentList!: CompletedAssignmentList[];
  searchParam: string = '';
  totalCount!: number;
  page: number = 0;
  size: number = 5;
  subject = new Subject<string>();
  reevaluationEnable: boolean = false;

  result$!: Observable<any>;
  constructor(
    private loader: LoaderService,
    private assignmentService: AssignmentService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.refresh();
  }
  refresh() {
    this.loader
      .showLoader(
        this.assignmentService.fetchSubmittedAssignmentList(
          this.route.snapshot.paramMap.get('id'),
          this.size,
          this.page,
          this.searchParam
        )
      )
      .subscribe((res: any) => {
        this.completedAssignmentList = res?.body.assignmentSubmissionVO;
        this.totalCount = res?.total_count;
      });
  }

  evaluateAssignment(row: CompletedAssignmentList) {
    let dialogRef = this.dialog.open(EvaluateAssignmentComponent, {
      data: {
        assignment: row,
      },
      maxHeight: '700px',
      maxWidth: '1300px',
    });
    dialogRef.componentInstance.refresh.subscribe((res: any) => {
      if (res) {
        this.refresh();
        dialogRef.close();
      }
    });
  }

  search(evt: any) {
    if (evt.target.value == '') {
      this.refresh();
    } else {
      const searchText = evt.target.value;
      this.subject.next(searchText);
    }
  }

  onTableDataChange() {
    this.page = this.page + 1;
    this.refresh();
  }
  previous() {
    this.page = this.page - 1;
    this.refresh();
  }
  onChange() {
    this.size;
    this.refresh();
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
          this.completedAssignmentList = value?.body.assignmentVO;
        });
      });
  }
}
