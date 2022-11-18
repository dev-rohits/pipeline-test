import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, map, Observable, of, Subject, Subscription } from 'rxjs';
import { searchResult } from 'src/app/model/Search';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-subscription-plan-search',
  templateUrl: './subscription-plan-search.component.html',
  styleUrls: ['./subscription-plan-search.component.scss'],
})
export class SubscriptionPlanSearchComponent implements OnInit {
  searchRes!: searchResult;
  subject = new Subject();
  result$!: Observable<any>;
  searchedText!: string;
  subscription!: Subscription;

  constructor(public commonService: CommonService, private router: Router) {}
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ngInIt();
  }

  ngInIt() {
    this.subscription = this.subject
      .pipe(
        debounceTime(1000),
        map((searchText) =>
          searchText !== '' ? this.commonService.search(searchText) : of([])
        )
      )
      .subscribe((response) => {
        this.result$ = response;
        this.result$.subscribe((value: searchResult) => {
          this.searchRes = value;
        });
      });
  }

  search(evt: any) {
    this.searchedText = evt.target.value;
    if (this.searchedText.length >= 3) {
      this.subject.next(this.searchedText);
    }
  }

  redirect(type: string, id: number, name?: string) {
    switch (type) {
      case 'courses':
        this.router.navigateByUrl(`/marketing/course-info?id=${id}`);
        break;

      case 'institutions':
        this.router.navigateByUrl(
          `/marketing/institute-info?id=${id}&name=${name}`
        );
        break;

      case 'teachers':
        this.router.navigateByUrl(
          `/marketing/teacher-profile?id=${id}&name=${name}`
        );
        break;
    }
  }
}
