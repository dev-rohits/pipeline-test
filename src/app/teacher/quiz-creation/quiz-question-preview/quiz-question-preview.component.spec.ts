import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizQuestionPreviewComponent } from './quiz-question-preview.component';

describe('QuizQuestionPreviewComponent', () => {
  let component: QuizQuestionPreviewComponent;
  let fixture: ComponentFixture<QuizQuestionPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizQuestionPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizQuestionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
