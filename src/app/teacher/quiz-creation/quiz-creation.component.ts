import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuizUpdate } from 'src/app/model/Quiz';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-creation',
  templateUrl: './quiz-creation.component.html',
  styleUrls: ['./quiz-creation.component.scss']
})
export class QuizCreationComponent implements OnInit, OnDestroy {
  previewSubscription!: Subscription
  isPreview: boolean = false

  constructor(
    private location: Location
  ) { }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }


  cancel() {
    this.location.back()
  }

}
