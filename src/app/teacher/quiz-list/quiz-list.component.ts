import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime, fromEvent, Subscription } from 'rxjs';
import { MappingPageComponent } from 'src/app/common/mapping-page/mapping-page.component';
import { InstituteRoles } from 'src/app/enums/InstituteRoles';
import { Auth } from 'src/app/model/Auth';
import { MappingType } from 'src/app/model/MappingType';
import { QuizUpdate } from 'src/app/model/Quiz';
import { Roles } from 'src/app/model/Roles';
import { AuthService } from 'src/app/services/auth.service';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent implements OnInit, AfterViewInit {
  totalElement!: number;
  quizs: any[] = [];
  pageNumber: number = 0;
  size: number = 5;
  search: string = '';
  @ViewChild('quizSearch') quizSearch!: ElementRef;
  searchSubscription!: Subscription;
  constructor(
    private router: Router,
    private quizService: QuizApiService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.refresh(this.pageNumber);
  }

  ngAfterViewInit(): void {
    this.searchSubscription = fromEvent(this.quizSearch.nativeElement, 'keyup')
      .pipe(debounceTime(1000))
      .subscribe((data: any) => {
        this.pageNumber = 0;
        this.search = data.target.value;
        this.refresh(0);
      });
  }

  refresh(page: number) {
    this.quizService.fetchAllQuizes(page, this.size, this.search).subscribe({
      next: (data: { quizs: any[]; total_count: number }) => {
        this.totalElement = data.total_count;
        this.quizs = data.quizs;
      },
      error: (error: HttpErrorResponse) => {},
    });
  }

  pageChange(event: any) {
    this.refresh(event);
  }
  changeSize(event: any) {
    this.size = event;
    this.refresh(0);
  }

  createQuiz() {
    if (
      AuthService.getRoleType == InstituteRoles.Admin ||
      AuthService.getRoleType == InstituteRoles.InstituteAdmin
    ) {
      this.router.navigateByUrl('/admin/quiz-creation');
    } else if (AuthService.getRoleType == InstituteRoles.Teacher) {
      this.router.navigateByUrl('/teacher/quiz-creation');
    }
  }

  editQuiz(id: number) {
    this.router.navigate(
      [
        '/' + AuthService.getRoleType === InstituteRoles.Teacher
          ? 'teacher'
          : 'admin' + '/quiz-creation',
      ],
      { queryParams: { id: id } }
    );
  }

  newMapMaterial(id: number) {
    this.dialog.open(MappingPageComponent, {
      data: {
        id: id,
        mappingType: MappingType.QUIZ,
      },
      width: '100%',
      height: '99%',
    });
  }

  preview(id: number) {
    this.router.navigate(['/admin/quiz-preview'], { queryParams: { id: id } });
  }

  delete(id: number) {
    Swal.fire({
      title: 'Do you want to delete the Quiz?',
      showDenyButton: true,
      confirmButtonText: `Delete`,
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.quizService.deleteQuiz(id).subscribe(
          (res: any) => {
            Swal.fire('Good job!', res.message, 'success');
            this.refresh(this.pageNumber);
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          }
        );
      } else if (result.isDenied) {
        Swal.fire('Quiz not deleted', '', 'info');
      }
    });
  }

  quizSubmitBy(id: number) {
    this.router.navigate(['/admin/quiz-submit-by'], {
      queryParams: { id: id },
    });
  }
}
