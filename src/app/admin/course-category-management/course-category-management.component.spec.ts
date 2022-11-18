import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCategoryManagementComponent } from './course-category-management.component';

describe('CourseCategoryManagementComponent', () => {
  let component: CourseCategoryManagementComponent;
  let fixture: ComponentFixture<CourseCategoryManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseCategoryManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCategoryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
