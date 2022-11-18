import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, debounceTime, map, of } from 'rxjs';
import { LoaderService } from 'src/app/loader.service';
import { ClassVO } from 'src/app/model/classVO';
import { ClassService } from 'src/app/services/Classes/class.service';

@Component({
  selector: 'app-student-all-webinars',
  templateUrl: './student-all-webinars.component.html',
  styleUrls: ['./student-all-webinars.component.scss']
})
export class StudentAllWebinarsComponent implements OnInit {
  liveClasses!: ClassVO[];
  futureClasses!: ClassVO[];
  batchId!: number;
  totalCount!:number;
  totalCountOfFuture!:number;
  page: number = 0;
  size: number = 5;
  searchParam: string = '';
  subject = new Subject<string>();
  result$!: Observable<any>;
  instituteId: any;
  constructor( private route: ActivatedRoute,
    private classService: ClassService,private router:Router,private loader:LoaderService) { }

  ngOnInit(): void {
    this.batchId = +this.route.snapshot.queryParams?.['batchId'];
    this.instituteId = JSON.parse(localStorage.getItem('auth') as string).selectedInstitute;
    this.fetchLiveWebinars();
    this.fetchFutureWebinars(this.page);
    this.applyFilter();
  }
  fetchLiveWebinars() {
    this.classService.fetchAllLiveWebinars(this.size,
      this.page,
      this.searchParam,this.instituteId).subscribe((res: any) => {
      this.liveClasses = res.liveWebinarsList;
      this.totalCount = res.total_count;
    });
  }

  fetchFutureWebinars(page:number){
    this.classService.fetchAllFutureWebinars(this.size,
      page,
      this.searchParam,this.instituteId).subscribe((res:any) => {
      this.futureClasses = res.futureWebinarsList;
      this.totalCountOfFuture = res.total_count;
    });

  }

  redirectToZoom(classScheduleId: number) {
    this.classService.redirectToZoom(classScheduleId)
  }
  joinClass(idClassSchedule: number) {
    this.redirectToZoom(idClassSchedule);
    return;
  }

  search(evt: any) {
    if (evt.target.value == '') {
      this.fetchFutureWebinars(this.page);
    } else {
      const searchText = evt.target.value;
      this.subject.next(searchText);
    }
  }

  changeFutureClassesPage(page: number) {
    this.page = page;
    this.fetchFutureWebinars(this.page);
  }

  changeFutureClassesSize(event: number) {
    this.size = event;
    this.fetchFutureWebinars(0);
  }
  applyFilter() {
    this.subject
      .pipe(
        debounceTime(1000),
        map((searchText: string) =>
          searchText !== ''
            ? this.loader.showLoader(
              this.classService.fetchAllFutureWebinars( this.size,
                this.page,
                this.searchParam,this.instituteId)
              )
            : of([])
        )
      )
      .subscribe((res) => {
        this.result$ = res;
        this.result$.subscribe((value: any) => {
          this.futureClasses = value?.futureWebinarsList;
        });
      });
  }


}
