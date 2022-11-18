import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDemoClassesComponent } from './teacher-demo-classes.component';

describe('TeacherDemoClassesComponent', () => {
  let component: TeacherDemoClassesComponent;
  let fixture: ComponentFixture<TeacherDemoClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherDemoClassesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherDemoClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
