import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, fromEvent, Subscription } from 'rxjs';
import { LoaderService } from 'src/app/loader.service';
import { QuizService } from 'src/app/services/Quiz/quiz.service';

@Component({
  selector: 'app-quiz-submit-by',
  templateUrl: './quiz-submit-by.component.html',
  styleUrls: ['./quiz-submit-by.component.scss'],
})
export class QuizSubmitByComponent implements OnInit {
  quizId!: number;
  searchParam: string = '';
  users: any[] = [];
  page = 0;
  size = 5;
  totalCount = 0;
  @ViewChild('studentSearch') studentSearch!: ElementRef;
  searchSubscription!: Subscription;

  constructor(
    private loader: LoaderService,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quizId = this.route.snapshot.queryParams['id'];
    this.refresh(this.page);
  }

  refresh(page: number) {
    this.loader
      .showLoader(this.quizService.submitBy(this.quizId, page, this.size))
      .subscribe((res: any) => {
        this.users = res?.students;
        this.totalCount = res.totalCount;
      });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.search();
  }

  search() {
    this.searchSubscription = fromEvent(
      this.studentSearch.nativeElement,
      'keyup'
    )
      .pipe(debounceTime(1000))
      .subscribe((data: any) => {
        this.loader
          .showLoader(
            this.quizService.submitBy(
              this.quizId,
              0,
              this.size,
              data.target.value
            )
          )
          .subscribe((data: any) => {
            this.users = data?.students;
            this.totalCount = data.totalCount;
          });
      });
  }

  pageChange(event: any) {
    this.refresh(event);
  }

  changeSize(event: any) {
    this.size = event;
    this.refresh(0);
  }

  preview(studentId: number) {
    this.router.navigate(['/admin/quiz-preview'], {
      queryParams: { id: this.quizId, userId: studentId },
    });
  }
}
