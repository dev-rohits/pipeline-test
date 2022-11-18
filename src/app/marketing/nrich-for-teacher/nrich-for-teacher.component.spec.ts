import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NrichForTeacherComponent } from './nrich-for-teacher.component';

describe('NrichForTeacherComponent', () => {
  let component: NrichForTeacherComponent;
  let fixture: ComponentFixture<NrichForTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NrichForTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NrichForTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
