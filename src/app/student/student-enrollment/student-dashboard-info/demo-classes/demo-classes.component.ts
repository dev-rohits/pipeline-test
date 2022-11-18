import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, map, Observable, of, Subject } from 'rxjs';
import { LoaderService } from 'src/app/loader.service';
import { ClassVO } from 'src/app/model/classVO';
import { ClassService } from 'src/app/services/Classes/class.service';

@Component({
  selector: 'app-demo-classes',
  templateUrl: './demo-classes.component.html',
  styleUrls: ['./demo-classes.component.scss']
})
export class DemoClassesComponent implements OnInit {
  liveClasses!: ClassVO[];
  futureClasses!: ClassVO[];
  batchId!: number;
  totalCount!:number;
  totalCountOfFuture!:number;
  page: number = 0;
  size: number = 10;
  searchParam: string = '';
  subject = new Subject<string>();
  result$!: Observable<any>;
  instituteId: any;
  constructor( private route: ActivatedRoute,
    private classService: ClassService,private router:Router,private loader:LoaderService) { }

  ngOnInit(): void {
    this.batchId = +this.route.snapshot.queryParams?.['idbatch'];
    this.instituteId=JSON.parse(localStorage.getItem('auth') as string).selectedInstitute;
    this.fetchLiveDemoClasses();
    this.fetchFutureDemoClasses();
    this.applyFilter();
  }
  fetchLiveDemoClasses() {
    this.classService.fetchTeacherLiveDemoClasses(this.batchId, this.size,
      this.page,
      this.searchParam,this.instituteId).subscribe((res: any) => {
      this.liveClasses = res.LiveDemoClassesList;
      this.totalCount = res.total_count;
    });
  }

  fetchFutureDemoClasses(){
    this.classService.fetchTeacherFutureDemoClasses(this.batchId, this.size,
      this.page,
      this.searchParam,this.instituteId).subscribe((res:any) => {
      this.futureClasses = res.FutureDemoClassesList;
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
      this.fetchFutureDemoClasses();
    } else {
      const searchText = evt.target.value;
      this.subject.next(searchText);
    }
  }

  onTableDataChange() {
    this.page = this.page + 1;
    this.fetchFutureDemoClasses();
  }
  previous() {
    this.page = this.page - 1;
    this.fetchFutureDemoClasses();
  }
  onChange() {
    this.size;
    this.fetchFutureDemoClasses();
  }

  applyFilter() {
    this.subject
      .pipe(
        debounceTime(1000),
        map((searchText: string) =>
          searchText !== ''
            ? this.loader.showLoader(
              this.classService.fetchTeacherFutureDemoClasses(this.batchId, this.size,
                this.page,
                this.searchParam,this.instituteId)
              )
            : of([])
        )
      )
      .subscribe((res) => {
        this.result$ = res;
        this.result$.subscribe((value: any) => {
          this.futureClasses = value?.FutureDemoClassesList;
        });
      });
  }

}
