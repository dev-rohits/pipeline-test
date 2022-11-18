import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  page: number = 0;
  size: number = 5;
  totalCount: number = 0;
  ELEMENT_DATA: any[] = [];
  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.refresh(this.page);
  }

  refresh(page: number) {
    this.teacherService
      .fetchAllQuizes(
        +this.route.snapshot.queryParams?.['idbatch'], page, this.size
      )
      .subscribe(
        (res: any) => {
          this.ELEMENT_DATA = res.quizes.reverse();
          this.totalCount = res.totalCount;
        },
        (error: any) => {}
      );
  }

  pageChange(event: any) {
    this.refresh(event);
  }
  changeSize(event: any) {
    this.size = event;
    this.refresh(0);
  }
}
