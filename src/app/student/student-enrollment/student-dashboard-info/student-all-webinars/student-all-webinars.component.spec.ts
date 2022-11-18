import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAllWebinarsComponent } from './student-all-webinars.component';

describe('StudentAllWebinarsComponent', () => {
  let component: StudentAllWebinarsComponent;
  let fixture: ComponentFixture<StudentAllWebinarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAllWebinarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAllWebinarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
