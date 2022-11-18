import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAllClassesComponent } from './student-all-classes.component';

describe('StudentAllClassesComponent', () => {
  let component: StudentAllClassesComponent;
  let fixture: ComponentFixture<StudentAllClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAllClassesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAllClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
