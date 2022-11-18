import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboardInfoComponent } from './student-dashboard-info.component';

describe('StudentDashboardInfoComponent', () => {
  let component: StudentDashboardInfoComponent;
  let fixture: ComponentFixture<StudentDashboardInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDashboardInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDashboardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
