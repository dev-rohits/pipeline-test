import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-admin-all-quiz',
  templateUrl: './admin-all-quiz.component.html',
  styleUrls: ['./admin-all-quiz.component.scss'],
})
export class AdminAllQuizComponent implements OnInit {
  page: number = 0;
  size: number = 5;
  totalCount: number = 0;
  ELEMENT_DATA: any[] = [];
  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refresh(this.page);
  }

  refresh(page: number) {
    this.teacherService
      .fetchAllQuizes(+this.route.snapshot.queryParams?.['batchId'], page, this.size)
      .subscribe(
        (res: any) => {
          // console.log(res);
          this.ELEMENT_DATA = res.quizes.reverse();
          this.totalCount = res.totalCount;
        },
        (error: any) => {}
      );
  }

  quizSubmitBy(id: number) {
    this.router.navigate(['/admin/quiz-submit-by'], {
      queryParams: { id: id },
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
