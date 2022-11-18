import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseRequestComponent } from './create-course-request.component';

describe('CreateCourseRequestComponent', () => {
  let component: CreateCourseRequestComponent;
  let fixture: ComponentFixture<CreateCourseRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCourseRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCourseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
