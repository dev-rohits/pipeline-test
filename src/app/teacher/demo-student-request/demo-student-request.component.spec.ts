import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoStudentRequestComponent } from './demo-student-request.component';

describe('DemoStudentRequestComponent', () => {
  let component: DemoStudentRequestComponent;
  let fixture: ComponentFixture<DemoStudentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoStudentRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoStudentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
