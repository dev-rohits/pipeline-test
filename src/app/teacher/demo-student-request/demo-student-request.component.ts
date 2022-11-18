import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { debounceTime, map, Observable, of, Subject } from 'rxjs';
import { LoaderService } from 'src/app/loader.service';
import { DemoClassRequest } from 'src/app/model/demoClassRequest';
import { InstituteService } from 'src/app/services/institute/institute.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demo-student-request',
  templateUrl: './demo-student-request.component.html',
  styleUrls: ['./demo-student-request.component.scss'],
})
export class DemoStudentRequestComponent implements OnInit {
  demoClassRequests: DemoClassRequest[] = [];
  selection = new SelectionModel<DemoClassRequest>(true, []);
  page: number = 0;
  size: number = 10;
  searchParam: string = '';
  subject = new Subject();
  result$!: Observable<any>;
  requestCount: number = 0;

  constructor(
    private loader: LoaderService,
    private instituteService: InstituteService
  ) {}

  ngOnInit(): void {
    this.refresh();
    this.applyFilter();
  }

  refresh() {
    this.loader
      .showLoader(
        this.instituteService.fetchDemoClassRequests(
          JSON.parse(localStorage.getItem('auth') as string).user_id,
          this.page,
          this.size,
          this.searchParam
        )
      )
      .subscribe(
        (data: any) => {
          this.demoClassRequests = data.body.requestList;
          this.requestCount = data.body.requestCount
        },
        (error: any) => {}
      );
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.demoClassRequests.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.demoClassRequests.forEach((row: DemoClassRequest) =>
          this.selection.select(row)
        );
  }
  checkboxLabel(row?: DemoClassRequest, i?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      i + 1
    }`;
  }
  accept() {
    this.loader
      .showLoader(
        this.instituteService.changeDemoClassRequest({
          status: 'accepted',
          ids: this.selection.selected.map((obj: DemoClassRequest) => {
            return obj.id;
          }),
        })
      )
      .subscribe(
        (data: any) => {
          this.refresh();
          this.selection.clear();
          Swal.fire(
            'Success',
            'Request status changed successfully',
            'success'
          );
        },
        (error: any) => {
          Swal.fire('Error', 'Something went wrong !', 'error');
          this.selection.clear();
        }
      );
  }
  reject() {
    this.loader
      .showLoader(
        this.instituteService.changeDemoClassRequest({
          status: 'rejected',
          ids: this.selection.selected.map((obj: DemoClassRequest) => {
            return obj.id;
          }),
        })
      )
      .subscribe(
        (data: any) => {
          this.refresh();
          this.selection.clear();
          Swal.fire(
            'Success',
            'Request status changed successfully',
            'success'
          );
        },
        (error: any) => {
          Swal.fire('Error', 'Something went wrong !', 'error');
          this.selection.clear();
        }
      );
  }

  search(evt: any) {
    if (evt.target.value == '') {
      this.refresh();
    } else {
      const searchText = evt.target.value;
      this.subject.next(searchText);
    }
  }

  applyFilter() {
    this.subject
      .pipe(
        debounceTime(1000),
        map((searchText) =>
          searchText !== ''
            ? this.instituteService.fetchDemoClassRequests(
                JSON.parse(localStorage.getItem('auth') as string).user_id,
                this.page,
                this.size,
                this.searchParam
              )
            : of([])
        )
      )
      .subscribe((response) => {
        this.result$ = response;
        this.result$.subscribe((data) => {
          this.demoClassRequests = data.body.requestList;
          this.requestCount = data.body.requestCount
        });
        
      });
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
}
