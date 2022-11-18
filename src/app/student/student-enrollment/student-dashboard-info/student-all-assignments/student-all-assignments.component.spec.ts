import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAllAssignmentsComponent } from './student-all-assignments.component';

describe('StudentAllAssignmentsComponent', () => {
  let component: StudentAllAssignmentsComponent;
  let fixture: ComponentFixture<StudentAllAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAllAssignmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAllAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
