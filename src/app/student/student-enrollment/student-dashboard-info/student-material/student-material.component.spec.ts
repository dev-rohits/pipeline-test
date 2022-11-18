import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMaterialComponent } from './student-material.component';

describe('StudentMaterialComponent', () => {
  let component: StudentMaterialComponent;
  let fixture: ComponentFixture<StudentMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
