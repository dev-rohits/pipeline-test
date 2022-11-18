import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/loader.service';
import { Subscription, timer } from 'rxjs';
import { QuizUpdate } from 'src/app/model/Quiz';
import { QuizService } from 'src/app/services/Quiz/quiz.service';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ExamFeedbackComponent } from './exam-feedback/exam-feedback.component';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent implements OnInit {
  countDown!: Subscription;
  counter!: any;
  tick = 1000;
  totalMarks!: number;
  id!: number;
  preview: QuizUpdate = new QuizUpdate();
  date = new Date();
  totalHours!: number;
  clearMinutes!: number;
  isSubmit: boolean = false;
  lisOfAnswers: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService,
    private loader: LoaderService,
    private location: Location,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: { [x: string]: number; }) => {
      this.id = data['id'];
    });

    this.quizService.fetchQuizById(this.id, AuthService.userId).subscribe(
      (data: any) => {
        this.preview = data.data as QuizUpdate;
        this.counter = this.preview.hour! * 3600 + this.preview.minutes! * 60;
        this.totalMarks = data.data.marks;
        this.quizService
          .isQuizAttempted(AuthService.getUserId, this.id)
          .subscribe(
            (data: any) => {
              if (data.isSubmit == false) {
                this.quizService
                  .quizStartedOrEnded({
                    quizId: this.preview.id,
                    status: 'attempting',
                    userId: AuthService.getUserId,
                    submitted: false,
                  })
                  .subscribe(
                    (data: any) => {
                    },
                    (error: any) => {
                    }
                  );
              } else {
                this.submitAfterTimeOut('Close');
              }
            },
            (error: any) => {
            }
          );
      },
      (error: any) => {
      }
    );
    this.countDown = timer(0, this.tick).subscribe(() => {
      this.counter = this.counter - 1;
      if (this.counter < 0) {
        this.submitAfterTimeOut('Time out');
      }
    });
  }

  refresh() {
    this.quizService.fetchQuizById(this.id, AuthService.getUserId).subscribe(
      (data: any) => {
        this.preview = data.data as QuizUpdate;
      },
      (error: any) => {
        Swal.fire('Something went wrong !', '', 'info');
      }
    );
  }

  ngOnDestroy() {
    this.countDown.unsubscribe();
  }

  submitAfterTimeOut(feedback: string) {
    this.countDown.unsubscribe();
    const studentId = AuthService.getUserId;
    this.preview.sections?.map((section) => {
      section.questions.map((question) => {
        if (question.answer != null) {
          this.lisOfAnswers.push({
            questionId: question.id,
            questionType: question.questionType,
            answer: question.answer,
            studentId: studentId,
            id: question.studentSubmittedAnswerId,
          });
        }
      });
    });
    this.loader.loadingOn();
    this.quizService
      .submitAnswers(
        this.preview.id!,
        AuthService.getUserId,
        true,
        feedback,
        this.lisOfAnswers
      )
      .subscribe(
        (data: any) => {
          this.loader.loadingOff();
          Swal.fire('Exam Saved Successfully !', '', 'info');
          this.isSubmit = true;
          this.location.back();
        },
        (error: any) => {
          this.loader.loadingOff();
          Swal.fire('Something went  wrong', '', 'info');
        }
      );
  }

  saveAnswers(questionId: number, questionType: string) {
    Swal.fire({
      title: 'Do you want to save your answer?',
      showDenyButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.loader.loadingOn();
        const studentId = AuthService.getUserId;
        this.preview.sections?.forEach((section) => {
          section.questions.forEach((question) => {
            if (question.id == questionId) {
              if (question.answer != null) {
                this.lisOfAnswers.push({
                  questionId: questionId,
                  questionType: questionType,
                  studentId: studentId,
                  answer: question.answer,
                  id: question.studentSubmittedAnswerId,
                });
              }
            }
          });
        });
        this.loader.loadingOn();
        this.quizService
          .submitAnswers(
            this.preview.id!,
            AuthService.getUserId,
            false,
            '',
            this.lisOfAnswers
          )
          .subscribe(
            (data: any) => {
              this.refresh();
              this.lisOfAnswers = [];
              this.loader.loadingOff();
            },
            (error: any) => {
              this.lisOfAnswers = [];
              this.loader.loadingOff();
              Swal.fire('Something went wrong !', '', 'info');
            }
          );
      } else if (result.isDenied) {
        Swal.fire('answer not saved', '', 'info');
      }
    });
  }

  resetAnswer(questionId: number, answerId: string) {
    Swal.fire({
      title: 'Do you want to reset your answer?',
      showDenyButton: true,

      confirmButtonText: `Reset`,
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.loader.loadingOn();
        const userId = AuthService.getUserId;
        this.quizService
          .deleteStudentSubmittedAnswer(
            userId,
            this.preview.id!,
            questionId,
            +answerId
          )
          .subscribe(
            (data: any) => {
              this.loader.loadingOff();
              this.refresh();
            },
            (error: any) => {
              this.loader.loadingOff();
              Swal.fire('Something went wrong !', '', 'info');
            }
          );
      } else if (result.isDenied) {
        Swal.fire('answer not deleted', '', 'info');
      }
    });
  }

  onSubmit() {
    Swal.fire({
      title: 'Do you want to submit your exam?',
      showDenyButton: true,
      confirmButtonText: `Submit`,
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        const ref = this.dialog.open(ExamFeedbackComponent, {
          width: '25%',
        });
        ref.componentInstance.feedBackData.subscribe(
          (feedbackComment: string) => {
            this.loader.loadingOn();
            const studentId = AuthService.getUserId;
            this.preview.sections?.map((section) => {
              section.questions.map((question) => {
                if (question.answer != null) {
                  this.lisOfAnswers.push({
                    questionId: question.id,
                    questionType: question.questionType,
                    answer: question.answer,
                    studentId: studentId,
                    id: question.studentSubmittedAnswerId,
                  });
                }
              });
            });
            this.quizService
              .submitAnswers(
                this.preview.id! ,
                AuthService.getUserId,
                true,
                feedbackComment,
                this.lisOfAnswers
              )
              .subscribe(
                (data: any) => {
                  this.loader.loadingOff();
                  Swal.fire('Exam Submitted Successfully !', '', 'info');
                  this.isSubmit = true;
                  this.location.back();
                },
                (error: any) => {
                  this.loader.loadingOff();
                  Swal.fire('Something went  wrong', '', 'info');
                }
              );
          }
        );
      } else if (result.isDenied) {
        Swal.fire('Exam not submitted', '', 'info');
      }
    });
  }
}
