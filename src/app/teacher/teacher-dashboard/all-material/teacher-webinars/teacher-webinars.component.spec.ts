import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherWebinarsComponent } from './teacher-webinars.component';

describe('TeacherWebinarsComponent', () => {
  let component: TeacherWebinarsComponent;
  let fixture: ComponentFixture<TeacherWebinarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherWebinarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherWebinarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
